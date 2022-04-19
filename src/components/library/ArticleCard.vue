<script setup lang="ts">
import dayjs from 'dayjs'
import type { Article } from '@/service'
import { useAppStore } from '@/stores'

interface Props {
  article: Article
  // 设备尺寸小于md时生效, false图片在右边, true图片在左边
  reverse?: boolean
}

const { article } = withDefaults(defineProps<Props>(), { reverse: false })

const app = useAppStore()

const createTime = dayjs(article.createTime).format('YYYY/MM/DD')
</script>

<template>
  <div
    v-if="app.smallerThanMd"
    p="x4 y3"
    bg="white dark:$dark-bg-color"
    rounded-xl
    overflow-hidden
    @click="$router.push(`/articles/${article.title}`)"
  >
    <!-- 文章标题 -->
    <div text="lg dark-200 dark:white" font-bold line-clamp-1>
      {{ article.title }}
    </div>
    <!-- 中间内容 图片和摘要 -->
    <div
      :class="{'flex-row-reverse' : reverse}"
      flex
      items-center
      h-14
      m="y1"
      overflow-hidden
    >
      <div
        w="70%"
        text="base dark-50 dark:gray-400"
        line-clamp-2
      >
        {{ article.summary }}
      </div>
      <div p="x1.5" />
      <div
        w="30%"
        h-full
        rounded-xl
        overflow-hidden
      >
        <img
          :src="article.coverImage"
          alt="coverImage"
          loading="lazy"
          w-full
          h-full
          object-cover
        >
      </div>
    </div>
    <!-- 创建日期和标签 -->
    <div flex justify-between text="sm dark-50 dark:gray-200">
      <div>
        <span
          v-for="tag in article.tags"
          :key="tag.id"
          @click.stop="$router.push(`/tags/${tag.name}`)"
        >
          {{ '#' + tag.name + ' ' }}
        </span>
      </div>
      <div>{{ createTime }}</div>
    </div>
  </div>

  <div
    v-else
    class="group"
    relative
    flex
    h-52
    bg="white dark:$dark-bg-color"
    rounded-xl
    overflow-hidden
    cursor-pointer
    @click="$router.push(`/articles/${article.title}`)"
  >
    <!-- 左上角的分类名 绝对定位 -->
    <div
      style="box-shadow:0 1px 8px 0 rgb(240 240 240 / 50%)"
      pos="absolute top-1.5 left-1.5"
      p="x2 y1"
      bg="white dark:#131415 !opacity-80 hover:!$primary-color"
      text="sm dark-50 dark:gray-200 hover:white"
      font-600
      rounded-lg
      duration-300
      z-9
      @click.stop="$router.push(`/categories/${article.category.name}`)"
    >
      {{ article.category.name }}
    </div>
    <!-- 左侧图片 -->
    <div w="40% group-hover:30%" duration-400 overflow-hidden>
      <img
        :src="article.coverImage"
        alt="coverImage"
        loading="lazy"
        h-full
        w-full
        object-cover
        scale="group-hover:110"
        duration-400
      >
    </div>
    <!-- 右侧内容 -->
    <div
      flex
      w="60% group-hover:70%"
      p="x6"
      duration-400
    >
      <div
        relative
        flex="~ col"
        w-full
        h-full
      >
        <!-- 标题和摘要 -->
        <div pos="absolute top-8 group-hover:top-4" duration-400>
          <div text="5.5 dark-200 dark:white" font-bold line-clamp-2>
            {{ article.title }}
          </div>
          <div text="base dark-50 dark:gray-400" pt-2 line-clamp-2>
            {{ article.summary }}
          </div>
        </div>
        <!-- 创建日期和标签 -->
        <div
          pos="absolute bottom-6 group-hover:bottom-4"
          flex
          items-center
          text="sm dark-50 dark:gray-200"
          duration-400
        >
          <div i-fa6-solid:calendar-days mr-1 text-xs />
          <div mr-4>
            {{ createTime }}
          </div>
          <div i-fa6-solid:tag mr-1 text-xs />
          <div v-for="(tag, index) in article.tags" :key="tag.id">
            <span
              hover="underline text-$primary-color"
              @click.stop="$router.push(`/tags/${tag.name}`)"
            >
              {{ tag.name }}
            </span>
            <span v-if="index !== article.tags.length - 1" px-1>
              {{ '•' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
