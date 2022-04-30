<script setup lang="ts">
import { useAppStore } from '@/stores'

const { y } = useScroll(window)
const app = useAppStore()

const goUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onSettingClick = () => {
  app.showSettingPage = true
}
</script>

<template>
  <aside
    pos="fixed bottom-8 right-4"
    m="children:1"
    p="children:2"
    bg="children:$primary-color"
    rounded="children:md"
    text-white
    opacity-80
    cursor-pointer
    z-10
  >
    <Transition name="up">
      <div v-show="y > 100" @click="goUp">
        <div i-fa6-solid:arrow-up />
      </div>
    </Transition>
    <div @click="onSettingClick">
      <div i-fa6-solid:gear class="rotate" />
    </div>
  </aside>
</template>

<style scoped>
.up-enter-active {
  animation: appear .3s ease-in-out;
}

.up-leave-active {
  animation: appear .3s ease-in-out reverse;
}

@keyframes appear {
  0% {
    transform: translateX(4rem);
  }
  100% {
    transform: translateY(0);
  }
}

.rotate {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
