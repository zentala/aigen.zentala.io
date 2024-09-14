import axios from 'axios';
import fs from 'fs/promises';

interface FacebookPost {
  id: string;
  message?: string;
  full_picture?: string;
  created_time: string;
}

interface FacebookResponse {
  data: FacebookPost[];
}

async function getSavedPosts(accessToken: string, limit: number = 100): Promise<FacebookPost[]> {
  const baseUrl = 'https://graph.facebook.com/v12.0';
  const endpoint = `${baseUrl}/me/saved`;
  
  try {
    const response = await axios.get<FacebookResponse>(endpoint, {
      params: {
        access_token: accessToken,
        limit: limit,
        fields: 'id,message,full_picture,created_time'
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

function filterAiGeneratedPosts(posts: FacebookPost[]): FacebookPost[] {
  // This is an example function - you can adjust the filtering criteria
  return posts.filter(post => post.message?.includes('AI'));
}

async function savePostsToFile(posts: FacebookPost[], filename: string): Promise<void> {
  await fs.writeFile(filename, JSON.stringify(posts, null, 2), 'utf-8');
}

async function main() {
  const accessToken = 'YOUR_ACCESS_TOKEN_HERE'; // Replace with your access token
  
  const savedPosts = await getSavedPosts(accessToken);
  
  if (savedPosts.length > 0) {
    const aiPosts = filterAiGeneratedPosts(savedPosts);
    
    const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, -5);
    const filename = `ai_generated_posts_${timestamp}.json`;
    
    await savePostsToFile(aiPosts, filename);
    
    console.log(`Saved ${aiPosts.length} posts to file ${filename}`);
  } else {
    console.log("Failed to fetch posts.");
  }
}

main().catch(console.error);