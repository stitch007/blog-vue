import { http } from '../http'

export interface Talk {
  id: number
  content: string
  device: string
  createTime: Date
}

export interface SaveTalkParams {
  content: string
  device: string
  createTime?: Date
}

type UpdateTalkParams = Record<'id', number> & Partial<SaveTalkParams>

export const getTalks = () => {
  return http.get<Talk[]>('/talks')
}

export const getTalksByIds = (ids: number[]) => {
  return http.get<Talk[]>(`/talks/${ids.join(',')}`)
}

export const saveTalk = (talk: SaveTalkParams) => {
  return http.post<Record<'id', number>>('/talks', talk)
}

export const updateTalk = (talk: UpdateTalkParams) => {
  return http.post<Record<'id', number>>('/talks', talk)
}

export const deleteTalks = (ids: number[]) => {
  return http.delete<null>(`/talks/${ids.join(',')}`)
}
