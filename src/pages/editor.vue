<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const content = ref('1212122222')
const editorEl = ref<HTMLElement>()
let editorInstance: Vditor

onMounted(() => {
  nextTick(() => {
    if (editorEl.value) {
      editorInstance = new Vditor(editorEl.value, {
        height: 1800,
        mode: 'wysiwyg',
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        after: () => {
          editorInstance.setValue(content.value)
        },
      })
    }
  })
})

onBeforeUnmount(() => {
  editorInstance.destroy()
})
</script>

<template>
  <div pt-20>
    <div ref="editorEl" />
  </div>
</template>

<style>
.vditor-toolbar {
  position: sticky;
  top: 100px;
  background-color: white;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
