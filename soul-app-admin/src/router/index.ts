import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/components/layout/MainLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'DataAnalysis' }
      },
      {
        path: 'system',
        name: 'System',
        meta: { title: '系统管理', icon: 'Setting' },
        children: [
          {
            path: 'user',
            name: 'SystemUser',
            component: () => import('@/views/system/user/index.vue'),
            meta: {
              title: '用户管理',
              icon: 'User',
              permissions: ['system:user:list']
            }
          },
          {
            path: 'role',
            name: 'SystemRole',
            component: () => import('@/views/system/role/index.vue'),
            meta: {
              title: '角色管理',
              icon: 'UserFilled',
              permissions: ['system:role:list']
            }
          },
          {
            path: 'permission',
            name: 'SystemPermission',
            component: () => import('@/views/system/permission/index.vue'),
            meta: {
              title: '权限管理',
              icon: 'Lock',
              permissions: ['system:permission:list']
            }
          }
        ]
      },
      {
        path: 'content',
        name: 'Content',
        meta: { title: '内容管理', icon: 'Document' },
        children: [
          {
            path: 'audit',
            name: 'ContentAudit',
            component: () => import('@/views/content/audit/index.vue'),
            meta: {
              title: '内容审核',
              icon: 'View',
              permissions: ['content:audit:list']
            }
          },
          {
            path: 'report',
            name: 'ContentReport',
            component: () => import('@/views/content/report/index.vue'),
            meta: {
              title: '举报管理',
              icon: 'Warning',
              permissions: ['content:report:list']
            }
          }
        ]
      },
      {
        path: 'operation',
        name: 'Operation',
        component: () => import('@/views/operation/index.vue'),
        meta: {
          title: '运营管理',
          icon: 'Operation',
          permissions: ['operation:activity', 'operation:push']
        }
      },
      {
        path: 'stats',
        name: 'Stats',
        component: () => import('@/views/stats/index.vue'),
        meta: {
          title: '数据统计',
          icon: 'TrendCharts',
          permissions: ['stats:view']
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 灵魂交友管理后台`
  }

  // 判断是否需要登录
  if (to.meta.requiresAuth !== false) {
    if (!userStore.isLoggedIn) {
      ElMessage.warning('请先登录')
      next('/login')
      return
    }

    // 权限校验
    if (to.meta.permissions && Array.isArray(to.meta.permissions)) {
      const hasPermission = userStore.hasAnyPermission(to.meta.permissions as string[])
      if (!hasPermission) {
        ElMessage.error('权限不足')
        next(from.path || '/')
        return
      }
    }
  } else {
    // 已登录用户访问登录页，重定向到首页
    if (to.path === '/login' && userStore.isLoggedIn) {
      next('/')
      return
    }
  }

  next()
})

export default router

