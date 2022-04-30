<script setup lang="ts">
import type { VNode } from 'vue'
import { useHorizontalScroll } from '@/composables'

const tabs = computed(() => {
  return useSlots().default?.()?.reduce((acc, cur) => {
    if (cur.type.toString() === 'Symbol(Fragment)') {
      return [...acc, ...(cur.children as VNode[])]
    }
    return [...acc, cur]
  }, [] as VNode[])
})
const tabNames = computed(() => {
  return tabs.value?.map(tab => tab.props?.name as string)
})

const props = defineProps<{ active: number }>()
const emit = defineEmits<{ (e: 'update:active', index: number): void }>()
const currentTabIndex = computed({
  get: () => props.active,
  set: (value: number) => emit('update:active', value),
})

const { el: scrollbarRef } = useHorizontalScroll()
</script>

<template>
  <div v-if="tabs">
    <div
      relative
      flex
      items-center
      p="y2"
      bg="white dark:$dark-bg-color"
      text="base dark-200 dark:white"
      font="bold"
      rounded-xl
    >
      <slot name="before" />
      <div
        ref="scrollbarRef"
        class="scrollbar"
        overflow-x-scroll
        whitespace-nowrap
      >
        <Shrink
          v-for="(name, index) in tabNames"
          :key="index"
          :class="{'bg-$primary-color text-white pointer-events-none': currentTabIndex === index,
                   '!mr-0': index === tabs.length - 1}"
          m="r1 md:r4 xl:r8"
          cursor-pointer
          @click="currentTabIndex = index"
        >
          {{ name }}
        </Shrink>
      </div>
      <slot name="after" />
    </div>
    <KeepAlive>
      <Component :is="tabs[currentTabIndex]" :key="currentTabIndex" />
    </KeepAlive>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
