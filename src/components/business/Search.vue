<script setup lang="ts">
import { NInput, NModal } from 'naive-ui'
import { Index } from 'flexsearch'
import RemoveMd from 'remove-markdown'
import { useThrottleFn, useVModel } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { ref, watch, watchEffect } from 'vue'
import { Card } from '@/components/common'
import { useLibraryStore } from '@/stores'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'update:show', index: boolean): void }>()
const show = useVModel(props, 'show', emit)

const lib = useLibraryStore()
const router = useRouter()

const flexSearch = new Index({ tokenize: 'full' })
const searchKey = ref('')
const searchResult = ref<number[]>([])

const onResultItemClick = (id: number) => {
  show.value = false
  router.push(`/articles/${id}`)
}

const getResultItemText = (id: number) => {
  const title = lib.articles.find(item => item.id === id)?.title
  if (title) {
    return title.replace(searchKey.value, `<em text="$primary-color" not-italic>${searchKey.value}</em>`)
  }
  return '文章不存在'
}

watchEffect(() => {
  lib.articles.forEach((item) => {
    flexSearch.add(item.id, item.title + RemoveMd(item.content))
  })
})

watch(searchKey, useThrottleFn(() => {
  searchResult.value = flexSearch.search(searchKey.value) as number[]
}, 300, false))
</script>

<template>
  <NModal v-model:show="show">
    <Card pos="fixed top-25 left-[calc(50%-10rem)] md:left-[calc(50%-15rem)]" w="80 md:120" p6>
      <div pb-4 text="xl $primary-color" font-bold>
        搜索
      </div>
      <NInput v-model:value="searchKey" placeholder="开始搜索吧..." rounded-xl />
      <hr mt-4 border="2 dashed $primary-color" opacity-70>
      <div max-h-300px>
        <div
          v-for="(id, index) in searchResult" :key="id"
          :class="{'mt-4': index === 0}" py-1
          text="hover:$primary-color" font-bold
          cursor-pointer duration-300 line-clamp-1
          @click="onResultItemClick(id)"
          v-html="getResultItemText(id)"
        />
      </div>
    </Card>
  </NModal>
</template>
