<script setup lang="ts">
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()

const showYear = (() => {
  const set = new Set<number>()
  return (time: Date) => {
    const year = time.getFullYear()
    if (!set.has(year)) {
      set.add(year)
      return true
    }
    return false
  }
})()
</script>

<template>
  <main max-w-1200px m="xauto t-20" p="x2 md:x8">
    <Card p="x6 y6 md:x12 md:y10">
      <div
        class="title"
        relative
        p="l4 b4 md:(l5 b6)"
        text="2xl"
      >
        {{ '文章总览 - ' + lib.articles.length }}
      </div>
      <div
        v-for="(article, index) in lib.articles"
        :key="article.id"
        :class="{'pt-4' : index !== 0}"
        relative
        p="l6 md:l8"
      >
        <h1
          v-if="showYear(new Date(article.createTime))"
          text="xl dark-50 dark:gray-200"
          pb-4
        >
          {{ new Date(article.createTime).getFullYear() }}
        </h1>
        <ArticleCard :article="article" />
      </div>
    </Card>
  </main>
</template>

<style scoped>
.title::before, .title ~ div::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  width: 0.1rem;
  background-color: var(--primary-color);
  opacity: 0.8;
}

.title::before {
  top: 1.5rem;
}

.title::after {
  position: absolute;
  content: "";
  top: 0.5rem;
  left: -0.45rem;
  width: 1rem;
  height: 1rem;
  border: 0.25rem solid var(--primary-color);
  border-radius: 0.5rem;
  opacity: 0.8;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
