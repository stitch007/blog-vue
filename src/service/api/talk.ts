import { http } from '../http'

export interface Talk {
  id: number
  content: string
  device: string
  createTime: Date
}

export interface SaveTalkParam {
  content: string
  device: string
}

type UpdateTalkParams = Record<'id', number> & Partial<SaveTalkParam>

export const getTalks = () => {
  return http.get<Talk[]>('/talks')
}

export const getTalksByIds = (ids: number[]) => {
  return http.get<Talk[]>(`/talks/${ids.join(',')}`)
}

export const saveTalk = (param: SaveTalkParam) => {
  return http.post<Record<'id', number>>('/talks', param)
}

export const updateTalk = (param: UpdateTalkParams) => {
  return http.post<Record<'id', number>>('/talks', param)
}

export const deleteTalks = (ids: number[]) => {
  return http.delete(`/talks/${ids.join(',')}`)
}
