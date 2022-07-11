<script setup lang="ts">
import LibraryCount from '../articles/LibraryCount.vue'
import Link from '../common/Link.vue'
import Archives from '../articles/Archives.vue'
import Card from '../common/Card.vue'
</script>

<template>
  <div>
    <Card bordered p="x8 t6" flex flex-col>
      <LibraryCount />
      <Link flex justify-center pt2 />
    </Card>
    <Archives mt4 />
  </div>
</template>
