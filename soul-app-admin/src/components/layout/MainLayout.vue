<template>
  <div class="main-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <div class="logo">
          <img src="/logo.svg" alt="logo" v-if="!isCollapse" />
          <h1 v-if="!isCollapse">灵魂交友</h1>
        </div>
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="true"
          router
          class="sidebar-menu"
        >
          <template v-for="route in menuRoutes" :key="route.path">
            <!-- 单个菜单项 -->
            <el-menu-item
              v-if="!route.children && hasPermission(route)"
              :index="route.path"
            >
              <el-icon v-if="route.meta?.icon">
                <component :is="route.meta.icon" />
              </el-icon>
              <template #title>{{ route.meta?.title }}</template>
            </el-menu-item>

            <!-- 子菜单 -->
            <el-sub-menu v-if="route.children" :index="route.path">
              <template #title>
                <el-icon v-if="route.meta?.icon">
                  <component :is="route.meta.icon" />
                </el-icon>
                <span>{{ route.meta?.title }}</span>
              </template>
              <el-menu-item
                v-for="child in route.children"
                :key="child.path"
                :index="`/${route.path}/${child.path}`"
                v-show="hasPermission(child)"
              >
                <el-icon v-if="child.meta?.icon">
                  <component :is="child.meta.icon" />
                </el-icon>
                <template #title>{{ child.meta?.title }}</template>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>

      <!-- 主内容区 -->
      <el-container>
        <!-- 顶部导航栏 -->
        <el-header class="header">
          <div class="header-left">
            <el-icon class="collapse-icon" @click="toggleCollapse">
              <Expand v-if="isCollapse" />
              <Fold v-else />
            </el-icon>
          </div>
          <div class="header-right">
            <el-dropdown @command="handleCommand">
              <div class="user-info">
                <el-avatar :src="userStore.userInfo?.avatar">
                  {{ userStore.userInfo?.nickname?.charAt(0) }}
                </el-avatar>
                <span class="username">{{ userStore.userInfo?.nickname }}</span>
                <el-icon><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主要内容 -->
        <el-main class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 侧边栏折叠状态
const isCollapse = ref(false)

// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 从路由中获取菜单项
const menuRoutes = computed(() => {
  const routes = router.getRoutes()
  const mainRoute = routes.find((r) => r.path === '/')
  return mainRoute?.children?.filter((r) => r.meta?.title) || []
})

// 权限检查
const hasPermission = (route: any) => {
  if (!route.meta?.permissions) return true
  return userStore.hasAnyPermission(route.meta.permissions as string[])
}

// 切换侧边栏
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 处理用户菜单命令
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确定要退出登录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await userStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    // TODO: 跳转到个人中心
  }
}
</script>

<style scoped lang="scss">
.main-layout {
  height: 100vh;
  overflow: hidden;
}

.el-container {
  height: 100%;
}

.sidebar {
  background-color: #001529;
  transition: width 0.3s;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;

    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }

  .sidebar-menu {
    border: none;
    background-color: #001529;

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: rgba(255, 255, 255, 0.65);

      &:hover {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.08);
      }
    }

    :deep(.el-menu-item.is-active) {
      color: #fff;
      background-color: #1890ff;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 20px;

  .header-left {
    .collapse-icon {
      font-size: 20px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .username {
        margin: 0 8px;
      }
    }
  }
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
