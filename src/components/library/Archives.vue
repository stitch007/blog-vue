<script setup lang="ts">
const tags = [
  { tag: { name: 'Chrome', id: 1 }, articles: [''] },
  { tag: { name: 'HTML', id: 2 }, articles: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '教程', id: 3 }, articles: ['', '', '', '', '', '', ''] },
  { tag: { name: '二叉树', id: 4 }, articles: ['', ''] },
  { tag: { name: '哈希表', id: 5 }, articles: ['', '', '', '', '', '', ''] },
  { tag: { name: '前端', id: 6 }, articles: ['', '', '', '', '', '', '', '', ''] },
  { tag: { name: '计算机图形学', id: 7 }, articles: ['', '', ''] },
  { tag: { name: '编译原理', id: 8 }, articles: ['', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '类型体操', id: 9 }, articles: ['', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '嵌入式', id: 10 }, articles: ['', '', '', '', '', ''] },
]

const articles = [
  { createTime: new Date() },
  { createTime: new Date() },
  { createTime: new Date() },
  { createTime: new Date() },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1610786249000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1579163849000) },
  { createTime: new Date(1547627849000) },
]

const archives = computed(() => {
  const res = new Map<number, number>()
  articles.forEach((article) => {
    const year = article.createTime.getFullYear()
    res.set(year, (res.get(year) ?? 0) + 1)
  })
  return res
})
</script>

<template>
  <Card py-5>
    <!-- 所有标签 -->
    <div>
      <Shrink
        v-for="tag in tags"
        :key="tag.tag.id"
        p="x3 y1"
        cursor-pointer
        @click="$router.push(`/tag/${tag.tag.name}`)"
      >
        <Badge :value="tag.articles.length">
          {{ tag.tag.name }}
        </Badge>
      </Shrink>
    </div>
    <!-- 分割线 -->
    <div p="x2 y5">
      <hr border="~ dashed $primary-color" opacity-20>
    </div>
    <!-- 归档 -->
    <div grid="~ cols-2 gap-2.5" px-2 cursor-pointer>
      <div
        v-for="[year, count] in archives"
        :key="year"
        class="group"
        p="x3 y1"
        border="~ gray-200 dark:gray-700"
        bg="hover:$primary-color"
        rounded-lg
        duration-300
        @click="$router.push({ path: 'articles', hash: `#${year}` })"
      >
        <div text="sm gray-800 dark:gray-50 group-hover:gray-50" opacity-60>
          {{ year }}
        </div>
        <div
          text="group-hover:white"
          font-bold
          transform="group-hover:translate-x-2"
          duration-300
        >
          <span text-lg>{{ count }}</span>
          <span text-sm>
            篇
          </span>
        </div>
      </div>
    </div>
  </Card>
</template>
