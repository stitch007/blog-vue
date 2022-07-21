<script setup lang="ts">
import { computed } from 'vue'
import { BasicLayout } from '@/components/layouts'
import { Card, Toolbar } from '@/components/common'
import { ArticleCard, HomeSide } from '@/components/business'
import { useLibraryStore } from '@/stores'
import { changeTitle } from '@/composables'

const lib = useLibraryStore()
changeTitle('全部文章')

// map { article.id => year }
const createTimeMap = computed(() => {
  const map = new Map<number, number>()
  lib.articles.forEach(article => map.set(article.id, new Date(article.createTime).getFullYear()))
  return map
})

// 年份只显示一次
const seen = new Set<number>()
const shouldShowYear = (id: number) => {
  const year = createTimeMap.value.get(id)
  if (year && !seen.has(year)) {
    seen.add(year)
    return true
  }
  return false
}
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar :title="`全部文章 - ${lib.articles.length}`" />
      <Card bordered>
        <div v-for="article in lib.articles" :key="article.id">
          <!-- 年份 只显示一次 -->
          <h1
            v-if="shouldShowYear(article.id)"
            :title="createTimeMap.get(article.id)?.toString()"
            mb2 text="xl center $primary-color" font-bold
          >
            {{ createTimeMap.get(article.id) }}
          </h1>
          <ArticleCard :article="article" m="x2 md:x8 y2" />
        </div>
      </Card>
    </template>
    <template #right>
      <div h13 />
      <div sticky top-4>
        <HomeSide />
      </div>
    </template>
  </BasicLayout>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
