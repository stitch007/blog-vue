<script setup lang="ts">
const showImage = ref(false)
const fileEl = ref<HTMLInputElement>()
const imageEl = ref<HTMLImageElement>()

const emit = defineEmits<{ (e: 'change', file: File): void }>()

const onFileChange = () => {
  if (fileEl.value) {
    const file = fileEl.value.files?.[0]
    if (file) {
      if (!/(jpg|png|jpeg)$/.test(file.type)) {
        window.$message?.error('只能上传jpg, png, jpeg格式的图片')
        return false
      }
      emit('change', file)
      const url = window.URL.createObjectURL(file)
      showImage.value = true
      nextTick(() => {
        if (imageEl.value) {
          imageEl.value.src = url
        }
      })
    }
  }
}
</script>

<template>
  <div
    :class="{'border-1px': !showImage}"
    relative
    w-25
    h-25
    border="dashed rounded gray-400 hover:$primary-color"
    overflow-hidden
  >
    <label for="file" w-full h-full>
      <input
        id="file"
        ref="fileEl"
        type="file"
        display-none
        @change="onFileChange"
      >
      <span
        v-if="!showImage"
        h-full
        w-full
        flex
        items-center
        justify-center
        text="2xl gray-600"
      >
        +
      </span>
      <img
        v-else
        ref="imageEl"
        src="#"
        alt=""
        w-full
        h-full
        object-cover
      >
    </label>
  </div>
</template>
