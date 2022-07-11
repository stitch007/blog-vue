<script setup lang="ts">
import { NConfigProvider, NLoadingBarProvider, NMessageProvider, darkTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'
import NaiveProviderContent from './NaiveProviderContent.vue'
import { useAppStore } from '@/stores'

const { naiveThemeOverrides, isDark } = storeToRefs(useAppStore())
</script>

<template>
  <NConfigProvider
    :theme-overrides="naiveThemeOverrides"
    :theme="isDark ? darkTheme : undefined"
  >
    <NLoadingBarProvider>
      <NMessageProvider>
        <slot />
        <NaiveProviderContent />
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
