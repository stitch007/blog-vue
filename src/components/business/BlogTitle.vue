<script setup lang="ts">
const title: string = import.meta.env.VITE_APP_TITLE
const prefix = title.slice(0, -4).toUpperCase()
const suffix = title.slice(-4).toUpperCase()
</script>

<template>
  <div>
    <div flex items-center text-lg font-bold>
      <div pr-2 text="$primary-color dark:white">
        {{ prefix }}
      </div>
      <div w="2.5" h="2.5" mr="-1.5" bg="$primary-color" rotate-45 />
      <div flex items-center p="l2 r2" bg="$primary-color" text-white rounded>
        {{ suffix }}
      </div>
    </div>
  </div>
</template>
