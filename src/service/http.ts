import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

interface ResponseData<T> {
  code: number
  message: string
  data: T
}

class Http {
  instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.setInterceptors()
  }

  private setInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        console.log(error)
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const backend = response.data as ResponseData<unknown>
        if (backend.code !== 200) {
          return Promise.reject(response.data)
        }
        return Promise.resolve(backend.data)
      },
      (error) => {
        console.log(error)
        return Promise.reject(error.response)
      },
    )
  }

  setToken(token: string) {
    this.instance.defaults.headers.common.Authorization = token
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config).then(res => res as unknown as T)
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config).then(res => res as unknown as T)
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config).then(res => res as unknown as T)
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config).then(res => res as unknown as T)
  }
}

export const http = new Http({
  baseURL: 'http://114.132.223.202:9231',
})
