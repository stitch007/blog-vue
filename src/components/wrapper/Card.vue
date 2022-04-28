<template>
  <div
    p4
    bg="white dark:$dark-bg-color"
    text="base dark-50 dark:gray-200"
    rounded-xl
  >
    <div
      flex
      justify-between
      items-center
      text="gray-600 dark:gray-200"
    >
      <slot name="head-left" />
      <slot name="head-right" />
    </div>
    <slot name="default" />
  </div>
</template>
