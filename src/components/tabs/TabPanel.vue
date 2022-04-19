<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
