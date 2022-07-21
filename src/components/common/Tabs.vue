<script setup lang="ts">
import type { VNode } from 'vue'
import { useVModel } from '@vueuse/core'
import { Card, Shrink } from '@/components/common'
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
const currentTabIndex = useVModel(props, 'active', emit)

const { el: scrollbarRef } = useHorizontalScroll()
</script>

<template>
  <div>
    <Card bordered flex items-center py2>
      <div
        ref="scrollbarRef" class="scrollbar"
        text-base font-bold
        overflow-x-scroll whitespace-nowrap
      >
        <Shrink
          v-for="(option, index) in options" :key="index"
          :class="{
            'bg-$primary-color text-white pointer-events-none': currentTabIndex === index,
            '!mr-0': index === options.length - 1
          }"
          m="r1 md:r4 xl:r8" cursor-pointer
          @click="currentTabIndex = index"
        >
          {{ option.name }}
        </Shrink>
      </div>
    </Card>
    <Component :is="options[currentTabIndex].render()" :key="currentTabIndex" />
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
