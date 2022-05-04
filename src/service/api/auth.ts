import { http } from '../http'

export interface Login {
  username: string
  password: string
  code: string
}

export interface Auth {
  token: string
  role: 'ADMIN' | 'USER'
}

export const login = async (login: Login) => {
  return http.post<Auth>('/login', login)
}

export const logout = () => {
  return http.get('/logout')
}

export const getCaptchaUrl = () => {
  return `${http.instance.defaults.baseURL}/captcha?t=${Date.now()}`
}
