# 灵魂交友 - 后端服务

<div align="center">

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-latest-red.svg)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一款面向18-30岁年轻人的深度社交平台后端服务

[产品需求文档](./灵魂交友产品需求文档.md) · [开发待办](./待办.md) · [Claude工作指南](./CLAUDE.md)

</div>

---

## 📖 项目简介

**灵魂交友**是一款强调"先懂灵魂，再看外表"的深度社交平台。通过性格测试、兴趣标签、AI智能匹配和问答互动等多维度机制，帮助用户找到真正契合的灵魂伙伴。

### 核心特性

- 🧠 **多维度匹配** - MBTI性格测试 + 兴趣标签 + AI智能推荐
- 🔐 **安全可靠** - Spring Security + JWT + RBAC权限控制
- 💬 **实时通信** - 私信聊天、语音/视频通话支持
- 📊 **内容审核** - AI自动审核 + 人工复审机制
- 🎯 **精准推荐** - 基于深度学习的用户画像建模

---

## 🛠 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Spring Boot | 3.2.1 |
| 安全 | Spring Security + JWT | - |
| 权限 | RBAC（用户-角色-权限） | - |
| ORM | MyBatis-Plus | 3.5.5 |
| 数据库 | MySQL | 8.0 |
| 缓存 | Redis | latest |
| 文档 | Knife4j (Swagger) | 4.4.0 |
| 工具库 | Hutool | 5.8.24 |
| 构建工具 | Maven | - |

---

## 📂 项目结构

```
soul-app-server/
├── src/main/java/com/soul/
│   ├── controller/          # 控制器
│   │   ├── admin/           # 管理端接口
│   │   └── app/             # App端接口
│   ├── service/             # 业务逻辑层
│   │   └── impl/            # 实现类
│   ├── mapper/              # 数据访问层
│   ├── entity/              # 实体类
│   │   ├── system/          # 系统实体（用户、角色、权限）
│   │   ├── user/            # 用户相关
│   │   ├── match/           # 匹配相关
│   │   ├── message/         # 消息相关
│   │   └── content/         # 内容相关
│   ├── dto/                 # 数据传输对象
│   │   ├── request/         # 请求DTO
│   │   └── response/        # 响应DTO
│   ├── vo/                  # 视图对象
│   ├── config/              # 配置类
│   ├── security/            # 安全相关
│   │   ├── filter/          # 过滤器
│   │   └── handler/         # 处理器
│   ├── common/              # 公共组件
│   │   ├── result/          # 统一响应
│   │   ├── exception/       # 异常处理
│   │   ├── constant/        # 常量
│   │   └── annotation/      # 自定义注解
│   └── utils/               # 工具类
├── src/main/resources/
│   ├── mapper/              # MyBatis XML
│   ├── sql/                 # SQL脚本
│   └── application.yml      # 配置文件
└── pom.xml
```

---

## 🚀 快速开始

### 环境要求

- JDK 17+
- Maven 3.6+
- MySQL 8.0+
- Redis

### 数据库初始化

```bash
# 1. 创建数据库
mysql -u root -p

# 2. 执行初始化脚本
mysql -u root -p < soul-app-server/src/main/resources/sql/init.sql
```

### 配置文件

修改 `soul-app-server/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/soul_app?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: your_username
    password: your_password

  redis:
    host: localhost
    port: 6379
```

### 运行项目

```bash
# 进入项目目录
cd soul-app-server

# 编译项目
mvn clean compile

# 运行项目
mvn spring-boot:run

# 或打包后运行
mvn clean package -DskipTests
java -jar target/soul-app-server-1.0.0-SNAPSHOT.jar
```

### 访问接口文档

项目启动后访问：[http://localhost:8080/api/doc.html](http://localhost:8080/api/doc.html)

---

## 🔑 RBAC权限控制

本项目采用标准RBAC（基于角色的访问控制）模型，实现用户-角色-权限的三级控制。

### 系统角色

| 角色编码 | 角色名称 | 权限范围 |
|----------|----------|----------|
| ROLE_SUPER_ADMIN | 超级管理员 | 所有权限 |
| ROLE_ADMIN | 普通管理员 | 用户管理、内容审核、数据统计 |
| ROLE_OPERATOR | 运营人员 | 内容审核、活动管理、推送管理 |
| ROLE_AUDITOR | 审核员 | 内容审核、举报处理 |
| ROLE_USER | 普通用户 | App端所有用户功能 |
| ROLE_VIP_USER | VIP用户 | 普通用户权限+VIP特权（预留） |

### 默认管理员账号

- 用户名：`admin`
- 密码：`admin123`

### 权限注解使用

```java
// 需要ADMIN角色
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/users/{id}")
public Result<Void> deleteUser(@PathVariable Long id) { ... }

// 需要user:list权限
@PreAuthorize("hasAuthority('user:list')")
@GetMapping("/users")
public Result<List<User>> listUsers() { ... }
```

---

## 🧪 测试

```bash
# 运行所有测试
mvn test

# 运行单个测试类
mvn test -Dtest=ClassName

# 运行单个测试方法
mvn test -Dtest=ClassName#methodName
```

---

## 📋 开发规范

1. **Controller层** - 只做参数校验和结果返回
2. **Service层** - 业务逻辑实现
3. **统一响应** - 使用 `Result<T>` 统一响应格式
4. **异常处理** - 通过 `BusinessException` 抛出业务异常
5. **代码风格** - 遵循阿里巴巴Java开发规范

---

## 🗺 产品路线图

### MVP版本（第一阶段）

- [x] 注册登录（手机号+微信）
- [x] 基础个人资料
- [x] MBTI性格测试
- [x] 兴趣标签系统
- [x] 基础匹配推荐
- [x] 私信聊天
- [x] 开屏广告+信息流广告

### 增强版本（第二阶段）

- [ ] 更多性格测试
- [ ] AI智能匹配优化
- [ ] 灵魂广场
- [ ] 问答互动匹配
- [ ] 语音通话
- [ ] 更多广告位

### 完整版本（第三阶段）

- [ ] 视频通话
- [ ] Web端上线
- [ ] 实名认证体系
- [ ] 数据分析平台
- [ ] 运营活动系统
- [ ] 线下活动模块

---

## 📄 文档

- [产品需求文档 (PRD)](./灵魂交友产品需求文档.md) - 完整的产品设计文档
- [开发待办列表](./待办.md) - 任务追踪
- [Claude工作指南](./CLAUDE.md) - Claude Code开发指南

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](../../issues)
- 发送邮件至：your-email@example.com

---

## 📜 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

<div align="center">

**用心连接每一个灵魂 ❤️**

Made with ❤️ by Soul Team

</div>
