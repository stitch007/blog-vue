<script setup lang="ts">
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()

const tags = [
  { tag: { name: 'Chrome', id: 1 }, articles: [''] },
  { tag: { name: 'HTML', id: 2 }, articles: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '教程', id: 3 }, articles: ['', '', '', '', '', '', ''] },
  { tag: { name: '二叉树', id: 4 }, articles: ['', ''] },
  { tag: { name: '哈希表', id: 5 }, articles: ['', '', '', '', '', '', ''] },
  { tag: { name: '前端', id: 6 }, articles: ['', '', '', '', '', '', '', '', ''] },
  { tag: { name: '计算机图形学', id: 7 }, articles: ['', '', ''] },
  { tag: { name: '编译原理', id: 8 }, articles: ['', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '类型体操', id: 9 }, articles: ['', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '嵌入式', id: 10 }, articles: ['', '', '', '', '', ''] },
]
</script>

<template>
  <div
    bg="white dark:$dark-bg-color"
    p="x4 y4"
    text="base dark-50 dark:white"
    rounded-xl
  >
    <div flex items-center pl-2>
      <div i-fa6-solid:tag text-base />
      <div pl-1 text-base>
        标签
      </div>
    </div>
    <div pt-2>
      <Shrink
        v-for="tag in tags"
        :key="tag.tag.id"
        p="x3 y1"
        cursor-pointer
      >
        <Badge :value="tag.articles.length">
          {{ tag.tag.name }}
        </Badge>
      </Shrink>
    </div>
  </div>
</template>
