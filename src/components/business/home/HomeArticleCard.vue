<script setup lang="ts">
import dayjs from 'dayjs'
import RemoveMd from 'remove-markdown'
import { computed } from 'vue'
import { Card } from '@/components/common'
import type { Article } from '@/service'

interface Props {
  article: Article
}

const { article } = defineProps<Props>()

// 提取所有图片链接
const pattern = /!\[(.*?)\]\((.*?)\)/mg
const images = computed(() => {
  const res = []
  for (let matcher = pattern.exec(article.content); matcher !== null;) {
    res.push(matcher[2])
    matcher = pattern.exec(article.content)
  }
  return res
})

// markdown -> 纯文本
const plainText = computed(() => {
  return RemoveMd(article.content.substring(0, 300))
})

const createTime = dayjs(article.createTime).format('YYYY-MM-DD')
</script>

<template>
  <Card bordered cursor-pointer overflow-hidden @click="$router.push(`/articles/${article.id}`)">
    <!-- 文章标题 -->
    <div text-lg font-bold line-clamp-1>
      {{ article.title }}
    </div>
    <!-- 文本预览和图片(有图片才显示) -->
    <div flex items-center h-14 m="y1" overflow-hidden>
      <div :class="[images.length ? 'w70%' : 'w-full']" text="base dark-50 dark:gray-400" line-clamp-2>
        {{ plainText }}
      </div>
      <div p="x1.5" />
      <div v-if="images.length" w="30%" h-full rounded-md overflow-hidden>
        <img
          :src="images[Math.floor(images.length * Math.random())]" alt=""
          loading="lazy" w-full h-full object-cover
        >
      </div>
    </div>
    <!-- 创建日期和标签 -->
    <div flex justify-between text="sm dark-50 dark:gray-200">
      <div>
        <span v-for="tag in article.tags" :key="tag.id" @click.stop="$router.push(`/tags/${tag.id}`)">
          {{ '#' + tag.name }}
          <span pr-1 />
        </span>
      </div>
      <div>{{ createTime }}</div>
    </div>
  </Card>
</template>
