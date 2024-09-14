import { FacebookSyncer } from './facebookSync'
import { AirtableSyncer } from './airtableSync'
import { GPTAnalyzer } from './gptAnalysis'
import { ProcessedPost } from '../types'

export async function runSync() {
  const facebookSyncer = new FacebookSyncer()
  const airtableSyncer = new AirtableSyncer()
  const gptAnalyzer = new GPTAnalyzer()

  try {
    console.log('Fetching new posts from Facebook...')
    const newPosts = await facebookSyncer.fetchNewPosts()

    console.log(`Found ${newPosts.length} new posts. Processing...`)
    const processedPosts: ProcessedPost[] = []

    for (const post of newPosts) {
      const analysisPromises = post.images.map(image => gptAnalyzer.analyzeImage(image))
      const imageAnalyses = await Promise.all(analysisPromises)

      const contentTags = await gptAnalyzer.generateTags(post.content)

      const processedPost: ProcessedPost = {
        ...post,
        images: post.images.map((image, index) => ({
          ...image,
          ...imageAnalyses[index],
        })),
        tags: [...new Set([...contentTags, ...imageAnalyses.flatMap(analysis => analysis.tags)])],
      }

      processedPosts.push(processedPost)
    }

    console.log('Syncing processed posts to Airtable...')
    await airtableSyncer.syncPosts(processedPosts)

    console.log('Sync completed successfully!')
  } catch (error) {
    console.error('Error during sync:', error)
  }
}

// Run the sync process
runSync()