import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

type AxiosRequestConfig = InternalAxiosRequestConfig<any> & {
  retry_count?: number
}

// https://api.imooc-web.lgdsunday.club/api
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  timeoutErrorMessage: '请求超时',
  withCredentials: true,
})
// 最大重试次数
const MAX_RETRY = 3
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.icode = 'hellosunday'
    config.retry_count = config.retry_count || 0
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const { data, code } = response.data
    if (code === 200) {
      return data
    }
  },
  async (error) => {
    const { config, response } = error
    const shouldRetry = config.retry_count < MAX_RETRY && response.data.code === 500
    if (shouldRetry) {
      config.retry_count++
      await Promise.resolve().then(() => {
        setTimeout(
          () => {
            return instance(config)
          },
          Math.pow(2, config.retry_count) * 1000,
        )
      })
    }
    return Promise.reject(error)
  },
)

export default {
  get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, { params, ...config })
  },
  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },
}
