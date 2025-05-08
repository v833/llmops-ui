import { apiPrefix, httpCode } from '@/config'
import { Message } from '@arco-design/web-vue'
import axios, { type AxiosResponse } from 'axios'
import { useCredentialStore } from '@/stores/credential'
import { useRouter } from 'vue-router'

const router = useRouter()

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

export const upload = <T>(url: string, options: any = {}): Promise<T> => {
  // 1 组装请求URL
  const urlWithPrefix = `${apiPrefix}${url.startsWith('/') ? url : `/${url}`}`

  // 2.组装xhr请求配置信息
  const defaultOptions = {
    method: 'POST',
    url: urlWithPrefix,
    headers: {},
    data: {},
  }
  options = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  }
  const { credential, clear: clearCredential } = useCredentialStore()
  const access_token = credential.access_token

  if (access_token) options.headers['Authorization'] = `Bearer ${access_token}`

  // 3.构建promise并使用xhr完成文件上传
  return new Promise((resolve, reject) => {
    // 4.创建xhr服务
    const xhr = new XMLHttpRequest()

    // 5.初始化xhr请求并配置headers
    xhr.open(options.method, options.url)
    for (const key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key])
    }

    // 6.设置xhr响应格式并携带授权凭证（例如cookie）
    xhr.withCredentials = true
    xhr.responseType = 'json'

    // 7.监听xhr状态变化并导出数据
    xhr.onreadystatechange = async () => {
      // 8.判断xhr的状态是不是为4，如果为4则代表已经传输完成（涵盖成功与失败）
      if (xhr.readyState === 4) {
        // 9.检查响应状态码，当HTTP状态码为200的时候表示请求成功
        if (xhr.status === 200) {
          // 10.判断业务状态码是否正常
          const response = xhr.response
          if (response.code === httpCode.success) {
            resolve(response)
          } else if (response.code === httpCode.unauthorized) {
            clearCredential()
            await router.replace({ path: '/auth/login' })
          } else {
            reject(xhr.response)
          }
        } else {
          reject(xhr)
        }
      }
    }

    // 10.添加xhr进度监听
    xhr.upload.onprogress = options.onprogress

    // 11.发送请求
    xhr.send(options.data)
  })
}
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等
    const { credential, clear: clearCredential } = useCredentialStore()
    const access_token = credential.access_token
    if (access_token) config.headers['Authorization'] = `Bearer ${access_token}`
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
