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
  const response = await http.request<Auth| null>('/login', {
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

export const getCaptchaUrl = () => {
  return `${http.instance.defaults.baseURL}/captcha?t=${Date.now()}`
}
