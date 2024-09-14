<template>
  <div class="home">
    <h1 class="text-4xl font-bold mb-8">Welcome to AIGen Gallery</h1>
    <CategoryCloud :categories="categories" @category-selected="onCategorySelected" />
    <FeaturedCollections :collections="featuredCollections" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import CategoryCloud from '@/components/CategoryCloud.vue'
import FeaturedCollections from '@/components/FeaturedCollections.vue'
import { useImageStore } from '@/store/images'
import { useCollectionStore } from '@/store/collections'

export default defineComponent({
  name: 'Home',
  components: {
    CategoryCloud,
    FeaturedCollections,
  },
  setup() {
    const imageStore = useImageStore()
    const collectionStore = useCollectionStore()
    const categories = ref<string[]>([])
    const featuredCollections = ref<Collection[]>([])

    onMounted(async () => {
      await imageStore.fetchCategories()
      categories.value = imageStore.categories
      await collectionStore.fetchFeaturedCollections()
      featuredCollections.value = collectionStore.featuredCollections
    })

    const onCategorySelected = (category: string) => {
      // Handle category selection, e.g., navigate to gallery with selected category
    }

    return {
      categories,
      featuredCollections,
      onCategorySelected,
    }
  },
})
</script>