import dotenv from 'dotenv'

dotenv.config()

export const config = {
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    limit: 100, // Number of posts to fetch in one request
  },
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  site: {
    baseUrl: process.env.SITE_BASE_URL || 'https://aigen.zentala.eu',
    title: 'AIGen Gallery',
    description: 'Explore the world of AI-generated images',
  },
}