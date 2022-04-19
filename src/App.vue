<script setup lang="ts">
import { useLibraryStore } from '@/stores'

document.body.addEventListener('touchstart', () => {})

useLibraryStore().fetchData()
</script>

<template>
  <NaiveProvider>
    <RouterView />
  </NaiveProvider>
</template>
