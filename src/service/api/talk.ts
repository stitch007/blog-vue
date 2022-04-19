import { http } from '../http'

export interface Talk {
  id: number
  content: string
  device: string
  createTime: Date
}

export const getTalks = () => {
  return http.get<Talk[]>('/talks')
}

export const getTalksByIds = (ids: number[]) => {
  return http.get<Talk[]>(`/talks/${ids.join(',')}`)
}

export interface TalkPost {
  content: string
  device: string
  createTime?: Date
}

type TalkPut = Record<'id', number> & Partial<TalkPost>

export const saveTalk = (talk: TalkPost) => {
  return http.post<Record<'id', number>>('/talks', talk)
}

export const updateTalk = (talk: TalkPut) => {
  return http.post<Record<'id', number>>('/talks', talk)
}

export const deleteTalks = (ids: number[]) => {
  return http.delete(`/talks/${ids.join(',')}`)
}
