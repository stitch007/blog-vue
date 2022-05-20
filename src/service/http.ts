import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import axiosRetry from 'axios-retry'

export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

class Http {
  instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config)
    axiosRetry(this.instance, { retries: 3 })
    const user = localStorage.getItem('user')
    if (user) {
      this.setToken(JSON.parse(user).token ?? '')
    }
  }

  setToken(token: string) {
    this.instance.defaults.headers.common.Authorization = token
  }

  async request<T = any>(url: string, config?: AxiosRequestConfig) {
    let response: AxiosResponse<any, any>
    try {
      response = await this.instance.request({ url, ...config })
    } catch (error) {
      console.error('网络请求错误', error)
      window.$message?.error('好像没连上网网~')
      return null
    }
    return response.data as ResponseData<T>
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'GET', ...config })
    if (response !== null) {
      if (response.code !== 200) {
        window.$message?.error(response.message)
        return null
      }
      return response.data
    }
    return null
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'POST', data, ...config })
    if (response !== null) {
      if (response.code !== 200) {
        window.$message?.error(response.message)
        return null
      }
      return response.data
    }
    return null
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'PUT', data, ...config })
    if (response !== null) {
      if (response.code !== 200) {
        window.$message?.error(response.message)
        return null
      }
      return response.data
    }
    return null
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'DELETE', ...config })
    if (response !== null) {
      if (response.code !== 200) {
        window.$message?.error(response.message)
        return null
      }
      return response.data
    }
    return null
  }
}

export const http = new Http({
  baseURL: 'http://114.132.223.202:9231',
})
