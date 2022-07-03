<script lang="ts" setup>
import { getTabOptions } from '@/views/home/tabOptions'

const active = ref(0)
const { options } = getTabOptions()
</script>

<template>
  <div w-0 grow shrink lg:w175 lg:grow-0>
    <HomeNav />
    <HomeTabs v-model:active="active" :options="options" />
  </div>
  <div hidden w70 md:block shrink-0 md:grow-0>
    <div h13 />
    <HomeSide />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default_
</route>
