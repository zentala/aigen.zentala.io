<template>
  <div class="image-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <ImageCard
      v-for="image in images"
      :key="image.id"
      :image="image"
      @click="navigateToImage(image.id)"
    />
    <div v-if="images.length === 0" class="col-span-full text-center">
      <p class="text-xl">No images found matching your criteria.</p>
    </div>
    <div v-intersection-observer="handleIntersection" class="col-span-full h-10"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import ImageCard from '@/components/ImageCard.vue'
import { Image } from '@/types'

export default defineComponent({
  name: 'ImageGrid',
  components: {
    ImageCard,
  },
  props: {
    images: {
      type: Array as PropType<Image[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter()

    const navigateToImage = (id: string) => {
      router.push({ name: 'ImageDetails', params: { id } })
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        emit('load-more')
      }
    }

    return {
      navigateToImage,
      handleIntersection,
    }
  },
})
</script>