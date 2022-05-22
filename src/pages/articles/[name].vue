<script setup lang="ts">
import dayjs from 'dayjs'
import Giscus from '@giscus/vue'
import { useAppStore, useLibraryStore, useThemeStore } from '@/stores'
import { useMarkdown, useToc } from '@/composables'

const route = useRoute()
const app = useAppStore()
const lib = useLibraryStore()
const theme = useThemeStore()

const article = computed(() => {
  return lib.articles.find(a => a.title === route.params?.name as string)
})

const { content, toc } = useMarkdown(computed(() => article.value?.content))
const { tocEl, contentEl, tocPercentage } = useToc()
</script>

<template>
  <div
    v-if="article"
    max-w-1400px
    m="xauto"
    p="x2 md:x8"
  >
    <header p="x4 t24 b16" text="base white">
      <!-- 分类和标签 -->
      <div flex items-center>
        <span i-fa6-solid:inbox inline-block text-sm />
        <RouterLink
          :to="`/categories/${article.category.name}`"
          pl-2
          font-bold
          cursor-pointer
        >
          {{ article.category.name }}
        </RouterLink>
        <RouterLink
          v-for="tag in article.tags"
          :key="tag.id"
          :to="`/tags/${tag.name}`"
          ml-4
          opacity="80 hover:90"
          cursor-pointer
          duration-200
        >
          {{ '#' + tag.name }}
        </RouterLink>
      </div>
      <!-- 标题 -->
      <h1
        max-w-960px
        my-4
        text="3xl"
        font-bold
        line-clamp-2
      >
        {{ article.title }}
      </h1>
      <!-- 作者 字数 阅读时间 最后更新时间 -->
      <div flex items-center>
        <span display="flex" items-center>
          <img
            src="https://image-1304160910.file.myqcloud.com/avatar.jpg"
            alt="avatar"
            inline-block
            w-7
            rounded-full
          >
          <span pl-2 font-bold>Stitch</span>
        </span>
        <div
          flex="~ children:~"
          items="children:center"
          pl-4
          opacity-80
        >
          <span>
            <span i-fa6-solid:calendar inline-block text-sm />
            <span display="lt-md:none" ml-1>最后更新于:</span>
            <span pl-2>{{ dayjs(article.updateTime).format('YYYY/MM/DD') }}</span>
          </span>
        </div>
      </div>
    </header>
    <main flex>
      <Card flex-grow w-full p="x6 y4 md:(x12 y8)" overflow-auto>
        <article ref="contentEl" class="markdown-body" v-html="content" />
        <div py-2 />
        <Giscus
          repo="stitch007/blog-vue"
          repo-id="R_kgDOHYI8VQ"
          category="Announcements"
          category-id="DIC_kwDOHYI8Vc4CPO6X"
          mapping="specific"
          :term="article.title"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          :theme="theme.isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
        />
      </Card>
      <div
        display="none lg:flex"
        w="[30%]"
        max-w-70
        ml-4
      >
        <div>
          <Profile />
          <div :class="app.showNavbar ? 'top-18' : 'top-4'" sticky duration-300>
            <Card mt-4 pb-3>
              <template #head-left>
                <div flex items-center pl-3>
                  <div text-sm i-fa6-solid:bars-staggered />
                  <div text-base pl-2>
                    目录
                  </div>
                </div>
              </template>
              <template #head-right>
                <div text-lg opacity-60 pr-3>
                  {{ tocPercentage }}
                </div>
              </template>
              <div ref="tocEl" mt-2 v-html="toc" />
            </Card>
            <Recommend mt-4 />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
