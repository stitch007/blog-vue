<script lang="ts" setup>
import { NButton, NDropdown } from 'naive-ui'
import Background from '@/components/common/Background.vue'
import Sidebar from '@/components/navigation/Sidebar.vue'
import RightSideMenu from '@/components/navigation/RightSideMenu.vue'
import Shrink from '@/components/common/Shrink.vue'
import { useAppStore } from '@/stores'
import { logout } from '@/service'

const app = useAppStore()

const navOptions = [
  {
    icon: 'i-ic:round-home',
    text: '首页',
    path: '/',
  },
  {
    icon: 'i-ic:round-article',
    text: '文章',
    path: '/articles',
  },
  {
    icon: 'i-ic:round-tag',
    text: '标签',
    path: '/tags',
  },
  {
    icon: 'i-ic:round-category',
    text: '分类',
    path: '/categories',
  },
]

const options = [
  {
    label: '退出登录',
    key: 'logout',
  },
]

const handleSelect = (key: string | number) => {
  if (key === 'logout') {
    logout().then(() => {
      app.clearUser()
    })
  }
}
</script>

<template>
  <Background />
  <Sidebar />
  <RightSideMenu />
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
            v-for="(option, index) in navOptions" :key="index"
            class="group"
            text="gray-700 dark:gray-200"
            m="xauto xl:l2 xl:r8 b2" p="x2 y2" xl:pl-4
          >
            <RouterLink :to="option.path" flex items-center group-hover="text-white duration-200">
              <div :class="option.icon" text-xl />
              <div hidden xl:block ml-6 text-base font-bold>
                {{ option.text }}
              </div>
            </RouterLink>
          </Shrink>
          <NButton
            v-if="!app.isLogin"
            :color="app.theme.primaryColor" text-color="white"
            hidden xl:flex m="t4 l4 r6" bg="$primary-color" rounded-md
            @click="$router.push('/login')"
          >
            登录
          </NButton>
          <div v-else grow flex flex-col justify-end>
            <NDropdown trigger="click" :options="options" @select="handleSelect">
              <div
                flex m="xauto y4 xl:4" p="1 xl:2" rounded-xl cursor-pointer
                bg="hover:slate-100 hover:dark:slate-800" duration-300
              >
                <img :src="app.user.avatarUrl" alt="avatar" w10 h10 rounded-xl>
                <div hidden xl:block pl2 text-base>
                  {{ app.user?.username }}
                </div>
              </div>
            </NDropdown>
          </div>
        </div>
      </div>
    </header>
    <main grow shrink min-h-screen>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--primary-color);
}
</style>
