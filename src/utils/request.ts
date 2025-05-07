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

export async function ssePost(url, data, onData, onError?) {
  const response = await fetch(`${apiPrefix}${url}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response?.body!.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  const read = () => {
    let hasError = false
    reader?.read().then((result: any) => {
      if (result.done) return

      buffer += decoder.decode(result.value, { stream: true })
      const lines = buffer.split('\n')

      let event = ''
      let data = ''

      try {
        lines.forEach((line) => {
          line = line.trim()
          if (line.startsWith('event:')) {
            event = line.slice(6).trim()
          } else if (line.startsWith('data:')) {
            data = line.slice(5).trim()
          }

          // 每个事件以空行结束，只有event和data同时存在，才表示一次流式事件的数据完整获取到了
          if (line === '') {
            if (event !== '' && data !== '') {
              onData({
                event: event,
                data: JSON.parse(data),
              })
              event = ''
              data = ''
            }
          }
        })
        buffer = lines.pop() || ''
      } catch (e) {
        hasError = true
      }

      if (!hasError) read()
    })
  }

  read()
}
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
