import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { router } from '@/router'
import { useAppStore } from '@/stores'

export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

class Http {
  instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.setInterceptor()
  }

  private setInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token !== null && config.headers) {
          config.headers.Authorization = (token)
        }
        return config
      },
      (error) => {
        console.error(error)
        window.$message?.error('发生未知错误')
        return Promise.reject(error)
      },
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { status, data } = response
        if (status === 200) {
          return data
        }
        window.$message?.error('发生未知错误')
        return Promise.reject(response.data)
      },
      (error) => {
        console.error(error)
        window.$message?.error('发生未知错误')
        return Promise.reject(error)
      },
    )
  }

  async request<T = any>(url: string, config?: AxiosRequestConfig) {
    try {
      const response: ResponseData<T> = await this.instance.request({ url, ...config })
      if (response.code === 20000) {
        return response.data
      } else if (response.code === 40100) {
        useAppStore().clearUser()
        router.push('/login')
        window.$message?.error('请先登录')
      } else {
        window.$message?.error(response.message)
      }
    } catch (error) {
      return null
    }
    return null
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>(url, { method: 'GET', ...config })
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return await this.request<T>(url, { method: 'POST', data, ...config })
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return await this.request<T>(url, { method: 'PUT', data, ...config })
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>(url, { method: 'DELETE', ...config })
  }
}

export const http = new Http({
  baseURL: import.meta.env.VITE_BASE_URL,
})
