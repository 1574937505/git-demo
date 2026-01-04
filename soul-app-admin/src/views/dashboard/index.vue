<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <!-- 统计卡片 -->
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#409eff">
              <User />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">1,234</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#67c23a">
              <ChatDotRound />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">8,765</div>
              <div class="stat-label">消息总数</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#e6a23c">
              <Document />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">432</div>
              <div class="stat-label">待审核内容</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#f56c6c">
              <Warning />
            </el-icon>
            <div class="stat-info">
              <div class="stat-value">23</div>
              <div class="stat-label">待处理举报</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 欢迎信息 -->
    <el-card class="welcome-card" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>欢迎使用</span>
        </div>
      </template>
      <div class="welcome-content">
        <h2>欢迎回来，{{ userStore.userInfo?.nickname }}！</h2>
        <p>这是灵魂交友管理后台系统，您可以通过左侧菜单进行各项管理操作。</p>
        <div class="role-info">
          <el-tag
            v-for="role in userStore.roles"
            :key="role"
            type="success"
            style="margin-right: 8px"
          >
            {{ roleNameMap[role] || role }}
          </el-tag>
        </div>
      </div>
    </el-card>

    <!-- 快捷操作 -->
    <el-card style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>快捷操作</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" @click="router.push('/system/user')" style="width: 100%">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="success" @click="router.push('/content/audit')" style="width: 100%">
            <el-icon><View /></el-icon>
            <span>内容审核</span>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="warning" @click="router.push('/content/report')" style="width: 100%">
            <el-icon><Warning /></el-icon>
            <span>举报管理</span>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="info" @click="router.push('/stats')" style="width: 100%">
            <el-icon><TrendCharts /></el-icon>
            <span>数据统计</span>
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 角色名称映射
const roleNameMap: Record<string, string> = {
  SUPER_ADMIN: '超级管理员',
  ADMIN: '管理员',
  OPERATOR: '运营人员',
  AUDITOR: '审核员',
  USER: '普通用户',
  VIP_USER: 'VIP用户'
}
</script>

<style scoped lang="scss">
.dashboard {
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;

      .stat-icon {
        font-size: 48px;
        margin-right: 20px;
      }

      .stat-info {
        flex: 1;

        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }

  .welcome-card {
    .welcome-content {
      h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
      }

      .role-info {
        margin-top: 20px;
      }
    }
  }

  .card-header {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
