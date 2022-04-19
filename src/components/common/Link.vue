<script setup lang="ts">
const links = [
  { icon: 'i-mdi:github', href: 'https://github.com/stitch007' },
  { icon: 'i-mdi:qqchat', href: 'https://image-1304160910.file.myqcloud.com/qq.png' },
]
</script>

<template>
  <a
    v-for="(link, index) in links"
    :key="index"
    :class="link.icon"
    :href="link.href"
    target="_blank"
    inline-block
  />
</template>
