<script setup lang="ts">
import { Card, Shrink } from '@/components/common'
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()
</script>

<template>
  <Card bordered py-5>
    <!-- 所有标签 -->
    <div>
      <Shrink
        v-for="{tag, articles} in lib.sameTagArticles" :key="tag.id"
        mx1 p1 pl2 cursor-pointer
        @click="$router.push(`/tags/${tag.id}`)"
      >
        <span>{{ tag.name }}</span>
        <sup text="gray-400 dark:gray-500">{{ articles.length }}</sup>
      </Shrink>
    </div>
    <!-- 分割线 -->
    <div p="x2 y4">
      <hr border="~ dashed $primary-color" opacity-20>
    </div>
    <!-- 归档 -->
    <div grid="~ cols-2 gap-2.5" px-2 cursor-pointer>
      <div
        v-for="[year, count] in lib.archives" :key="year"
        class="group" p="x3 y1" duration-300
        bg="hover:$primary-color" border="~ gray-200 dark:gray-700 rounded-lg"
        @click="$router.push({ path: '/articles', hash: `#${year}` })"
      >
        <div text="sm gray-800 dark:gray-50 group-hover:gray-50" opacity-60>
          {{ year }}
        </div>
        <div text="group-hover:white" font-bold transform="group-hover:translate-x-2" duration-300>
          <span text-lg>{{ count }}</span>
          <span text-sm> 篇 </span>
        </div>
      </div>
    </div>
  </Card>
</template>
