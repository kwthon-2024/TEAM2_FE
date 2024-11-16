import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios'

import { clearSessionStorage } from '@/utils'

import { reIssue } from './auth/authApi'

export class HttpClient {
  private readonly client: AxiosInstance
  private accessToken: string | null = null

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config)

    this.onRequest = this.onRequest.bind(this)
    this.onResponse = this.onResponse.bind(this)
    this.onError = this.onError.bind(this)

    this.client.interceptors.request.use(this.onRequest, this.onError)
    this.client.interceptors.response.use(this.onResponse, this.onError)
  }

  setAccessToken(token: string) {
    this.accessToken = token
  }

  getAccessToken() {
    return this.accessToken
  }

  get<T>(...args: Parameters<typeof this.client.get>) {
    return this.client.get<T, T>(...args)
  }

  post<T>(...args: Parameters<typeof this.client.post>) {
    return this.client.post<T, T>(...args)
  }

  put<T>(...args: Parameters<typeof this.client.put>) {
    return this.client.put<T, T>(...args)
  }

  patch<T>(...args: Parameters<typeof this.client.patch>) {
    return this.client.patch<T, T>(...args)
  }

  delete<T>(...args: Parameters<typeof this.client.delete>) {
    return this.client.delete<T, T>(...args)
  }

  private onRequest(config: InternalAxiosRequestConfig) {
    if (this.accessToken) {
      config.headers.Authorization = this.accessToken
    }
    return config
  }

  private onResponse(response: AxiosResponse) {
    return response.data
  }

  private async onError(error: AxiosError) {
    const response = error.response as AxiosResponse
    const originalRequest = error.config as InternalAxiosRequestConfig

    if (isAxiosError(error)) {
      if (response?.status === 401 || response?.status === 403) {
        try {
          const reIssueResponse = (await reIssue()) as AxiosResponse
          const newAccessToken = reIssueResponse.headers['authorization']

          this.setAccessToken(newAccessToken)
          const response = this.client.request(originalRequest)

          return response
        } catch {
          clearSessionStorage()
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
}
