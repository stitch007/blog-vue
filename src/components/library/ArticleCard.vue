<script setup lang="ts">
import dayjs from 'dayjs'
import type { Article } from '@/service'

defineProps<{ article: Article }>()
</script>

<template>
  <div
    flex
    cursor-pointer
    @click="$router.push('/articles/' + article.title)"
  >
    <div w="20 md:38" h="16 md:20" rounded-lg overflow-hidden>
      <img
        :src="article.coverImage"
        alt="coverImage"
        loading="lazy"
        w-full
        h-full
        transform="hover:scale-110"
        object-cover
        duration-300
      >
    </div>
    <div
      flex="~ col basis-0 grow"
      justify-center
      p="l4"
    >
      <div
        max-w-720px
        text="lg hover:$primary-color"
        transform="hover:translate-x-2"
        font-bold
        line-clamp-1
        duration-300
      >
        {{ article.title }}
      </div>
      <div my-1 />
      <div flex opacity-70>
        <div flex items-center>
          <div i-fa6-solid:calendar-days text-sm />
          <div text-sm ml-1>
            {{ dayjs(article.createTime).format('YYYY/MM/DD') }}
          </div>
        </div>
        <div display="none md:flex" items-center ml-2>
          <div i-fa6-solid:tag text-sm />
          <div
            v-for="(tag, index) in article.tags"
            :key="tag.id"
            :class="[index === 0 ? 'ml-1' : 'ml-2']"
            text="hover:$primary-color"
            @click.stop="$router.push('/tags/' + tag.name)"
          >
            {{ '#' + tag.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
