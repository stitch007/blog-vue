<script setup lang="ts">
import randomColor from 'randomcolor'
import { BasicLayout } from '@/components/layouts'
import { Card, Toolbar } from '@/components/common'
import { HomeSide } from '@/components/business'
import { useLibraryStore } from '@/stores'
import { changeTitle } from '@/composables'

const lib = useLibraryStore()
changeTitle('全部标签')

const styles = (num: number) => {
  return {
    color: randomColor(),
    fontSize: `${1.25 + num * 0.04}rem`,
  }
}
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar :title="`全部标签 - ${lib.tags.length}`" />
      <Card bordered text-center>
        <RouterLink
          v-for="tag in lib.sameTagArticles" :key="tag.tag.id" :to="`/tags/${tag.tag.id}`"
          :style="styles(tag.articles.length)" inline-block
          hover="!bg-$primary-color !text-gray-100 scale-108" m="x2 y2" p="x2 md:x4"
          bg="zinc-100 dark:zinc-900" leading-loose rounded-xl duration-300
        >
          <span>{{ tag.tag.name }}</span>
          <sup>{{ tag.articles.length }}</sup>
        </RouterLink>
      </Card>
    </template>
    <template #right>
      <div h13 />
      <HomeSide />
    </template>
  </BasicLayout>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
