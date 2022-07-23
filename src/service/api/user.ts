import { http } from '../http'

export interface LoginParam {
  username: string
  password: string
  code: string
}

export interface User {
  id: number
  username: string
  avatarUrl: string
  token: string
  role: 'ADMIN' | 'USER'
}

export const login = async (login: LoginParam) => {
  return http.post<User>('/login', login)
}

export const giteeOauthLogin = async (code: string) => {
  return http.post<User>('/login/gitee', { code })
}

export const logout = () => {
  return http.get('/logout')
}

export const getUserInfo = () => {
  return http.get<User>('/user')
}

export const getCaptchaUrl = () => {
  return `${import.meta.env.VITE_BASE_URL}/captcha?t=${Date.now()}`
}
