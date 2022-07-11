<template>
  <div flex>
    <div w-0 grow shrink lg:w175 lg:grow-0 m="x2 md:l0">
      <slot name="left" />
    </div>
    <div hidden w70 md:block shrink-0 md:grow-0 mx2>
      <slot name="right" />
    </div>
  </div>
</template>
