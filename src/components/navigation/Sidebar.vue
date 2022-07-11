<script setup lang="ts">
import { NDrawer } from 'naive-ui'
import { ref } from 'vue'
import LibraryCount from '../articles/LibraryCount.vue'
import Link from '../common/Link.vue'
import Card from '../common/Card.vue'
import { useAppStore } from '@/stores'

const app = useAppStore()

// 分割线上的船 点一下会动
const isBoating = ref(false)

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
  <NDrawer
    v-model:show="app.showSidebar"
    :width="240"
    placement="left"
    bg="white dark:$dark-bg-color"
    text="dark-50 dark:gray-200"
  >
    <!-- 头像 -->
    <div m="xauto y4" w16 h16>
      <img src="https://image-1304160910.file.myqcloud.com/avatar.jpg" alt="avatar" rounded-xl>
    </div>
    <Card p="x8 t2" flex flex-col>
      <LibraryCount />
      <Link flex justify-center pt2 />
    </Card>
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
    <div class="menu" px6>
      <div v-for="option in navOptions" :key="option.key" text="gray-600 dark:gray-200">
        <RouterLink :to="option.path" flex items-center w-full py2 my2>
          <div :class="option.icon" text-xl />
          <div pl4 text-base font-bold>
            {{ option.text }}
          </div>
        </RouterLink>
      </div>
    </div>
  </NDrawer>
</template>

<style scoped>
.split-line {
  animation: split-line-appear .6s;
}

@keyframes split-line-appear {
  0% {
    transform: translateX(-120px);
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
    transform: translateX(-160px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
