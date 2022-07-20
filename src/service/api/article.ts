import { http } from '../http'
import type { Category } from './category'
import type { Tag } from './tag'

export interface Article {
  id: number
  category: Category
  tags: Tag[]
  title: string
  content: string
  createTime: Date
  updateTime: Date
}

export interface SaveArticleParam {
  title: string
  content: string
  category: Partial<Category>
  tags: Partial<Tag>[]
}

export type UpdateArticleParam = Record<'id', number> & SaveArticleParam

export const getArticles = () => {
  return http.get<Article[]>('/articles')
}

export const getArticlesByIds = (ids: number[]) => {
  return http.get<Article[]>(`/articles/${ids.join(',')}`)
}

export const getArticleByTitle = (title: string) => {
  return http.get<Article>('/articles', { params: { title } })
}

export const saveArticle = (param: SaveArticleParam) => {
  return http.post<Record<'id', number>>('/articles', param)
}

export const updateArticle = (param: UpdateArticleParam) => {
  return http.put<Record<'id', number>>('/articles', param)
}

export const deleteArticles = (ids: number[]) => {
  return http.delete<null>(`/articles/${ids.join(',')}`)
}
