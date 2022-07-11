<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ref } from 'vue'
import Shrink from '../common/Shrink.vue'
import Search from '../search/Search.vue'
import { useAppStore } from '@/stores'

const app = useAppStore()

const showSearchModal = ref(false)
</script>

<template>
  <nav flex justify-between items-center h13 m="l2 r3">
    <div flex justify-center>
      <Shrink md:hidden p="x2 y2" mr1 cursor-pointer @click="app.showSidebar = true">
        <div i-fa6-solid:bars-staggered />
      </Shrink>
      <Shrink p="x2 y2" mr1 cursor-pointer @click="showSearchModal = true">
        <div i-fa6-solid:magnifying-glass />
        <Search v-model:show="showSearchModal" />
      </Shrink>
      <Shrink p="x2 y2" cursor-pointer @click="app.toggleDark()">
        <div i-fa6-solid:moon dark:text-yellow-300 />
      </Shrink>
    </div>
    <NButton
      :color="app.theme.primaryColor"
      bg="$primary-color" text-color="white" rounded-md
      @click="$router.push('/create')"
    >
      写文章
    </NButton>
  </nav>
</template>
