<script setup lang="ts">
import randomColor from 'randomcolor'
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()

const styles = (num: number) => {
  return {
    color: randomColor(),
    fontSize: `${1.25 + num * 0.04}rem`,
  }
}
</script>

<template>
  <main max-w-1200px m="xauto t-20" p="x2 md:x8">
    <Card p="x2 y6 md:x18" text-center>
      <div w-full text-2xl pb-4>
        {{ '标签 - ' + lib.sameTagArticles.length }}
      </div>
      <div>
        <RouterLink
          v-for="tag in lib.sameTagArticles"
          :key="tag.tag.id"
          :to="`/tags/${tag.tag.name}`"
          :style="styles(tag.articles.length)"
          hover="!bg-$primary-color !text-gray-100 scale-108"
          inline-block
          m="x2 y2"
          p="x2 md:x4"
          bg="zinc-100 dark:zinc-900"
          leading-loose
          rounded-xl
          duration-300
        >
          <span>{{ tag.tag.name }}</span>
          <sup>{{ tag.articles.length }}</sup>
        </RouterLink>
      </div>
    </Card>
  </main>
</template>
