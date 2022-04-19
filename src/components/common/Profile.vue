<template>
  <div
    flex="~ col"
    items-center
    bg="white dark:$dark-bg-color"
    p="x6 y4"
    text="base dark-50 dark:white"
    rounded-xl
  >
    <div w-28 hover:rotate-360 duration-300>
      <img src="https://image-1304160910.file.myqcloud.com/avatar.jpg" alt="avatar" rounded-full>
    </div>
    <div font-600 text-2xl mt-2>
      Stitch
    </div>
    <div text-center mt-1>
      一名下饭区博主，在这里我将分享学习过程中的笔记、经验和想法，很幸运与你相遇
    </div>
    <div w="80%" mt-3>
      <LibraryCount />
    </div>
    <div
      m="t1 children:x1"
      text-xl
    >
      <Link />
    </div>
  </div>
</template>
