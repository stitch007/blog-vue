<script setup lang="ts">
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-fa6-solid:person-falling-burst inline-block />
    </div>
    <router-view />
    <div>
      <button text-sm m="3 t8" @click="$router.back()">
        back
      </button>
    </div>
  </main>
</template>
