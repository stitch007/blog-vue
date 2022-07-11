<script setup lang="ts">
</script>

<template>
  <div
    class="border-shrink" inline-block p="x2 y0.5"
    bg="md:hover:$primary-color" text="md:hover:white"
    rounded-xl duration-200
  >
    <slot />
  </div>
</template>

<style scoped>
.border-shrink:hover {
  animation: border-shrink .3s;
}

@keyframes border-shrink {
  0% {
    border-radius: 2px;
  }
  100% {
    border-radius: 12px;
  }
}
</style>
