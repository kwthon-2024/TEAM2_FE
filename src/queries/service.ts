import type { AxiosInstance } from 'axios'
import axios from 'axios'

const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

const config = {
  baseURL,
  withCredentials: true,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return instance
}

const createInstance = () => {
  const instance = axios.create(config)
  return setInterceptors(instance)
}

const createInstanceWithoutAuth = () => {
  const instance = axios.create(config)
  return instance
}

export const instance = createInstance()
export const instanceWithoutAuth = createInstanceWithoutAuth()
