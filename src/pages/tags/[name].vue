<script setup lang="ts">
import { useLibraryStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const lib = useLibraryStore()

const sameTagArticle = lib.sameTagArticles.find((item) => {
  return item.tag.name === route.params.name as string
})
if (typeof sameTagArticle === 'undefined') {
  router.push('/404')
}
</script>

<template>
  <main max-w-1200px m="xauto t-20" p="x2 md:x8">
    <ArticleSort
      v-if="sameTagArticle"
      :title="`标签 - ${sameTagArticle.tag.name}`"
      :articles="sameTagArticle.articles"
    />
  </main>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
