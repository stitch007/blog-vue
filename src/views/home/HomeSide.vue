<script setup lang="ts">

</script>

<template>
  <div mx="children:2">
    <div bg="dark:$dark-bg-color" border="~ gray-200 dark:transparent rounded-md">
      <div m="x8 t4">
        <LibraryCount />
      </div>
      <div flex justify-center w-full>
        <div m="t1 children:x2" text-lg>
          <Link />
        </div>
      </div>
    </div>
    <div mt4 border="~ gray-200 dark:transparent rounded-md">
      <Archives />
    </div>
  </div>
</template>
