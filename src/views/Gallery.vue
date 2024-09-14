<template>
  <div class="gallery">
    <h1 class="text-3xl font-bold mb-6">AI Generated Image Gallery</h1>
    
    <div class="mb-8">
      <FilterPanel @filter-changed="applyFilters" />
      <SortSelector @sort-changed="sortImages" />
    </div>

    <div v-if="loading" class="text-center">
      <p class="text-xl">Loading images...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <ImageGrid v-else :images="images" @load-more="loadMoreImages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/store/images'
import ImageGrid from '@/components/ImageGrid.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import SortSelector from '@/components/SortSelector.vue'
import { FilterOptions } from '@/types'

export default defineComponent({
  name: 'Gallery',
  components: {
    ImageGrid,
    FilterPanel,
    SortSelector,
  },
  setup() {
    const imageStore = useImageStore()
    const { images, loading, error } = storeToRefs(imageStore)
    const currentFilters = ref<FilterOptions>({})
    const currentSort = ref('newest')

    onMounted(() => {
      loadImages()
    })

    const loadImages = () => {
      imageStore.fetchImages({ ...currentFilters.value, sort: currentSort.value })
    }

    const applyFilters = (filters: FilterOptions) => {
      currentFilters.value = filters
      loadImages()
    }

    const sortImages = (sortOption: string) => {
      currentSort.value = sortOption
      loadImages()
    }

    const loadMoreImages = () => {
      // Implement pagination or infinite scroll logic here
    }

    return {
      images,
      loading,
      error,
      applyFilters,
      sortImages,
      loadMoreImages,
    }
  },
})
</script>