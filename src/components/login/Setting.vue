<script setup lang="ts">
import { NModal } from 'naive-ui'
import Card from '../common/Card.vue'
import Login from './Login.vue'
import { useAppStore } from '@/stores'

const app = useAppStore()
</script>

<template>
  <NModal v-model:show="app.showSettingPage">
    <Card w="80 md:100">
      <Login m="x2 t4" />
    </Card>
  </NModal>
</template>
