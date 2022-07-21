import { defineStore } from 'pinia'
import type { Article, Category, Tag } from '@/service'
import { getArticleByTitle, getArticles, getCategories, getTags } from '@/service'

export interface LibraryState {
  // 文章
  articles: Article[]
  // 分类
  categories: Category[]
  // 标签
  tags: Tag[]
}

export const useLibraryStore = defineStore('library-store', {
  state: (): LibraryState => ({
    articles: [],
    categories: [],
    tags: [],
  }),
  getters: {
    // map { year => 这一年有多少篇文章 }
    archives(state): Map<number, number> {
      return state.articles.reduce((map, article) => {
        const year = new Date(article.createTime).getFullYear()
        return map.set(year, (map.get(year) ?? 0) + 1)
      }, new Map<number, number>())
    },
    // 相同分类的文章
    sameCategoryArticles(state) {
      return state.categories.map(category => ({
        category,
        articles: state.articles.filter(article => article.category.id === category.id),
      }))
    },
    // 相同标签的文章
    sameTagArticles(state) {
      return state.tags.map(tag => ({
        tag,
        articles: state.articles.filter(article => article.tags.some(item => item.id === tag.id)),
      }))
    },
  },
  actions: {
    // 获取文章，分类和标签
    fetchData() {
      return Promise.all([getArticles(), getCategories(), getTags()]).then((res) => {
        this.articles = res[0] ?? []
        this.categories = res[1] ?? []
        this.tags = res[2] ?? []
      })
    },
    // 根据标题获取文章
    async fetchArticleByTitle(title: string) {
      const article = await getArticleByTitle(title)
      if (!article) {
        return
      }
      const index = this.articles.findIndex(item => item.id === article.id)
      if (index !== -1) {
        this.articles[index] = article
      } else {
        this.articles.push(article)
      }
    },
  },
})
