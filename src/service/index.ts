export * from './api/article'
export * from './api/category'
export * from './api/tag'
export * from './api/talk'
export * from './api/upload'
export * from './api/user'

export interface WebSocketMessage<T = any> {
  type: number
  data: T
}

export interface CharRecord {
  id: number
  userId: number
  username: string
  avatarUrl: string
  content: string
  createTime: Date
}

export interface RecallMessage {
  id: number
  token?: string
}
