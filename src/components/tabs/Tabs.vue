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
const emit = defineEmits<{ (e: 'update:active', name: number): void }>()
const currentTabIndex = computed({
  get() {
    return props.active
  },
  set(value: number) {
    emit('update:active', value)
  },
})

const { el: scrollbarRef } = useHorizontalScroll()
</script>

<template>
  <div v-if="tabs" overflow-hidden>
    <div
      flex
      items-center
      relative
      p="y2"
      bg="white dark:$dark-bg-color"
      font="bold"
      text="base dark-200 dark:white"
      rounded-xl
    >
      <div
        i-fa6-solid:bookmark
        pos="absolute left-4"
        text="sm dark-100 dark:gray-200"
      />

      <div
        ref="scrollbarRef"
        class="scrollbar"
        m="l12 r16 md:l16"
        overflow-x-scroll
        whitespace-nowrap
      >
        <Shrink
          v-for="(name, index) in tabNames"
          :key="index"
          :class="{'bg-$primary-color text-white pointer-events-none': currentTabIndex === index}"
          m="r1 md:r4 xl:r8"
          cursor-pointer
          @click="currentTabIndex = index"
        >
          {{ name }}
        </Shrink>
      </div>

      <div
        pos="absolute right-4"
        text="base dark-100 dark:gray-200 hover:$primary-color"
        duration-300
        cursor-pointer
        @click="$router.push('/categories')"
      >
        更多
      </div>
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
