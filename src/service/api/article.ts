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
  createTime: Date
  updateTime: Date
}

export interface SaveArticleParams {
  title: string
  content: string
  summary: string
  coverImage: string
  category: Record<'name', string>
  tags: Record<'name', string>[]
  createTime?: Date
  updateTime?: Date
}

export type UpdateArticleParams = Record<'id', number> & Partial<SaveArticleParams>

export const getArticles = () => {
  return http.get<Article[]>('/articles')
}

export const getArticlesByIds = (ids: number[]) => {
  return http.get<Article[]>(`/articles/${ids.join(',')}`)
}

export const getArticleByTitle = (title: string) => {
  return http.get<Article>('/articles', { params: { title } })
}

export const saveArticle = (article: SaveArticleParams) => {
  return http.post<Record<'id', number>>('/articles', article)
}

export const updateArticle = (article: UpdateArticleParams) => {
  return http.put<Record<'id', number>>('/articles', article)
}

export const deleteArticles = (ids: number[]) => {
  return http.delete<null>(`/articles/${ids.join(',')}`)
}
