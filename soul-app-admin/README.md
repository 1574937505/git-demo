# Soul App Admin - 灵魂交友管理后台

面向18-30岁年轻人的深度社交平台管理后台系统。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **UI库**: Element Plus
- **路由**: Vue Router
- **状态管理**: Pinia (支持持久化)
- **HTTP客户端**: Axios
- **构建工具**: Vite
- **代码规范**: ESLint

## 功能模块

### 系统管理
- **用户管理**: 查看、新增、编辑、删除、禁用用户
- **角色管理**: 管理系统角色和权限分配
- **权限管理**: 查看和管理系统权限树

### 内容管理
- **内容审核**: 审核用户发布的内容
- **举报管理**: 处理用户举报信息

### 运营管理
- **活动管理**: 创建和管理平台活动
- **推送管理**: 管理消息推送

### 数据统计
- 查看平台各类数据统计
- 导出统计数据

## 项目结构

```
soul-app-admin/
├── src/
│   ├── api/                    # API接口
│   │   ├── auth.ts             # 认证接口
│   │   └── system.ts           # 系统管理接口
│   ├── assets/                 # 静态资源
│   ├── components/             # 公共组件
│   │   └── layout/             # 布局组件
│   │       └── MainLayout.vue  # 主布局
│   ├── router/                 # 路由配置
│   │   └── index.ts            # 路由定义和守卫
│   ├── stores/                 # 状态管理
│   │   └── user.ts             # 用户状态
│   ├── types/                  # 类型定义
│   │   ├── api.ts              # API类型
│   │   └── user.ts             # 用户类型
│   ├── utils/                  # 工具函数
│   │   └── request.ts          # Axios封装
│   ├── views/                  # 页面组件
│   │   ├── login/              # 登录页
│   │   ├── dashboard/          # 仪表盘
│   │   ├── system/             # 系统管理
│   │   │   ├── user/           # 用户管理
│   │   │   ├── role/           # 角色管理
│   │   │   └── permission/     # 权限管理
│   │   ├── content/            # 内容管理
│   │   │   ├── audit/          # 内容审核
│   │   │   └── report/         # 举报管理
│   │   ├── operation/          # 运营管理
│   │   ├── stats/              # 数据统计
│   │   └── error/              # 错误页面
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 入口文件
├── .env.development            # 开发环境配置
├── .env.production             # 生产环境配置
├── index.html                  # HTML模板
├── package.json                # 依赖配置
├── tsconfig.json               # TypeScript配置
└── vite.config.ts              # Vite配置
```

## 开发指南

### 安装依赖

```bash
cd soul-app-admin
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 权限系统

### 路由权限

在路由配置中通过 `meta.permissions` 定义权限要求：

```typescript
{
  path: 'user',
  name: 'SystemUser',
  component: () => import('@/views/system/user/index.vue'),
  meta: {
    title: '用户管理',
    permissions: ['system:user:list']
  }
}
```

### 组件权限

使用 `userStore.hasPermission()` 检查权限：

```vue
<el-button
  v-if="userStore.hasPermission('system:user:add')"
  @click="handleAdd"
>
  新增
</el-button>
```

## 默认账号

- 用户名: `admin`
- 密码: `admin123`

## API接口

后端API地址配置在 `.env.development` 和 `.env.production` 文件中：

- 开发环境: `http://localhost:8080/api`
- 生产环境: 需要配置实际的API地址

## 响应格式

所有API响应遵循统一格式：

```typescript
{
  code: number        // 响应码 (200成功)
  message: string     // 响应消息
  data: any          // 响应数据
  timestamp: number   // 时间戳
}
```

## 状态码

- `200`: 操作成功
- `1001`: 未登录或登录已过期
- `1002`: Token无效
- `1003`: Token已过期
- `1004`: 权限不足
- `2001`: 参数错误
- `3001`: 用户不存在
- `5000`: 系统错误

更多状态码请查看 `src/types/api.ts`。

## 待开发功能

以下页面已创建占位，待进一步开发：

- 角色管理页面 (src/views/system/role/index.vue)
- 权限管理页面 (src/views/system/permission/index.vue)
- 内容审核页面 (src/views/content/audit/index.vue)
- 举报管理页面 (src/views/content/report/index.vue)
- 运营管理页面 (src/views/operation/index.vue)
- 数据统计页面 (src/views/stats/index.vue)

## 注意事项

1. 本项目依赖后端服务，启动前请确保后端服务正常运行
2. 首次登录使用默认管理员账号 `admin/admin123`
3. Token有效期为24小时，过期后需重新登录
4. 开发时建议使用Chrome浏览器并安装Vue DevTools
5. Node.js版本建议 v20+ (当前使用v18.20.8会有警告)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## License

MIT

