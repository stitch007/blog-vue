<script lang="ts" setup>
import BasicLayout from '@/components/layouts/BasicLayout.vue'
import HomeToolbar from '@/components/home/HomeToolbar.vue'
import HomeTabs from '@/components/home/HomeTabs'
import HomeSide from '@/components/home/HomeSide.vue'
import { changeTitle } from '@/composables'

changeTitle('首页')
</script>

<template>
  <BasicLayout>
    <template #left>
      <HomeToolbar />
      <HomeTabs />
    </template>
    <template #right>
      <div h13 />
      <HomeSide />
    </template>
  </BasicLayout>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
