<script setup lang="ts">
import { computed } from 'vue'
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()
const total = computed(() =>
  [
    {
      text: '文章',
      count: lib.articles.length,
      path: '/articles',
    },
    {
      text: '标签',
      count: lib.tags.length,
      path: '/tags',
    },
    {
      text: '分类',
      count: lib.categories.length,
      path: '/categories',
    },
  ],
)
</script>

<template>
  <div flex justify-between>
    <RouterLink v-for="(item, index) in total" :key="index" :to="item.path" inline-block outline-none>
      <div text="base">
        {{ item.text }}
      </div>
      <div text="lg center" font-500 py-1>
        {{ item.count }}
      </div>
    </RouterLink>
  </div>
</template>
