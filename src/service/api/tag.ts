import { http } from '../http'

export interface Tag {
  id: number
  name: string
}

export const getTags = () => {
  return http.get<Tag[]>('/tags')
}

export const getTagsByIds = (ids: number[]) => {
  return http.get<Tag[]>(`/tags/${ids.join(',')}`)
}

export const saveTag = (tag: Omit<Tag, 'id'>) => {
  return http.post<Record<'id', number>>('/tags', tag)
}

export const updateTag = (tag: Tag) => {
  return http.post<Record<'id', number>>('/tags', tag)
}

export const deleteTags = (ids: number[]) => {
  return http.delete(`/tags/${ids.join(',')}`)
}
