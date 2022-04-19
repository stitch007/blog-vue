<script setup lang="ts">
import { darkTheme, useLoadingBar, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores'

const NaiveProviderContent = defineComponent({
  setup() {
    window.$message = useMessage()
    window.$loadingBar = useLoadingBar()
    return () => h('div')
  },
})

const theme = useThemeStore()
</script>

<template>
  <NConfigProvider
    :theme-overrides="theme.naiveThemeOverrides"
    :theme="theme.isDark ? darkTheme : undefined"
  >
    <NLoadingBarProvider>
      <NMessageProvider>
        <slot />
        <NaiveProviderContent />
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
