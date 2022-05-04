<script setup lang="ts">
import type { StyleValue } from 'vue'
import { dropdownOptions, menus } from './data'
import { useAppStore, useThemeStore } from '@/stores'

const app = useAppStore()
const theme = useThemeStore()

const navbarStyle = computed((): StyleValue => {
  return {
    transition: 'background-color .25s ease-in-out',
    boxShadow: app.showNavbar && app.navbarBgSolid
      ? theme.isDark ? '0 5px 20px 0px rgba(28, 28, 28, 0.4)' : '0 5px 12px -5px rgba(102, 68, 68, 0.3)'
      : '',
  }
})
</script>

<template>
  <Transition name="navbar">
    <div
      v-show="app.showNavbar"
      :class="[app.navbarBgSolid ? 'bg-white dark:bg-$dark-bg-color' : 'bg-transparent']"
      :style="navbarStyle"
      pos="fixed top-0 left-0 right-0"
      h-14
      z-99
    >
      <div
        :class="[app.navbarBgSolid ? 'text-dark-50 dark:text-gray-200' : 'text-white opacity-90']"
        max-w-1464px
        flex
        items-center
        justify-between
        h-14
        p="x-4 md:x8"
        m="xauto"
      >
        <!-- 左边 名字 -->
        <Shrink
          class="group"
          relative
          flex
          items-center
          justify-center
          cursor-pointer
          @click="$router.push('/')"
        >
          <div
            :class="app.isPhone ? 'group-active:opacity-0' : 'group-hover:opacity-0'"
            font-bold
            text-lg
            opacity-100
            duration-300
          >
            STITCH
          </div>
          <div
            i-mdi-home
            :class="app.isPhone ? 'group-active:opacity-100' : 'group-hover:opacity-100'"
            absolute
            text-2xl
            opacity-0
            duration-300
          />
        </Shrink>
        <!-- 中间 menus 小于md不显示 -->
        <div display="none md:flex" relative>
          <NDropdown
            v-for="(menu, index) in menus"
            :key="index"
            trigger="hover"
            :options="dropdownOptions[index]"
            class="bg-white dark:bg-$dark-bg-color"
          >
            <Shrink
              flex
              items-center
              m="x2"
              p="x2 y1"
              cursor-pointer
            >
              <div :class="menu.icon" />
              <div pl-1 text-base font-bold>
                {{ menu.text }}
              </div>
            </Shrink>
          </NDropdown>
        </div>
        <!-- 右边 搜索,切换深浅模式和AppBar(小于md显示) -->
        <div flex items-center>
          <Shrink p="x2 y2" cursor-pointer>
            <div i-fa6-solid:magnifying-glass />
          </Shrink>
          <Shrink
            p="x2 y2"
            m="l1 md:l2"
            cursor-pointer
            @click="theme.toggleDark"
          >
            <div i-fa6-solid:moon dark:text-yellow-300 />
          </Shrink>
          <Shrink
            display="md:none"
            p="x2 y2"
            m="l1"
            cursor-pointer
            @click="app.showSideNavbar = true"
          >
            <div i-fa6-solid:bars />
          </Shrink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.navbar-enter-active {
  animation: appear .25s;
}

.navbar-leave-active {
  animation: appear .25s reverse;
}

@keyframes appear {
  0% {
    transform: translateY(-3.5rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
