import { apiPrefix, httpCode } from '@/config'
import { Message } from '@arco-design/web-vue'
import axios, { type AxiosResponse } from 'axios'

export const request = axios.create({
  baseURL: apiPrefix,
  timeout: 100000, // 添加超时设置
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
  (response: AxiosResponse) => {
    const data = response.data

    if (data.code === httpCode.success) {
      return data
    }

    return Promise.reject(data)
  },
  (error) => {
    // 统一错误处理
    Message.error(error.message)
    return Promise.reject(error)
  },
)
