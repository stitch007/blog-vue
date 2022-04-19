import { http } from '../http'

export interface Category {
  id: number
  name: string
}

export const getCategories = () => {
  return http.get<Category[]>('/categories')
}

export const getCategoriesByIds = (ids: number[]) => {
  return http.get<Category[]>(`/categories/${ids.join(',')}`)
}

export const saveCategory = (category: Omit<Category, 'id'>) => {
  return http.post<Record<'id', number>>('/categories', category)
}

export const updateCategory = (category: Category) => {
  return http.post<Record<'id', number>>('/categories', category)
}

export const deleteCategories = (ids: number[]) => {
  return http.delete(`/categories/${ids.join(',')}`)
}
