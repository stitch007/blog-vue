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
  const response = await http.request<Auth>('/login', {
    method: 'POST',
    data: { ...login },
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
