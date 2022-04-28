import { http } from '../http'
import { useAppStore } from '@/stores'

export interface Auth {
  token: string
  role: 'ADMIN' | 'USER'
}

export const login = async (username: string, password: string) => {
  const response = await http.request<Auth>('/login', {
    method: 'POST',
    data: { username, password },
  })
  if (response.code === 200) {
    const app = useAppStore()
    app.user.username = username
    app.user.token = response.data.token
    app.user.role = response.data.role
    app.showLoginPage = false
    http.setToken(response.data.token)
    window.$message?.success('登录成功')
  } else {
    window.$message?.error(response.message)
  }
}

export const logout = () => {
  return http.get('/logout')
}
