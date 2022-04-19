<script lang="ts" setup>
import { useScrollList } from '@/composables'
import { useAppStore, useLibraryStore } from '@/stores'

const app = useAppStore()
const lib = useLibraryStore()

const { scrollList, currentIndex } = useScrollList(
  computed(() => lib.talks.map(talk => talk.content)),
  computed(() => app.smallerThanMd ? 12 : 36),
)
</script>

<template>
  <div
    h-11
    flex
    justify-between
    items-center
    rounded-xl
    p="y2"
    bg="white dark:$dark-bg-color"
    text="base dark-100 dark:gray-200"
    cursor-pointer
    @click="$router.push('/message')"
  >
    <div i-fa6-solid:meteor m="l6" />
    <ul
      relative
      w-full
      h-full
      flex
      justify-center
      items-center
      text="base dark-200 dark:white"
      font-bold
      overflow-hidden
    >
      <NSkeleton v-if="scrollList.length === 0" width="66%" round />
      <TransitionGroup v-else name="scroll">
        <li
          v-for="(item, index) in scrollList"
          v-show="index === currentIndex"
          :key="index"
          absolute
          text="hover:$primary-color"
          duration-300
        >
          {{ item }}
        </li>
      </TransitionGroup>
    </ul>
    <div i-fa6-solid:circle-arrow-right m="r6" />
  </div>
</template>

<style scoped>
.scroll-enter-active {
  animation: enter-scroll 1s ease-in-out;
}

.scroll-leave-active {
  animation: leave-scroll 1s ease-in-out;
}

@keyframes enter-scroll {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes leave-scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
