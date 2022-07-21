<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<template>
  <div flex flex-col items-center mt20>
    <RouterView />
    <NButton type="primary" text-color="white" rounded-md @click="$router.replace('/')">
      回到首页
    </NButton>
  </div>
</template>
