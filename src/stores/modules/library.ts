import { defineStore } from 'pinia'
import type { Article, Category, Tag, Talk } from '@/service'
import { getArticleByTitle, getArticles, getCategories, getTags, getTalks } from '@/service'

export const useLibraryStore = defineStore('library-store', () => {
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const tags = ref<Tag[]>([])
  const talks = ref<Talk[]>([])

  const archives = computed(() => {
    const res = new Map<number, number>()
    articles.value.forEach((article) => {
      const year = new Date(article.createTime).getFullYear()
      res.set(year, (res.get(year) ?? 0) + 1)
    })
    return res
  })

  const sameCategoryArticles = computed(() => {
    return categories.value.map((category) => {
      return {
        category,
        articles: articles.value.filter((article) => {
          return article.category.id === category.id
        }),
      }
    })
  })

  const sameTagArticles = computed(() => {
    return tags.value.map((tag) => {
      return {
        tag,
        articles: articles.value.filter((article) => {
          return article.tags.some(item => item.id === tag.id)
        }),
      }
    })
  })

  const fetchData = async () => {
    articles.value = await getArticles() || []
    categories.value = await getCategories() || []
    tags.value = await getTags() || []
    talks.value = await getTalks() || []
  }

  const fetchCategoriesAndTags = async () => {
    categories.value = await getCategories() || []
    tags.value = await getTags() || []
  }

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
    talks,
    archives,
    sameCategoryArticles,
    sameTagArticles,
    fetchData,
    fetchCategoriesAndTags,
    fetchArticleByTitle,
  }
})
