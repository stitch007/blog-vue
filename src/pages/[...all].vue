<script setup lang="ts">
import NotFountSvg from '@/assets/svg/404.svg'
import { changeTitle } from '@/composables'

changeTitle('页面消失了~~')
</script>

<template>
  <div inline-block w80 h80>
    <img :src="NotFountSvg">
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
