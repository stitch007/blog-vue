import { http } from '../http'

export interface Auth {
  token: string
  role: 'ADMIN' | 'USER'
}

export const login = (username: string, password: string) => {
  return http.post<Auth>('/login', { username, password })
}

export const logout = () => {
  return http.get('/logout')
}
