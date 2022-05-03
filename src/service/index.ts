import { http } from './http'

export const setToken = (token: string) => {
  http.setToken(token)
}

export * from './api/article'
export * from './api/auth'
export * from './api/category'
export * from './api/tag'
export * from './api/talk'
export * from './api/upload'
