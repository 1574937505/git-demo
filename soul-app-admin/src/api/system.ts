import request from '@/utils/request'
import type { SysUser, SysRole, SysPermission } from '@/types/user'
import type { Result, PageResult, PageRequest } from '@/types/api'

// 用户管理
export function getUserList(params: PageRequest): Promise<Result<PageResult<SysUser>>> {
  return request({
    url: '/admin/system/user/list',
    method: 'GET',
    params
  })
}

export function addUser(data: SysUser): Promise<Result<void>> {
  return request({
    url: '/admin/system/user/add',
    method: 'POST',
    data
  })
}

export function updateUser(data: SysUser): Promise<Result<void>> {
  return request({
    url: '/admin/system/user/update',
    method: 'PUT',
    data
  })
}

export function deleteUser(id: number): Promise<Result<void>> {
  return request({
    url: `/admin/system/user/delete/${id}`,
    method: 'DELETE'
  })
}

export function banUser(id: number): Promise<Result<void>> {
  return request({
    url: `/admin/system/user/ban/${id}`,
    method: 'PUT'
  })
}

// 角色管理
export function getRoleList(params: PageRequest): Promise<Result<PageResult<SysRole>>> {
  return request({
    url: '/admin/system/role/list',
    method: 'GET',
    params
  })
}

export function addRole(data: SysRole): Promise<Result<void>> {
  return request({
    url: '/admin/system/role/add',
    method: 'POST',
    data
  })
}

export function updateRole(data: SysRole): Promise<Result<void>> {
  return request({
    url: '/admin/system/role/update',
    method: 'PUT',
    data
  })
}

export function deleteRole(id: number): Promise<Result<void>> {
  return request({
    url: `/admin/system/role/delete/${id}`,
    method: 'DELETE'
  })
}

// 权限管理
export function getPermissionTree(): Promise<Result<SysPermission[]>> {
  return request({
    url: '/admin/system/permission/tree',
    method: 'GET'
  })
}

export function getPermissionList(): Promise<Result<SysPermission[]>> {
  return request({
    url: '/admin/system/permission/list',
    method: 'GET'
  })
}
