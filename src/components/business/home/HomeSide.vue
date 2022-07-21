<script setup lang="ts">
import { Card } from '@/components/common'
import { Archives, LibraryCount, Link } from '@/components/business'
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
