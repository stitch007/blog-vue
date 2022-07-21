<script setup lang="ts">
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  darkTheme,
  useLoadingBar,
  useMessage,
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent, h } from 'vue'
import { useAppStore } from '@/stores'

const { naiveThemeOverrides, isDark } = storeToRefs(useAppStore())

const NaiveProviderContent = defineComponent({
  setup() {
    window.$message = useMessage()
    window.$loadingBar = useLoadingBar()
    return () => h('div')
  },
})
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
