<script setup lang="ts">
interface Props {
  bordered?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    :class="{'border border-gray-200 dark:border-transparent': bordered}"
    bg="white dark:$dark-bg-color"
    text="base dark-50 dark:gray-200"
    p4 rounded-xl
  >
    <slot name="default" />
  </div>
</template>
