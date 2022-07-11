<script setup lang="ts">
import Shrink from '@/components/common/Shrink.vue'

interface Props {
  title: string
}

const { title } = defineProps<Props>()
</script>

<template>
  <div relative flex items-center h13>
    <div pos="absolute top-0 left-2" flex items-center h13>
      <slot name="left">
        <Shrink p="x1 y1" cursor-pointer @click="$router.back()">
          <div i-ic:round-arrow-back text-xl />
        </Shrink>
      </slot>
    </div>
    <div px-10 grow shrink font-bold text-lg text-center line-clamp-1>
      <slot>
        {{ title }}
      </slot>
    </div>
  </div>
</template>
