<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isPathActive = (path: string) => {
  return route.path.split('/')[1] === path.slice(1)
}

const navOptions = [
  {
    icon: 'i-ic:round-home',
    text: '首页',
    path: '/',
    key: 0,
  },
  {
    icon: 'i-ic:round-article',
    text: '文章',
    path: '/articles',
    key: 1,
  },
  {
    icon: 'i-ic:round-tag',
    text: '标签',
    path: '/tags',
    key: 2,
  },
  {
    icon: 'i-ic:round-category',
    text: '分类',
    path: '/categories',
    key: 3,
  },
]
</script>

<template>
  <Background />
  <div flex bg="blue-gray-50 dark:transparent" text="gray-700 dark:white">
    <header hidden md:flex justify-end lg:grow lg:shrink>
      <div w16 xl:w64>
        <div w16 xl:w64 fixed h-screen flex flex-col>
          <a href="/" flex items-center m="xauto xl:x2 b4" h13>
            <div text-3xl>
              😉
            </div>
            <div hidden xl:block pl-3>
              <div flex items-center text-lg font-bold>
                <div pr-2 text="$primary-color dark:white">
                  STITCH'S
                </div>
                <div w="2.5" h="2.5" mr="-1.5" bg="$primary-color" rotate-45 />
                <div flex items-center p="l2 r2" bg="$primary-color" text-white rounded>
                  BLOG
                </div>
              </div>
            </div>
          </a>
          <Shrink
            v-for="option in navOptions" :key="option.key"
            :class="[isPathActive(option.path) ? 'text-$primary-color' : 'text-gray-700']"
            m="xauto xl:x2 b2" p="x2 y2" xl:pl-4 dark:text-gray-200
          >
            <RouterLink :to="option.path" flex items-center>
              <div :class="option.icon" text-xl />
              <div hidden xl:block ml-6 text-base font-bold>
                {{ option.text }}
              </div>
            </RouterLink>
          </Shrink>
        </div>
      </div>
    </header>
    <main flex grow shrink min-h-screen>
      <RouterView />
    </main>
  </div>
</template>
