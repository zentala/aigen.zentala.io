import { defineStore } from 'pinia'
import { Image, FilterOptions } from '@/types'
import { fetchImages, fetchImageById, fetchCategories } from '@/services/airtable'

interface ImagesState {
  images: Image[]
  currentImage: Image | null
  categories: string[]
  loading: boolean
  error: string | null
}

export const useImageStore = defineStore('images', {
  state: (): ImagesState => ({
    images: [],
    currentImage: null,
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchImages(filters: FilterOptions) {
      this.loading = true
      try {
        this.images = await fetchImages(filters)
      } catch (error) {
        this.error = 'Failed to fetch images'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchImageById(id: string) {
      this.loading = true
      try {
        this.currentImage = await fetchImageById(id)
      } catch (error) {
        this.error = 'Failed to fetch image details'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      this.loading = true
      try {
        this.categories = await fetchCategories()
      } catch (error) {
        this.error = 'Failed to fetch categories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})