<script setup lang="ts">
import { computed, ref } from 'vue'
import { NAutoComplete, NButton, NDynamicTags } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useVModel } from '@vueuse/core'
import { useAppStore } from '@/stores'

interface Props {
  value: string[]
  tip: string
  options: string[]
  max?: number
}

const { theme } = storeToRefs(useAppStore())

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:value', value: string[]): void }>()
const value = useVModel(props, 'value', emit)

const input = ref('')
const options = computed(() => [input.value, ...props.options])
</script>

<template>
  <NDynamicTags v-model:value="value" :max="max">
    <template #input="{ submit, deactivate }">
      <NAutoComplete
        v-model:value="input"
        size="small"
        :options="options"
        :placeholder="tip"
        :clear-after-select="true"
        @select="submit($event)"
        @blur="deactivate"
      />
    </template>
    <template #trigger="{ activate, disabled }">
      <NButton
        size="small"
        :disabled="disabled"
        :color="theme.primaryColor"
        bg="$primary-color"
        text-color="white"
        @click="activate()"
      >
        {{ `添加${tip}` }}
      </NButton>
    </template>
  </NDynamicTags>
</template>
