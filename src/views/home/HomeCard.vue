<script setup lang="ts">
import dayjs from 'dayjs'
import RemoveMd from 'remove-markdown'
import type { Article } from '@/service'

interface Props {
  article: Article
}

const { article } = defineProps<Props>()

const pattern = /!\[(.*?)\]\((.*?)\)/mg
const images = computed(() => {
  const res = []
  for (let matcher = pattern.exec(article.content); matcher !== null;) {
    res.push(matcher[2])
    matcher = pattern.exec(article.content)
  }
  return res
})

const plainText = computed(() => {
  return RemoveMd(article.content)
})

const createTime = dayjs(article.createTime).format('YYYY-MM-DD')
</script>

<template>
  <div
    p="x4 y3" mt4
    bg="white dark:$dark-bg-color"
    border="~ gray-200 dark:transparent rounded-md"
    cursor-pointer overflow-hidden
    @click="$router.push(`/articles/${article.title}`)"
  >
    <div text-lg font-bold line-clamp-1>
      {{ article.title }}
    </div>
    <div
      flex items-center
      h-14 m="y1"
      overflow-hidden
    >
      <div
        :class="[images.length ? 'w70%' : 'w-full']"
        text="base dark-50 dark:gray-400"
        line-clamp-2
      >
        {{ plainText }}
      </div>
      <div p="x1.5" />
      <div
        v-if="images.length"
        w="30%" h-full
        rounded-md
        overflow-hidden
      >
        <img
          :src="images[0]" alt=""
          loading="lazy"
          w-full h-full object-cover
        >
      </div>
    </div>
    <!-- 创建日期和标签 -->
    <div flex justify-between text="sm dark-50 dark:gray-200">
      <div>
        <span
          v-for="tag in article.tags" :key="tag.id"
          @click.stop="$router.push(`/tags/${tag.name}`)"
        >
          {{ '#' + tag.name }}
          <span pr-1 />
        </span>
      </div>
      <div>{{ createTime }}</div>
    </div>
  </div>
</template>
