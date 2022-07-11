<script setup lang="ts">
import NaiveProvider from '@/components/provider/NaiveProvider.vue'
import { useLibraryStore } from '@/stores'

useLibraryStore().fetchData()
</script>

<template>
  <NaiveProvider>
    <RouterView />
  </NaiveProvider>
</template>
