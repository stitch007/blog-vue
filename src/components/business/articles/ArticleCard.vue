<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import type { Article } from '@/service'

const { article } = defineProps<{ article: Article }>()

const createTime = computed(() => {
  return `发表于 ${dayjs(article.createTime).format('YYYY-MM-DD hh:mm')}`
})
</script>

<template>
  <div
    flex flex-col items-center cursor-pointer
    @click="$router.push(`/articles/${article.id}`)"
  >
    <!-- 分类 + 标题 -->
    <div
      text="lg hover:$primary-color"
      transform="hover:translate-x-2"
      font-bold line-clamp-1 duration-300
    >
      {{ `${article.category.name} > ${article.title}` }}
    </div>
    <!-- 创建时间和标签 -->
    <div flex flex-col-reverse lg:flex-row items-center>
      <div>
        {{ createTime }}
      </div>
      <div flex items-center md:ml2>
        <div
          v-for="tag in article.tags" :key="tag.id" ml2
          @click.stop="$router.push(`/tags/${tag.id}`)"
        >
          {{ `#${tag.name}` }}
        </div>
      </div>
    </div>
  </div>
</template>
