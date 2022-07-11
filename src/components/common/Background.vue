<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStarry } from '@/composables'
import { useAppStore } from '@/stores'

const { isDark } = storeToRefs(useAppStore())
const { el: canvasRef } = useStarry(isDark)
</script>

<template>
  <Teleport to="body">
    <div id="background">
      <div />
      <canvas ref="canvasRef" />
    </div>
  </Teleport>
</template>

<style>
#background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -99;
}

#background > div {
  width: 100%;
  height: 100%;
}

.dark #background > div {
  background: #0F172A;
}

.dark #background > div::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.dark #background > canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;
}
</style>
