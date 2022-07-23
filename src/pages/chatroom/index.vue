<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { ChatRecord } from '@/components/business'
import { BlankLayout } from '@/components/layouts'
import { Card, Toolbar } from '@/components/common'
import { useAppStore } from '@/stores'
import type { CharRecord, WebSocketMessage } from '@/service'
import { changeTitle } from '@/composables'

const app = useAppStore()

changeTitle('聊天室')

// 聊天记录
const chatRecords = ref<CharRecord[]>([])
// 当前在线人数
const onlineCount = ref(0)
// 输入框的值
const input = ref('')

const chatBoxEl = ref<HTMLElement | null>(null)
const shouldScrollToBottom = ref(true)
const scrollToBottom = () => {
  if (shouldScrollToBottom.value) {
    nextTick(() => {
      if (chatBoxEl.value) {
        chatBoxEl.value.scrollTop = chatBoxEl.value.scrollHeight - chatBoxEl.value.clientHeight
      }
    })
    shouldScrollToBottom.value = false
  }
}

// websocket相关
const url = `${import.meta.env.VITE_WEBSOCKET_URL}/${app.user.token}`
const websocket = new WebSocket(url)

websocket.onopen = () => {}
websocket.onclose = () => {}
websocket.onerror = () => window.$message?.error('似乎出了点问题')
websocket.onmessage = (e) => {
  const message = JSON.parse(e.data) as WebSocketMessage
  if (message.type === 1) {
    onlineCount.value = message.data
  } else if (message.type === 2) {
    chatRecords.value.push(...message.data)
    scrollToBottom()
  } else if (message.type === 3) {
    chatRecords.value.push(message.data)
    scrollToBottom()
  } else if (message.type === 4) {
    const index = chatRecords.value.findIndex(item => item.id === message.data.id)
    if (index >= 0) {
      chatRecords.value.splice(index, 1)
    }
  }
}

onBeforeUnmount(() => {
  websocket.close()
})

// 发消息
const sendMessage = () => {
  if (websocket.readyState === 1) {
    if (input.value.length === 0) {
      window.$message?.info('不能发送空消息')
      return
    }
    const message: WebSocketMessage = {
      type: 3,
      data: {
        userId: app.user.id,
        username: app.user.username,
        avatarUrl: app.user.avatarUrl,
        content: input.value,
      },
    }
    input.value = ''
    websocket.send(JSON.stringify(message))
    shouldScrollToBottom.value = true
  }
}
</script>

<template>
  <BlankLayout>
    <Toolbar :title="`聊天室 - ${onlineCount}`" />
    <Card bordered relative>
      <div
        ref="chatBoxEl"
        class="hidden-scrollbar"
        style="height: calc(100vh - 7.375rem - 36px);"
        overflow-y-auto
      >
        <ChatRecord
          v-for="(chat, index) in chatRecords"
          :key="index"
          :chat="chat"
          :reverse="chat.userId === app.user.id ? true : false"
          py1
        />
      </div>
      <div flex w-full pt4>
        <NInput v-model:value="input" placeholder="" />
        <NButton type="primary" text-color="white" ml4 @click="sendMessage">
          发送
        </NButton>
      </div>
    </Card>
  </BlankLayout>
</template>
