import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import axiosRetry from 'axios-retry'

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

class Http {
  instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config)
    axiosRetry(this.instance, { retries: 3 })
    const user = JSON.parse(localStorage.getItem('user') ?? '')
    this.setToken(user.token ?? '')
  }

  setToken(token: string) {
    this.instance.defaults.headers.common.Authorization = token
  }

  async request<T = any>(url: string, config?: AxiosRequestConfig) {
    const response = await this.instance.request({ url, ...config })
    return response.data as ResponseData<T>
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'GET', ...config })
    if (response.code !== 200) {
      window.$message?.error(response.message)
    }
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'POST', data, ...config })
    if (response.code !== 200) {
      window.$message?.error(response.message)
    } else {
      window.$message?.success('保存成功')
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'PUT', data, ...config })
    if (response.code !== 200) {
      window.$message?.error(response.message)
    } else {
      window.$message?.success('修改成功')
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.request<T>(url, { method: 'DELETE', ...config })
    if (response.code !== 200) {
      window.$message?.error(response.message)
    } else {
      window.$message?.success('删除成功')
    }
  }
}

export const http = new Http({
  baseURL: 'http://114.132.223.202:9231',
})
