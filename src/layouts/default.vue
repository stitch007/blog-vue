<script lang="ts" setup>
import { NButton, NDropdown } from 'naive-ui'
import { BlogTitle, Sidebar } from '@/components/business'
import { BackToTop, Background, Shrink } from '@/components/common'
import { useAppStore } from '@/stores'
import { logout } from '@/service'
import { navOptions } from '@/router'

const app = useAppStore()

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
  <BackToTop />
  <Sidebar />
  <div flex bg=" dark:transparent" text="gray-700 dark:white">
    <header hidden md:flex justify-end lg:grow lg:shrink>
      <div w16 xl:w64>
        <div w16 xl:w64 fixed h-screen flex flex-col>
          <a href="/" flex items-center m="xauto xl:x2 b4" h13>
            <div text-3xl>😉</div>
            <BlogTitle hidden xl:block pl-3 />
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
            type="primary"
            text-color="white"
            hidden xl:flex rounded-md
            m="t4 l4 r6"
            @click="$router.push('/login')"
          >
            登录
          </NButton>
          <div v-else grow flex flex-col justify-end>
            <NDropdown trigger="click" :options="options" @select="handleSelect">
              <Shrink flex m="xauto y4 xl:4" p="1 xl:2" rounded-xl cursor-pointer>
                <img :src="app.user.avatarUrl" alt="avatar" w10 h10 rounded-xl>
                <div hidden xl:block pl2 text-base>
                  {{ app.user?.username }}
                </div>
              </Shrink>
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
