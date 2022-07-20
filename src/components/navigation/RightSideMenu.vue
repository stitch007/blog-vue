<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
      <div v-show="y > 100" @click="scrollToTop">
        <div i-fa6-solid:arrow-up />
      </div>
    </Transition>
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
</style>
