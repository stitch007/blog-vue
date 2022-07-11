<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import BasicLayout from '@/components/layouts/BasicLayout.vue'
import Toolbar from '@/components/navigation/Toolbar.vue'
import DynamicTags from '@/components/common/DynamicTags.vue'
import HomeSide from '@/components/home/HomeSide.vue'
import { useAppStore, useLibraryStore } from '@/stores'
import { useEditor } from '@/composables'
import Card from '@/components/common/Card.vue'

const { theme, isDark } = storeToRefs(useAppStore())
const lib = useLibraryStore()

const title = ref('')
const categories = ref<string[]>([])
const tags = ref<string[]>([])
const categoryOptions = computed(() => lib.categories.map(item => item.name))
const tagOptions = computed(() => lib.tags.map(item => item.name))

const { editorEl, switchTheme } = useEditor(isDark.value)

watch(() => isDark, val => switchTheme(val ? 'dark' : 'light'))
</script>

<template>
  <BasicLayout>
    <template #left>
      <Toolbar title="写文章" />
      <Card bordered p="x2 y2">
        <div border="b-1px gray-200 dark:opacity-5">
          <input
            v-model="title" type="text" placeholder="标题"
            w-full p="x5 y3" text="lg" font-bold outline-none bg="white dark:$dark-bg-color" rounded-md
          >
        </div>
        <div ref="editorEl" />
        <div bg="white dark:$dark-bg-color" border="t-1px gray-200 dark:opacity-5">
          <div flex m="x4 t4" text="base gray-600">
            <div grow p="x2 children:b4" text="dark:gray-200">
              <div flex>
                <span whitespace-nowrap mr-6>分类</span>
                <DynamicTags v-model:value="categories" tip="分类" :options="categoryOptions" :max="1" />
              </div>
              <div flex>
                <span whitespace-nowrap mr-6>标签</span>
                <DynamicTags v-model:value="tags" tip="标签" :options="tagOptions" :max="8" />
              </div>
            </div>
            <NButton
              :color="theme.primaryColor"
              bg="$primary-color" text-color="white"
            >
              发布文章
            </NButton>
          </div>
        </div>
      </Card>
    </template>
    <template #right>
      <div h13 />
      <HomeSide />
    </template>
  </BasicLayout>
</template>

<style>
@import 'vditor/dist/index.css';

.vditor {
  --textarea-background-color: #fff;
}

.vditor--dark {
  --panel-background-color: #1d1b26;
  --textarea-background-color: #1d1b26;
}

.vditor {
  border: none;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.375rem;
}

.vditor-toolbar {
  padding-left: 0!important;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border-bottom: 1px solid rgba(229, 231, 235);
  padding-left: 1rem !important;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  transition: all .25s;
  z-index: 101;
}

.dark .vditor-toolbar {
  background-color: #1d1b26;
  border-bottom: 1px solid rgba(229, 231, 235, 0.05);
}

.vditor-reset {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  padding: 1rem !important;
}

.vditor-toolbar__item > button {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  padding: 0 !important;
}

.vditor-toolbar__item > button > svg {
  width: 1rem;
  height: 1rem;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
