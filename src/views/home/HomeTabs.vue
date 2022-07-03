<script setup lang="ts">
import type { VNode } from 'vue'
import { useHorizontalScroll } from '@/composables'

export interface TabOption {
  name: string
  render: () => VNode
}

interface Props {
  active: number
  options: TabOption[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:active', index: number): void }>()
const currentTabIndex = computed({
  get: () => props.active,
  set: (value: number) => emit('update:active', value),
})

const { el: scrollbarRef } = useHorizontalScroll()
</script>

<template>
  <div m="x2 md:r2 md:l0">
    <div
      flex items-center
      p="x4 y2"
      bg="white dark:$dark-bg-color"
      border="~ gray-200 dark:transparent rounded-md"
    >
      <div
        ref="scrollbarRef" class="scrollbar"
        text-base font-bold
        overflow-x-scroll whitespace-nowrap
      >
        <Shrink
          v-for="(option, index) in props.options" :key="index"
          :class="{
            'bg-$primary-color text-white pointer-events-none': currentTabIndex === index,
            '!mr-0': index === props.options.length - 1
          }"
          m="r1 md:r4 xl:r8" cursor-pointer
          @click="currentTabIndex = index"
        >
          {{ option.name }}
        </Shrink>
      </div>
    </div>
    <Component :is="props.options[currentTabIndex].render()" :key="currentTabIndex" />
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
