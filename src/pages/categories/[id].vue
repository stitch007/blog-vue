<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import BasicLayout from '@/components/layouts/BasicLayout.vue'
import Toolbar from '@/components/navigation/Toolbar.vue'
import ArticleCard from '@/components/articles/ArticleCard.vue'
import HomeSide from '@/components/home/HomeSide.vue'
import type { Category } from '@/service'
import { useLibraryStore } from '@/stores'
import { changeTitle } from '@/composables'
import Card from '@/components/common/Card.vue'

const route = useRoute()
const lib = useLibraryStore()

const category = ref<Category | null>(null)

// 根据 id 找分类
watchEffect(() => {
  category.value = lib.categories.find(category => category.id.toString() === route.params?.id) || null
  category.value && changeTitle(`${category.value.name}`)
})

// 找这个分类的所有文章
const articles = computed(() => {
  return lib.sameCategoryArticles.find(item => item.category.id === category.value?.id)?.articles
})
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar :title="`${category?.name} - ${articles?.length}`" />
      <!-- 文章列表 -->
      <Card bordered>
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" m="x2 md:x8 y2" />
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
