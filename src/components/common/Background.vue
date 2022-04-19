<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStarry } from '@/composables'
import { useThemeStore } from '@/stores'

const { isDark } = storeToRefs(useThemeStore())
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

.light #background > div {
  background: url('https://image-1304160910.file.myqcloud.com/genshin_yae_miko_2.jpg')
    center center / cover no-repeat;
}

.dark #background > div {
  background: linear-gradient(
    rgb(61, 153, 190) 0px,
    rgb(86, 49, 122) 31%,
    rgb(24, 23, 29) 100%
  );
}

.dark #background > div::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

#background > canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;
}
</style>
