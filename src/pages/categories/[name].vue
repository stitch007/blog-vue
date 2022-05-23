<script setup lang="ts">
import { useLibraryStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const lib = useLibraryStore()
useTitle(`${route.params.name} | Stitch\'s BLOG`)

const sameCategoryArticle = lib.sameCategoryArticles.find((item) => {
  return item.category.name === route.params.name as string
})
if (typeof sameCategoryArticle === 'undefined') {
  router.push('/404')
}
</script>

<template>
  <main max-w-1200px m="xauto t-20" p="x2 md:x8">
    <ArticleSort
      v-if="sameCategoryArticle"
      :title="`分类 - ${sameCategoryArticle.category.name}`"
      :articles="sameCategoryArticle.articles"
    />
  </main>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
