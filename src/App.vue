<script setup lang="ts">
import { NaiveProvider } from '@/components/common'
import { useAppStore, useLibraryStore } from '@/stores'

const token = localStorage.getItem('token')

token && token.length > 0 && useAppStore().fetchUserInfo()
useLibraryStore().fetchData()
</script>

<template>
  <NaiveProvider>
    <RouterView />
  </NaiveProvider>
</template>
