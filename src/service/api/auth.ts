import { http } from '../http'

export interface Auth {
  token: string
  role: 'ADMIN' | 'USER'
}

export const login = async (username: string, password: string) => {
  const response = await http.request<Auth>('/login', {
    method: 'POST',
    data: { username, password },
  })
  if (response.code !== 200) {
    window.$message?.error(response.message)
    return null
  }
  return response.data as Auth
}

export const logout = () => {
  return http.get('/logout')
}
