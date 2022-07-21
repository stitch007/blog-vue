<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { BasicLayout } from '@/components/layouts'
import { Card, Toolbar } from '@/components/common'
import { ArticleCard, HomeSide } from '@/components/business'
import type { Tag } from '@/service'
import { useLibraryStore } from '@/stores'
import { changeTitle } from '@/composables'

const route = useRoute()
const lib = useLibraryStore()

const tag = ref<Tag | null>(null)

watchEffect(() => {
  tag.value = lib.tags.find(tag => tag.id.toString() === route.params?.id) || null
  tag.value && changeTitle(`${tag.value.name}`)
})

const articles = computed(() => {
  return lib.sameTagArticles.find(item => item.tag.id === tag.value?.id)?.articles
})
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar :title="`${tag?.name} - ${articles?.length}`" />
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
