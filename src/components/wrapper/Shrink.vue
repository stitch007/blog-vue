<script setup lang="ts">
import { useAppStore } from '@/stores'

const app = useAppStore()
</script>

<template>
  <div
    class="border-shrink"
    :class="app.isPhone ? 'active:bg-$primary-color' : 'hover:bg-$primary-color'"
    inline-block
    p="x2 y0.5"
    text="hover:white"
    rounded-xl
    duration-200
  >
    <slot />
  </div>
</template>

<style scoped>
.border-shrink:hover {
  animation: border-shrink .3s;
}

@keyframes border-shrink {
  0% {
    border-radius: 2px;
  }
  100% {
    border-radius: 12px;
  }
}
</style>
