import request from '@/utils/request'
import type { LoginRequest, LoginResponse, UserInfo } from '@/types/user'
import type { Result } from '@/types/api'

// 用户登录
export function login(data: LoginRequest): Promise<Result<LoginResponse>> {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

// 退出登录
export function logout(): Promise<Result<void>> {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}

// 获取当前用户信息
export function getUserInfo(): Promise<Result<UserInfo>> {
  return request({
    url: '/auth/info',
    method: 'GET'
  })
}

// 刷新Token
export function refreshToken(refreshToken: string): Promise<Result<LoginResponse>> {
  return request({
    url: '/auth/refresh',
    method: 'POST',
    data: { refreshToken }
  })
}
