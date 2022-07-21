<script setup lang="ts">
import { type IToc, Toc } from './Toc'
import { Card } from '@/components/common'

interface Props {
  toc: IToc[]
  process: number
}

const { toc, process } = defineProps<Props>()
</script>

<template>
  <Card bordered>
    <div flex justify-between items-center px2 pb2>
      <div flex items-center>
        <div text-sm i-fa6-solid:bars-staggered />
        <div text-base pl2>
          目录
        </div>
      </div>
      <div text-lg>
        {{ process }}
        <span text-sm>%</span>
      </div>
    </div>
    <Toc :toc="toc" />
  </Card>
</template>
