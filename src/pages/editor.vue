<script setup lang="ts">
import { useAppStore, useLibraryStore, useThemeStore } from '@/stores'
import { useEditor } from '@/composables'
import type { SaveArticleParams } from '@/service'
import { saveArticle, uploadImage } from '@/service'

const app = useAppStore()
const lib = useLibraryStore()
const theme = useThemeStore()

// 数据绑定
const { el: editorEl, wordCount, getMarkdown } = useEditor()
const title = ref('')
const summary = ref('')
const image = ref<File>()
const categories = ref<string[]>([])
const tags = ref<string[]>([])
const categoryOptions = computed(() => lib.categories.map(item => item.name))
const tagOptions = computed(() => lib.tags.map(item => item.name))
const disableSubmit = ref(false)

// css bind
const shadow = computed(() => {
  return app.showNavbar
    ? '0px -0.5px 0px 0px rgb(235 235 235) inset, 0px 16px 32px rgba(0, 0, 0, 0.04) inset'
    : '0px -0.5px 0px 0px rgb(235 235 235) inset'
})
const top = computed(() => app.showNavbar ? '3.5rem' : '0')

onMounted(() => {
  app.mustBeSolid = true
  app.navbarBgSolid = true
})

onBeforeUnmount(() => {
  app.mustBeSolid = false
  app.navbarBgSolid = window.scrollY > 1
})

watchEffect(() => {
  if (app.smallerThanLg && !app.isPhone) {
    window.$message?.info('为了保证体验，请保持屏幕的宽度在1024px以上', { closable: true, duration: 0 })
  }
  if (theme.isDark) {
    theme.isDark = false
    window.$message?.info('暂不支持深色模式', { closable: true, duration: 0 })
  }
})

const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const onImageChange = (file: File) => {
  image.value = file
}

const handleSubmit = async () => {
  disableSubmit.value = true
  const content = getMarkdown()
  const error = (title.value ? '' : '标题、')
          + (content.length > 1 ? '' : '内容、')
          + (summary.value ? '' : '摘要、')
          + (image.value ? '' : '封面、')
          + (categories.value.length ? '' : '分类、')
          + (tags.value.length ? '' : '标签、')
  if (error !== '') {
    window.$message?.error(`${error.slice(0, error.length - 1)}不能为空`)
    disableSubmit.value = true
    return
  }
  const res = await uploadImage(image.value!)
  if (!res) {
    disableSubmit.value = true
    return
  }
  const params: SaveArticleParams = {
    title: title.value,
    content,
    summary: summary.value,
    coverImage: res.url,
    category: { name: categories.value[0] },
    tags: tags.value.map(name => ({ name })),
  }
  saveArticle(params)
  disableSubmit.value = true
}
</script>

<template>
  <div v-if="!app.isPhone" class="editor">
    <!-- 标题 -->
    <div relative max-w-850px w-850px m="xauto">
      <div pos="absolute top-136px" w-full z-97>
        <input
          v-model="title"
          type="text"
          w-full
          p="x9 t8 b5"
          text="3xl"
          font-bold
          placeholder="请输入标题"
          outline-none
          bg="white"
        >
        <div mx-9 border="b-1px gray-200" />
      </div>
    </div>
    <!-- 编辑器主题 -->
    <div ref="editorEl" />
    <!-- 发布设置 -->
    <div w-850px mx-auto bg="white">
      <div border="t-1px gray-200" mx-9 text="base gray-600">
        <div text-lg py-4>
          发布设置
        </div>
        <div w="children:70%" p="x2 children:b4">
          <div flex>
            <span whitespace-nowrap mr-6>摘要</span>
            <NInput
              v-model:value="summary"
              type="textarea"
              placeholder="请输入摘要"
            />
          </div>
          <div flex>
            <span whitespace-nowrap mr-6>封面</span>
            <PictureUpload @change="onImageChange" />
          </div>
          <div flex>
            <span whitespace-nowrap mr-6>分类</span>
            <Tag
              v-model:value="categories"
              tip="分类"
              :options="categoryOptions"
              :max="1"
            />
          </div>
          <div flex>
            <span whitespace-nowrap mr-6>标签</span>
            <Tag
              v-model:value="tags"
              tip="标签"
              :options="tagOptions"
              :max="8"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 底部工具栏 -->
    <div h-18 />
    <div
      pos="fixed left-0 right-0 bottom-0"
      h-12
      flex
      justify-center
      items-center
      bg="white"
      border="t-1px gray-200"
      text="sm gray-500"
    >
      <div w-800px flex justify-between items-center>
        <div>
          <span
            inline-flex
            items-center
            cursor-pointer
            @click="scrollToBottom"
          >
            发布设置
            <span i-fa6-solid:angle-down inline-block ml-1 />
          </span>
          <span ml-4>正文字数: {{ wordCount }} 字</span>
        </div>
        <NButton
          bg="$primary-color"
          :color="theme.common.primaryColor"
          :disabled="disableSubmit"
          @click="handleSubmit"
        >
          发布
        </NButton>
      </div>
    </div>
  </div>
  <div v-else mt-50 text-center>
    不支持手机访问
  </div>
</template>

<style>
@import 'vditor/dist/index.css';

.editor {
  background-color: #f6f6f6;
}

.vditor {
  border: none;
  margin-left: auto;
  margin-right: auto;
}

.vditor-toolbar {
  position: sticky;
  top: v-bind('top');
  height: 3.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #fcfcfc;
  padding: 0 !important;
  transition: all .3s;
  box-shadow: v-bind('shadow');
  z-index: 101;
}

.vditor-toolbar__item > button {
  width: 1.125rem;
  height: 1.125rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0 !important;
}

.vditor-toolbar__item > button > svg {
  width: 1.125rem;
  height: 1.125rem;
}

.vditor-content {
  margin-top: 168px;
  margin-left: auto;
  margin-right: auto;
  width: 850px;
}

.vditor-reset {
  padding: 1.5rem 2.25rem !important;
  background-color: white !important;
}
</style>

<route lang="yaml">
meta:
  layout: editor
</route>
