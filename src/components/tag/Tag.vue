<script setup lang="ts">
import { useThemeStore } from '@/stores'

const theme = useThemeStore()

const props = defineProps<{
  value: string[]
  tip: string
  options: string[]
  max?: number
}>()

const emit = defineEmits<{ (e: 'update:value', value: string[]): void }>()
const value = computed({
  get: () => props.value,
  set: (value: string[]) => emit('update:value', value),
})

const input = ref('')
const options = computed(() => {
  return [input.value, ...props.options]
})
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
        :color="theme.common.primaryColor"
        bg="$primary-color"
        @click="activate()"
      >
        {{ `添加${tip}` }}
      </NButton>
    </template>
  </NDynamicTags>
</template>
