<script setup lang="ts">
import dayjs from 'dayjs'
import { useLibraryStore } from '@/stores'

const lib = useLibraryStore()
</script>

<template>
  <Card pb-3>
    <template #head-left>
      <div flex items-center pl-3>
        <div i-fa6-solid:scissors text-sm />
        <div pl-2>
          来这边看看吧~
        </div>
      </div>
    </template>
    <template #default>
      <div
        v-for="(article, index) in lib.articles"
        :key="article.id"
        :class="[index === 0 ? 'mt-2' : 'mt-1']"
        flex
        items-center
        h-18
        px-1
        bg="hover:$primary-color"
        text="hover:gray-100"
        rounded-xl
        duration-300
        cursor-pointer
      >
        <div w-16 h-16 overflow-hidden>
          <img
            :src="article.coverImage"
            alt="coverImage"
            loading="lazy"
            w-full
            h-full
            rounded-lg
            object-cover
          >
        </div>
        <div
          flex="~ col basis-0 grow"
          justify-center
          p="l2.5"
        >
          <div font-bold line-clamp-2>
            {{ article.title }}
          </div>
          <div text-sm line-clamp-1 opacity-80>
            {{ dayjs(article.createTime).format('YYYY/MM/DD') }}
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
