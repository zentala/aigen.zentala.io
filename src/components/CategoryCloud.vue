<template>
  <div class="category-cloud">
    <h2 class="text-2xl font-semibold mb-4">Explore Categories</h2>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category"
        @click="$emit('category-selected', category)"
        class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CategoryCloud',
  props: {
    categories: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: ['category-selected'],
})
</script>