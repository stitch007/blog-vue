<script setup lang="ts">
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()

const archives = computed(() => {
  const res = new Map<number, number>()
  lib.articles.forEach((article) => {
    const year = new Date(article.createTime).getFullYear()
    res.set(year, (res.get(year) ?? 0) + 1)
  })
  return res
})
</script>

<template>
  <Card py-5>
    <!-- 所有标签 -->
    <div>
      <Shrink
        v-for="tag in lib.sameTagArticles"
        :key="tag.tag.id"
        mx-1
        p="l2 r1 y1"
        cursor-pointer
        @click="$router.push(`/tags/${tag.tag.name}`)"
      >
        <span>{{ tag.tag.name }}</span>
        <sup text="gray-400 dark:gray-500">{{ tag.articles.length }}</sup>
      </Shrink>
    </div>
    <!-- 分割线 -->
    <div p="x2 y5">
      <hr border="~ dashed $primary-color" opacity-20>
    </div>
    <!-- 归档 -->
    <div grid="~ cols-2 gap-2.5" px-2 cursor-pointer>
      <div
        v-for="[year, count] in archives"
        :key="year"
        class="group"
        p="x3 y1"
        border="~ gray-200 dark:gray-700"
        bg="hover:$primary-color"
        rounded-lg
        duration-300
        @click="$router.push({ path: 'articles', hash: `#${year}` })"
      >
        <div text="sm gray-800 dark:gray-50 group-hover:gray-50" opacity-60>
          {{ year }}
        </div>
        <div
          text="group-hover:white"
          font-bold
          transform="group-hover:translate-x-2"
          duration-300
        >
          <span text-lg>{{ count }}</span>
          <span text-sm>
            篇
          </span>
        </div>
      </div>
    </div>
  </Card>
</template>
