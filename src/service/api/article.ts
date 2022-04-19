import { http } from '../http'
import type { Category } from './category'
import type { Tag } from './tag'

export interface Article {
  id: number
  category: Category
  tags: Tag[]
  title: string
  content: string
  summary: string
  coverImage: string
  type: number
  createTime: Date
  updateTime: Date
}

export const getArticles = () => {
  return http.get<Article[]>('/articles')
}

export const getArticlesByIds = (ids: number[]) => {
  return http.get<Article[]>(`/articles/${ids.join(',')}`)
}

export const getArticleByTitle = (title: string) => {
  return http.get<Article>('/articles', { params: { title } })
}

export interface ArticlePost {
  title: string
  content: string
  summary: string
  coverImage: string
  type: number
  category: Record<'name', number>
  tags: Record<'name', number>[]
  createTime?: Date
  updateTime?: Date
}

export type ArticlePut = Record<'id', number> & Partial<ArticlePost>

export const saveArticle = (article: ArticlePost) => {
  return http.post<Record<'id', number>>('/articles', article)
}

export const updateArticle = (article: ArticlePut) => {
  return http.put<Record<'id', number>>('/articles', article)
}

export const deleteArticles = (ids: number[]) => {
  return http.delete(`/articles/${ids.join(',')}`)
}
