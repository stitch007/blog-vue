<script lang="ts" setup>
import { useAppStore, useLibraryStore } from '@/stores'

const app = useAppStore()
const lib = useLibraryStore()

const currentTabIndex = ref(0)

const scroll = () => {
  window.scrollTo(0, 254)
}
</script>

<template>
  <div>
    <header flex relative>
      <div
        style="text-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;"
        flex="~ col"
        items-center
        w-full
        m="y16 md:y18"
        font-bold
        text="8 md:11 white opacity-90 center"
      >
        <div>
          Stitch's BLOG
        </div>
        <div
          display="md:none"
          flex
          justify-between
          w-16
          p="t2"
          text="xl gray-50 opacity-70"
        >
          <Link />
        </div>
      </div>
      <div
        class="arrow"
        i-fa6-solid:angle-down
        pos="absolute bottom-6 md:bottom-8"
        w-full
        text="xl md:2xl white center"
        cursor-pointer
        @click="scroll"
      />
    </header>
    <main max-w-1464px m="xauto" p="x2 md:x8">
      <TalkBar />
      <div flex m="t4">
        <Tabs v-model:active="currentTabIndex" w-full>
          <TabPanel name="首页">
            <div
              v-for="article in lib.articles"
              :key="article.id"
            >
              <HomeArticleCard :article="article" mt-4 />
              <HomeArticleCard :article="article" reverse mt-4 />
              <HomeArticleCard :article="article" mt-4 />
              <HomeArticleCard :article="article" reverse mt-4 />
              <HomeArticleCard :article="article" mt-4 />
              <HomeArticleCard :article="article" reverse mt-4 />
            </div>
          </TabPanel>
          <TabPanel v-for="(category, index) in lib.categories" :key="category.id" :name="category.name">
            <div
              v-for="article in lib.sameCategoryArticles[index].articles"
              :key="article.id"
              mt-4
            >
              <HomeArticleCard :article="article" :reverse="index % 2 == 0" />
            </div>
          </TabPanel>
        </Tabs>
        <div
          display="none lg:flex"
          w="30%"
          max-w-70
          ml-4
        >
          <div>
            <div :class="app.showNavbar ? 'top-18' : 'top-4'" sticky duration-300>
              <Profile />
              <Archives mt-4 />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.arrow {
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  animation: move 1.5s infinite;
}

@keyframes move {
  0% {
    transform: translateY(15px);
    opacity: 1;
    filter: alpha(opacity=40);
  }
  50% {
    transform: translateY(0);
    opacity: 0.4;
    filter: none;
  }
  100% {
    transform: translateY(15px);
    opacity: 1;
    filter: alpha(opacity=40);
  }
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
