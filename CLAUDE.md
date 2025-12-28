# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 项目简介

灵魂交友 - 面向18-30岁年轻人的深度社交平台后端服务。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Spring Boot 3.2 |
| 安全 | Spring Security + JWT |
| 权限 | RBAC（用户-角色-权限） |
| ORM | MyBatis-Plus |
| 数据库 | MySQL 8.0 |
| 缓存 | Redis |
| 文档 | Knife4j (Swagger) |

## 项目结构

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

## 常用命令

```bash
# 进入项目目录
cd soul-app-server

# 编译项目
mvn clean compile

# 运行项目
mvn spring-boot:run

# 打包
mvn clean package -DskipTests

# 运行测试
mvn test

# 运行单个测试类
mvn test -Dtest=ClassName

# 运行单个测试方法
mvn test -Dtest=ClassName#methodName
```

## 开发指南

### 数据库初始化

1. 创建数据库并执行初始化脚本：
```bash
mysql -u root -p < src/main/resources/sql/init.sql
```

2. 默认管理员账号：`admin` / `admin123`

### 接口文档

启动服务后访问：`http://localhost:8080/api/doc.html`

### RBAC权限控制

使用注解进行权限控制：
```java
@PreAuthorize("hasRole('ADMIN')")           // 需要ADMIN角色
@PreAuthorize("hasAuthority('user:list')")  // 需要user:list权限
```

### 开发规范

- Controller层只做参数校验和结果返回
- 业务逻辑放在Service层
- 使用统一响应格式 `Result<T>`
- 异常通过 `BusinessException` 抛出
