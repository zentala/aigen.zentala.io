import { Configuration, OpenAIApi } from 'openai'
import { Image, AnalysisResult } from '../types'
import { config } from '../config'

export class GPTAnalyzer {
  private openai: OpenAIApi

  constructor() {
    const configuration = new Configuration({
      apiKey: config.openai.apiKey,
    })
    this.openai = new OpenAIApi(configuration)
  }

  async analyzeImage(image: Image): Promise<AnalysisResult> {
    const response = await this.openai.createChatCompletion({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this image and provide a description, style, and relevant tags." },
            { type: "image_url", image_url: { url: image.url } }
          ],
        },
      ],
    })

    const analysis = response.data.choices[0].message.content
    return this.parseAnalysis(analysis)
  }

  private parseAnalysis(analysis: string): AnalysisResult {
    // Here you would implement logic to parse the GPT-4 response
    // and extract description, style, and tags
    // This is a simplified example
    const lines = analysis.split('\n')
    return {
      description: lines[0],
      style: lines[1],
      tags: lines.slice(2).map(tag => tag.trim()),
    }
  }

  async generateTags(text: string): Promise<string[]> {
    const response = await this.openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Generate relevant tags for the following text: "${text}"`,
        },
      ],
    })

    const tags = response.data.choices[0].message.content.split(',')
    return tags.map(tag => tag.trim())
  }
}

// Usage
// const analyzer = new GPTAnalyzer()
// const analysisResult = await analyzer.analyzeImage(image)
// const tags = await analyzer.generateTags(post.content)