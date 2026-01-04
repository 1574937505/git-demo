import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { ResultCode } from '@/types/api'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 如果存在token，添加到请求头
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data

    // 如果返回的状态码不是200，则统一处理错误
    if (res.code !== ResultCode.SUCCESS) {
      ElMessage.error(res.message || '请求失败')

      // Token失效或未登录
      if (
        res.code === ResultCode.UNAUTHORIZED ||
        res.code === ResultCode.TOKEN_INVALID ||
        res.code === ResultCode.TOKEN_EXPIRED
      ) {
        const userStore = useUserStore()
        userStore.logout()
        router.push('/login')
      }

      // 权限不足
      if (res.code === ResultCode.ACCESS_DENIED) {
        ElMessage.error('权限不足，无法访问')
      }

      return Promise.reject(new Error(res.message || 'Error'))
    }

    return res
  },
  (error) => {
    console.error('Response error:', error)

    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElMessage.error('未登录或登录已过期')
          const userStore = useUserStore()
          userStore.logout()
          router.push('/login')
          break
        case 403:
          ElMessage.error('权限不足')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器错误')
          break
        default:
          ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else if (error.message.includes('timeout')) {
      ElMessage.error('请求超时')
    } else if (error.message.includes('Network Error')) {
      ElMessage.error('网络错误')
    } else {
      ElMessage.error('未知错误')
    }

    return Promise.reject(error)
  }
)

export default service
