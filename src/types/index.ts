export interface Image {
    id: string
    url: string
    prompt: string
    generator: string
    author: string
    sourceUrl: string
    tags: string[]
    createdAt: Date
  }
  
  export interface Collection {
    id: string
    name: string
    description: string
    imageIds: string[]
  }
  
  export interface FilterOptions {
    category?: string
    generator?: string
    dateRange?: {
      start: Date
      end: Date
    }
  }
  
  export interface Comment {
    id: string
    imageId: string
    author: string
    content: string
    createdAt: Date
  }