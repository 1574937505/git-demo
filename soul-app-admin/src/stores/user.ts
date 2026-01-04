import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, logout as logoutApi, getUserInfo } from '@/api/auth'
import type { LoginRequest, UserInfo } from '@/types/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态
    const token = ref<string>('')
    const refreshToken = ref<string>('')
    const userInfo = ref<UserInfo | null>(null)

    // 计算属性
    const isLoggedIn = computed(() => !!token.value)
    const roles = computed(() => userInfo.value?.roles || [])
    const permissions = computed(() => userInfo.value?.permissions || [])

    // 检查是否有某个角色
    const hasRole = (role: string): boolean => {
      return roles.value.includes(role)
    }

    // 检查是否有某个权限
    const hasPermission = (permission: string): boolean => {
      return permissions.value.includes(permission)
    }

    // 检查是否有某些权限中的任意一个
    const hasAnyPermission = (perms: string[]): boolean => {
      return perms.some((perm) => hasPermission(perm))
    }

    // 检查是否拥有所有指定权限
    const hasAllPermissions = (perms: string[]): boolean => {
      return perms.every((perm) => hasPermission(perm))
    }

    // 登录
    const login = async (loginData: LoginRequest): Promise<boolean> => {
      try {
        const res = await loginApi(loginData)
        if (res.code === 200) {
          token.value = res.data.token
          refreshToken.value = res.data.refreshToken
          userInfo.value = res.data.userInfo
          ElMessage.success('登录成功')
          return true
        }
        return false
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    }

    // 退出登录
    const logout = async (): Promise<void> => {
      try {
        await logoutApi()
      } catch (error) {
        console.error('Logout failed:', error)
      } finally {
        // 清除本地数据
        token.value = ''
        refreshToken.value = ''
        userInfo.value = null
      }
    }

    // 获取用户信息
    const fetchUserInfo = async (): Promise<boolean> => {
      try {
        const res = await getUserInfo()
        if (res.code === 200) {
          userInfo.value = res.data
          return true
        }
        return false
      } catch (error) {
        console.error('Fetch user info failed:', error)
        return false
      }
    }

    return {
      token,
      refreshToken,
      userInfo,
      isLoggedIn,
      roles,
      permissions,
      hasRole,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      login,
      logout,
      fetchUserInfo
    }
  },
  {
    persist: true // 持久化存储
  }
)
