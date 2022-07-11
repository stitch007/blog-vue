<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useAppStore } from '@/stores'

const app = useAppStore()
</script>

<template>
  <div flex flex-col items-center mt20>
    <RouterView />
    <NButton
      :color="app.theme.primaryColor" text-color="white"
      bg="$primary-color" rounded-md @click="$router.replace('/')"
    >
      回到首页
    </NButton>
  </div>
</template>
