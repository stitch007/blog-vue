<script setup lang="ts">
import randomColor from 'randomcolor'
// import { useLibraryStore } from '@/stores'

// const lib = useLibraryStore()

const tags = [
  { tag: { name: 'Chrome', id: 1 }, articles: [''] },
  { tag: { name: '教程', id: 3 }, articles: ['', '', '', '', '', '', ''] },
  { tag: { name: '二叉树', id: 4 }, articles: ['', ''] },
  { tag: { name: '哈希表', id: 5 }, articles: ['', '', '', '', '', '', ''] },
  { tag: { name: '前端', id: 6 }, articles: ['', '', '', '', '', '', '', '', ''] },
  { tag: { name: '计算机图形学', id: 7 }, articles: ['', '', ''] },
  { tag: { name: '机器学习', id: 18 }, articles: [''] },
  { tag: { name: '编译原理', id: 8 }, articles: ['', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: 'Python', id: 10 }, articles: ['', '', '', '', '', ''] },
  { tag: { name: 'Mybatis', id: 20 }, articles: [''] },
  { tag: { name: '爬虫', id: 11 }, articles: ['', '', '', '', '', ''] },
  { tag: { name: '大数据', id: 12 }, articles: ['', '', '', '', '', '', '', '', ''] },
  { tag: { name: '数据结构', id: 14 }, articles: ['', '', '', '', '', '', '', '', ''] },
  { tag: { name: 'CSS', id: 15 }, articles: ['', '', '', '', '', '', '', '', ''] },
  { tag: { name: 'Spring', id: 16 }, articles: ['', '', '', '', '', ''] },
  { tag: { name: 'Java', id: 17 }, articles: [''] },
  { tag: { name: '正则表达式', id: 19 }, articles: [''] },
  { tag: { name: 'C++', id: 21 }, articles: [''] },
  { tag: { name: '数据库', id: 22 }, articles: [''] },
  { tag: { name: 'MySql', id: 23 }, articles: [''] },
  { tag: { name: 'IDEA', id: 24 }, articles: [''] },
  { tag: { name: 'WebStorm', id: 25 }, articles: [''] },
  { tag: { name: '类型体操', id: 9 }, articles: ['', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '后端', id: 26 }, articles: [''] },
  { tag: { name: 'iPhone', id: 27 }, articles: [''] },
  { tag: { name: 'HTML', id: 2 }, articles: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '工作', id: 28 }, articles: [''] },
  { tag: { name: 'Vue', id: 13 }, articles: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] },
  { tag: { name: '学习', id: 29 }, articles: [''] },
]

const styles = (num: number) => {
  return {
    color: randomColor(),
    fontSize: `${1.25 + num * 0.04}rem`,
  }
}
</script>

<template>
  <main max-w-1200px m="xauto t-20" p="x2 md:x8">
    <Card p="x2 y6 md:x18" text-center>
      <div w-full text-2xl pb-4>
        {{ '标签 - ' + tags.length }}
      </div>
      <div>
        <RouterLink
          v-for="tag in tags"
          :key="tag.tag.id"
          :to="`/tags/${tag.tag.name}`"
          :style="styles(tag.articles.length)"
          hover="!bg-$primary-color !text-gray-100 scale-108"
          inline-block
          m="x2 y2"
          p="x2 md:x4"
          bg="zinc-100 dark:zinc-900"
          leading-loose
          rounded-xl
          duration-300
        >
          <span>{{ tag.tag.name }}</span>
          <sup>{{ tag.articles.length }}</sup>
        </RouterLink>
      </div>
    </Card>
  </main>
</template>
