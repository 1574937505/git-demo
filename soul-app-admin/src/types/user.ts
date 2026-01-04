// 用户相关类型定义

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  userInfo: UserInfo
}

export interface UserInfo {
  userId: number
  username: string
  nickname: string
  phone?: string
  email?: string
  avatar?: string
  status: number
  roles: string[]
  permissions: string[]
}

export interface SysUser {
  id?: number
  username: string
  password?: string
  nickname: string
  phone?: string
  email?: string
  avatar?: string
  status: number
  createTime?: string
  updateTime?: string
}

export interface SysRole {
  id?: number
  roleCode: string
  roleName: string
  description?: string
  status: number
  createTime?: string
  updateTime?: string
}

export interface SysPermission {
  id?: number
  permissionCode: string
  permissionName: string
  type: number
  parentId?: number
  path?: string
  apiUrl?: string
  method?: string
  icon?: string
  sort: number
  status: number
  children?: SysPermission[]
}
