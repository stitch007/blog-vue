<script setup lang="ts">
import { menuOptions } from './data'
import { useAppStore, useThemeStore } from '@/stores'

const app = useAppStore()
const theme = useThemeStore()

// 分割线上的船 点一下会动
const isBoating = ref(false)
</script>

<template>
  <NDrawer
    v-model:show="app.showSideNavbar"
    :width="240"
    bg="white dark:$dark-bg-color"
    text="dark-50 dark:gray-200"
  >
    <!-- 头像 -->
    <div m="xauto y4" w-110px>
      <img src="https://image-1304160910.file.myqcloud.com/avatar.jpg" alt="avatar" rounded-full>
    </div>
    <!-- 文库总计 -->
    <div px-8 text="dark-50 dark:gray-200">
      <LibraryCount />
    </div>
    <!-- 链接和切换深浅模式 -->
    <div
      flex
      justify-center
      m="children:x1"
      text="5 gray-600 dark:gray-200"
    >
      <Link />
      <div i-fa6-solid:moon dark:text-yellow-300 @click="theme.toggleDark" />
    </div>
    <!-- 分割线 -->
    <div
      class="split-line"
      :class="{'boat-move': isBoating}"
      relative
      @click="isBoating = !isBoating"
    >
      <hr border="2 dashed cyan-200" m="y4">
    </div>
    <!-- menus -->
    <div class="menu" p="x1 y1">
      <NMenu :options="menuOptions" />
    </div>
  </NDrawer>
</template>

<style scoped>
.split-line {
  animation: split-line-appear .6s;
}

@keyframes split-line-appear {
  0% {
    transform: translateX(120px);
  }
  100% {
    transform: translateX(0);
  }
}

.split-line::before {
  position: absolute;
  content: '🚣';
  top: -17px;
  left: 5%;
  color: #0cbdce;
  font-size: 20px;
  line-height: 1;
  transition: all 1s ease-in-out;
}

.boat-move::before {
  left: 85%;
}

.menu {
  animation: menu-appear .8s;
}

@keyframes menu-appear {
  0% {
    transform: translateX(160px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
