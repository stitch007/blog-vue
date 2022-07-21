<script lang="ts" setup>
import { BasicLayout } from '@/components/layouts'
import { HomeSide, HomeTabs, HomeToolbar } from '@/components/business'
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
