<script setup lang="ts">
defineProps<{ value: number }>()
</script>

<template>
  <div relative>
    <div
      pos="absolute top-0 right-0"
      transform="translate-x-[120%] translate-y-[-20%]"
      text="xs gray-400 dark:gray-500"
    >
      {{ value }}
    </div>
    <slot />
  </div>
</template>
