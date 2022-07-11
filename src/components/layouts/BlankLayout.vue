<template>
  <div flex>
    <div w-0 grow shrink lg:w175 lg:grow-0>
      <slot />
    </div>
    <div hidden w70 md:block shrink-0 md:grow-0 />
  </div>
</template>
