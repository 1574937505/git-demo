# 灵魂交友平台 - 项目总览

## 项目结构

本项目包含两个主要部分：

### 1. 后端服务 (soul-app-server)

位置：`D:\javaProject\job\git-demo\soul-app-server`

**技术栈：**
- Spring Boot 3.2
- Spring Security + JWT
- MyBatis-Plus
- MySQL 8.0
- Redis
- Knife4j (Swagger)

**主要功能：**
- RBAC权限管理系统
- JWT认证机制
- 用户、角色、权限管理
- 内容审核和举报管理
- 运营管理和数据统计

**启动方式：**
```bash
cd soul-app-server
mvn spring-boot:run
```

**接口文档：** http://localhost:8080/api/doc.html

**默认管理员账号：** admin / admin123

### 2. 管理后台前端 (soul-app-admin)

位置：`D:\javaProject\job\git-demo\soul-app-admin`

**技术栈：**
- Vue 3 + TypeScript
- Element Plus
- Vue Router
- Pinia
- Axios
- Vite

**主要功能：**
- 系统管理（用户、角色、权限）
- 内容管理（审核、举报）
- 运营管理
- 数据统计
- 基于RBAC的权限控制

**启动方式：**
```bash
cd soul-app-admin
npm install
npm run dev
```

**访问地址：** http://localhost:5173

**登录账号：** admin / admin123

## Node.js版本要求

前端项目需要 Node.js 20.19+ 或 22.12+

当前系统使用的是 Node.js v18.20.8，需要升级。

**解决方案：**

1. **使用 nvm 切换版本（推荐）：**
   ```bash
   # 安装 nvm-windows (如果没有安装)
   # 下载地址: https://github.com/coreybutler/nvm-windows/releases

   # 安装 Node.js 20
   nvm install 20

   # 切换到 Node.js 20
   nvm use 20

   # 验证版本
   node -v
   ```

2. **直接安装新版本 Node.js：**
   - 访问 https://nodejs.org/
   - 下载并安装 Node.js 20 LTS 或更高版本

## 完整启动流程

### 1. 启动后端服务

```bash
# 1. 确保 MySQL 和 Redis 已启动

# 2. 初始化数据库（首次运行）
mysql -u root -p < soul-app-server/src/main/resources/sql/init.sql

# 3. 启动后端服务
cd soul-app-server
mvn spring-boot:run

# 等待启动完成，看到类似信息：
# Started SoulApplication in 5.234 seconds
```

### 2. 启动前端服务

```bash
# 1. 升级 Node.js 到 20+ 版本（如果需要）

# 2. 安装依赖
cd soul-app-admin
npm install

# 3. 启动开发服务器
npm run dev

# 看到类似信息：
# VITE v7.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
```

### 3. 访问系统

1. 打开浏览器访问：http://localhost:5173
2. 使用默认账号登录：admin / admin123
3. 开始使用管理后台

## 项目特点

### 后端特点
- 完整的RBAC权限模型（6种预定义角色）
- JWT双Token机制（访问Token + 刷新Token）
- 统一的响应格式和异常处理
- MyBatis-Plus自动填充和分页
- Swagger API文档

### 前端特点
- Vue 3 Composition API
- TypeScript类型安全
- Pinia状态持久化
- 路由权限守卫
- 组件级权限控制
- Element Plus UI组件库
- Axios请求拦截和响应处理

## 开发状态

### 已完成
- [x] 后端基础框架搭建
- [x] RBAC权限系统
- [x] JWT认证机制
- [x] 前端项目初始化
- [x] 登录页面
- [x] 主布局和导航
- [x] 仪表盘
- [x] 用户管理页面（完整CRUD）
- [x] 路由权限控制
- [x] API接口封装
- [x] 状态管理

### 待开发
- [ ] 后端业务接口（controller/service/mapper）
- [ ] 角色管理页面
- [ ] 权限管理页面
- [ ] 内容审核页面
- [ ] 举报管理页面
- [ ] 运营管理页面
- [ ] 数据统计页面

## 常见问题

### Q: 无法启动前端项目，提示 Node.js 版本过低？
A: 升级 Node.js 到 20.19+ 或 22.12+ 版本。

### Q: 登录提示"网络错误"？
A: 确保后端服务已启动（http://localhost:8080/api）。

### Q: 数据库连接失败？
A: 检查 MySQL 是否启动，数据库是否已创建，配置是否正确。

### Q: Redis连接失败？
A: 确保 Redis 服务已启动（默认端口6379）。

### Q: 前端API请求404？
A: 确认后端服务运行正常，检查 .env.development 中的 API 地址配置。

## 后续计划

1. 完善后端业务接口实现
2. 实现所有前端管理页面
3. 添加单元测试和集成测试
4. 性能优化和安全加固
5. Docker化部署
6. 移动端App/H5开发

## 技术支持

如有问题，请查看：
- 后端文档：soul-app-server/README.md (需创建)
- 前端文档：soul-app-admin/README.md
- 项目指导：CLAUDE.md
