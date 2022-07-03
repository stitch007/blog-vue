<script setup lang="ts">
import { useThemeStore } from '@/stores'

const theme = useThemeStore()
</script>

<template>
  <nav flex justify-between items-center h13 m="l2 r4">
    <div flex justify-center>
      <Shrink p="x2 y2" cursor-pointer>
        <div i-fa6-solid:magnifying-glass />
      </Shrink>
      <div pr1 />
      <Shrink p="x2 y2" cursor-pointer @click="theme.toggleDark()">
        <div i-fa6-solid:moon dark:text-yellow-300 />
      </Shrink>
    </div>
    <NButton
      :color="theme.common.primaryColor"
      bg="$primary-color" text-color="white" rounded-md
      @click="$router.push('/editor')"
    >
      <span p="x1 y2">写文章</span>
    </NButton>
  </nav>
</template>
