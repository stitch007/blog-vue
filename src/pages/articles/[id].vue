<script setup lang="tsx">
import { computed, ref, watchEffect } from 'vue'
import Giscus from '@giscus/vue'
import { useRoute } from 'vue-router'
import BasicLayout from '@/components/layouts/BasicLayout.vue'
import Toolbar from '@/components/navigation/Toolbar.vue'
import ArticleToc from '@/components/articles/ArticleToc.vue'
import HomeSide from '@/components/home/HomeSide.vue'
import { changeTitle, useMarkdown } from '@/composables'
import type { Article } from '@/service'
import { useAppStore, useLibraryStore } from '@/stores'
import Card from '@/components/common/Card.vue'

const route = useRoute()
const lib = useLibraryStore()
const { isDark } = useAppStore()

const article = ref<Article | null>(null)

// 根据 id 找文章
watchEffect(() => {
  article.value = lib.articles.find(a => a.id.toString() === route.params?.id) || null
  article.value && changeTitle(`${article.value.title}`)
})

// 解析 markdown
const { content, contentEl, toc, progress } = useMarkdown(computed(() => article.value?.content))
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar :title="article?.title || ''" />
      <div overflow-auto>
        <Card bordered>
          <!-- 文章 -->
          <article ref="contentEl" class="markdown-body" v-html="content" />
          <div h4 />
          <!-- 评论 -->
          <Giscus
            repo="stitch007/blog-vue"
            repo-id="R_kgDOHYI8VQ"
            category="Announcements"
            category-id="DIC_kwDOHYI8Vc4CPO6X"
            mapping="specific"
            :term="article?.title"
            reactions-enabled="1"
            emit-metadata="0"
            input-position="top"
            :theme="isDark ? 'dark' : 'light'"
            lang="zh-CN"
            loading="lazy"
          />
        </Card>
        <div h4 />
      </div>
    </template>
    <template #right>
      <div h13 />
      <div sticky top-4>
        <!-- 目录 -->
        <ArticleToc :toc="toc" :process="progress" mb4 />
        <HomeSide />
      </div>
    </template>
  </BasicLayout>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
