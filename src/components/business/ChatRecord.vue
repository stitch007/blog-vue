<script setup lang="ts">
import dayjs from 'dayjs'
import DefaultAvatar from '@/assets/img/default-avatar.png'
import type { CharRecord } from '@/service'

defineProps<{
  chat: CharRecord
  reverse?: boolean
}>()
</script>

<template>
  <div flex :class="[reverse && 'flex-row-reverse']">
    <div w9 h9 shrink-0 :class="[reverse ? 'ml2' : 'mr2']">
      <img :src="chat.avatarUrl || DefaultAvatar" w9 h9 rounded-lg>
    </div>
    <div flex flex-col>
      <div text-sm mb1 :class="[reverse && 'hidden']">
        {{ chat.username || '未知用户' }}
      </div>
      <div flex items-center mb1 :class="[reverse ? 'flex-row-reverse ml9' : 'mr9']">
        <div px2 py1 border="~ gray-200 rounded-md" bg-gray-50>
          {{ chat.content }}
        </div>
        <div grow shrink-0 />
      </div>
      <div text="xs" flex :class="[reverse && 'flex-row-reverse']">
        {{ dayjs(chat.createTime).format('YYYY-MM-DD HH:mm') }}
      </div>
    </div>
    <div grow shrink-0 />
  </div>
</template>
