import Airtable from 'airtable'
import { ProcessedPost, AirtableRecord } from '../types'
import { config } from '../config'

export class AirtableSyncer {
  private base: Airtable.Base

  constructor() {
    this.base = new Airtable({ apiKey: config.airtable.apiKey }).base(config.airtable.baseId)
  }

  async syncPosts(posts: ProcessedPost[]): Promise<void> {
    for (const post of posts) {
      await this.syncPost(post)
    }
  }

  private async syncPost(post: ProcessedPost): Promise<void> {
    const existingRecord = await this.findExistingRecord(post.id)

    if (existingRecord) {
      await this.updateRecord(existingRecord.id, post)
    } else {
      await this.createRecord(post)
    }
  }

  private async findExistingRecord(postId: string): Promise<AirtableRecord | null> {
    const records = await this.base('Posts').select({
      filterByFormula: `{facebook_post_id} = '${postId}'`,
      maxRecords: 1,
    }).firstPage()

    return records.length > 0 ? records[0] : null
  }

  private async createRecord(post: ProcessedPost): Promise<void> {
    await this.base('Posts').create({
      facebook_post_id: post.id,
      content: post.content,
      author: post.author,
      author_id: post.authorId,
      created_time: post.createdTime.toISOString(),
      updated_time: post.updatedTime.toISOString(),
      source_url: post.sourceUrl,
      group_id: post.groupId,
      group_name: post.groupName,
      images: JSON.stringify(post.images),
    })
  }

  private async updateRecord(recordId: string, post: ProcessedPost): Promise<void> {
    await this.base('Posts').update(recordId, {
      content: post.content,
      updated_time: post.updatedTime.toISOString(),
      images: JSON.stringify(post.images),
    })
  }
}

// Usage
// const syncer = new AirtableSyncer()
// await syncer.syncPosts(newPosts)