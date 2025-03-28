import { apiPrefix } from '@/config'
import axios, { type AxiosRequestConfig } from 'axios'

export const request = axios.create({
  baseURL: apiPrefix,
  timeout: 10000, // 添加超时设置
  headers: {
    // 添加默认请求头
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 统一错误处理
    return Promise.reject(error)
  },
)
