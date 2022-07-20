import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Article, Category, Tag } from '@/service'
import { getArticleByTitle, getArticles, getCategories, getTags, logout } from '@/service'

export const useLibraryStore = defineStore('library-store', () => {
  // 文章
  const articles = ref<Article[]>([])
  // 分类
  const categories = ref<Category[]>([])
  // 标签
  const tags = ref<Tag[]>([])

  // map { year => count }
  const archives = computed(() => {
    const res = new Map<number, number>()
    articles.value.forEach((article) => {
      const year = new Date(article.createTime).getFullYear()
      res.set(year, (res.get(year) ?? 0) + 1)
    })
    return res
  })

  // 相同分类的文章
  const sameCategoryArticles = computed(() => {
    return categories.value.map(category => ({
      category,
      articles: articles.value.filter(article => article.category.id === category.id),
    }))
  })

  // 相同标签的文章
  const sameTagArticles = computed(() => {
    return tags.value.map(tag => ({
      tag,
      articles: articles.value.filter(article => article.tags.some(item => item.id === tag.id)),
    }))
  })

  // 获取文章，分类和标签
  const fetchData = () => {
    return Promise.all([getArticles(), getCategories(), getTags()]).then((res) => {
      articles.value = res[0] ?? []
      categories.value = res[1] ?? []
      tags.value = res[2] ?? []
    })
  }

  // 根据标题获取文章
  const fetchArticleByTitle = async (title: string) => {
    const article = await getArticleByTitle(title)
    if (!article) {
      return
    }
    const index = articles.value.findIndex(item => item.id === article.id)
    if (index !== -1) {
      articles.value[index] = article
    } else {
      articles.value.push(article)
    }
  }

  return {
    articles,
    categories,
    tags,
    archives,
    sameCategoryArticles,
    sameTagArticles,
    fetchData,
    fetchArticleByTitle,
  }
})
