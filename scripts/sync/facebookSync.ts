import { FacebookApi, FacebookPost } from './facebookApi'
import { ProcessedPost, Image } from '../types'
import { config } from '../config'

export class FacebookSyncer {
  private api: FacebookApi

  constructor() {
    this.api = new FacebookApi(config.facebook.accessToken)
  }

  async fetchNewPosts(): Promise<ProcessedPost[]> {
    const rawPosts = await this.api.fetchSavedPosts(config.facebook.limit)
    return this.processPosts(rawPosts)
  }

  private processPosts(posts: FacebookPost[]): ProcessedPost[] {
    return posts.map(post => this.processPost(post))
  }

  private processPost(post: FacebookPost): ProcessedPost {
    const images: Image[] = post.attachments.data
      .filter(attachment => attachment.type === 'photo')
      .map(attachment => ({
        url: attachment.media.image.src,
        width: attachment.media.image.width,
        height: attachment.media.image.height,
      }))

    return {
      id: post.id,
      content: post.message || '',
      images: images,
      author: post.from.name,
      authorId: post.from.id,
      createdTime: new Date(post.created_time),
      updatedTime: new Date(post.updated_time),
      sourceUrl: post.permalink_url,
      groupId: post.to ? post.to.data[0].id : null,
      groupName: post.to ? post.to.data[0].name : null,
    }
  }
}

// Usage
// const syncer = new FacebookSyncer()
// const newPosts = await syncer.fetchNewPosts()