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

export const saveCategory = (param: Omit<Category, 'id'>) => {
  return http.post<Record<'id', number>>('/categories', param)
}

export const updateCategory = (param: Category) => {
  return http.post<Record<'id', number>>('/categories', param)
}

export const deleteCategories = (ids: number[]) => {
  return http.delete(`/categories/${ids.join(',')}`)
}
