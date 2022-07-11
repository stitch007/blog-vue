<script setup lang="ts">
interface Props {
  bordered?: boolean
}
const { bordered } = withDefaults(defineProps<Props>(), { bordered: false })
</script>

<template>
  <div
    :class="{'border border-gray-200 dark:border-transparent': bordered}"
    p4 bg="white dark:$dark-bg-color" text="base dark-50 dark:gray-200" rounded-xl
  >
    <slot name="default" />
  </div>
</template>
