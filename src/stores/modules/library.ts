import { defineStore } from 'pinia'
import type { Article, Category, Tag, Talk } from '@/service'
import { getArticleByTitle, getArticles, getCategories, getTags, getTalks } from '@/service'

export interface LibraryState {
  articles: Article[]
  categories: Category[]
  tags: Tag[]
  talks: Talk[]
}

// export const useLibraryStore = defineStore('library-store', {
//   state: (): LibraryState => ({
//     articles: [],
//     categories: [],
//     tags: [],
//     talks: [],
//   }),
//   getters: {

//   },
//   actions: {
//     async fetchData() {
//       try {
//         this.articles = await getArticles()
//         this.categories = await getCategories()
//         this.tags = await getTags()
//         this.talks = await getTalks()
//       } catch (_error) {}
//     },
//     async fetchArticleByTitle(title: string) {
//       try {
//         const article = await getArticleByTitle(title)
//         const index = this.articles.findIndex(item => item.id === article.id)
//         if (index !== -1) {
//           this.articles[index] = article
//         } else {
//           this.articles.push(article)
//         }
//       } catch (_error) {}
//     },
//     getArticleByCategoryId(id: number) {
//       return this.articles.filter((article) => {
//         return article.category.id === id
//       })
//     },
//     getArticleByTagId(id: number) {
//       return this.articles.filter((article) => {
//         return article.tags.some((tag) => {
//           return tag.id === id
//         })
//       })
//     },
//   },
// })
export const useLibraryStore = defineStore('library-store', () => {
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const tags = ref<Tag[]>([])
  const talks = ref<Talk[]>([])

  const archives = computed(() => {
    const res = new Map<number, number>()
    articles.value.forEach((article) => {
      const year = article.createTime.getFullYear()
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
    try {
      articles.value = await getArticles()
      categories.value = await getCategories()
      tags.value = await getTags()
      talks.value = await getTalks()
    } catch (_error) {}
  }

  const fetchArticleByTitle = async (title: string) => {
    try {
      const article = await getArticleByTitle(title)
      const index = articles.value.findIndex(item => item.id === article.id)
      if (index !== -1) {
        articles.value[index] = article
      } else {
        articles.value.push(article)
      }
    } catch (_error) {}
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
    fetchArticleByTitle,
  }
})
