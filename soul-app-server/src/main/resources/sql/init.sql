-- 灵魂交友数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS soul_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE soul_app;

-- =============================================
-- RBAC权限管理表
-- =============================================

-- 系统用户表
CREATE TABLE IF NOT EXISTS sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    nickname VARCHAR(200) COMMENT '昵称',
    phone VARCHAR(20) COMMENT '手机号',
    email VARCHAR(100) COMMENT '邮箱',
    avatar VARCHAR(255) COMMENT '头像',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用 1启用',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除：0未删除 1已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统用户表';

-- 角色表
CREATE TABLE IF NOT EXISTS sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    role_code VARCHAR(50) NOT NULL COMMENT '角色编码',
    role_name VARCHAR(200) NOT NULL COMMENT '角色名称',
    description VARCHAR(500) COMMENT '描述',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用 1启用',
    deleted TINYINT DEFAULT 0 COMMENT '逻辑删除：0未删除 1已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_role_code (role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 权限表
CREATE TABLE IF NOT EXISTS sys_permission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    permission_code VARCHAR(100) NOT NULL COMMENT '权限编码',
    permission_name VARCHAR(200) NOT NULL COMMENT '权限名称',
    type TINYINT NOT NULL COMMENT '类型：1菜单 2按钮 3接口',
    parent_id BIGINT DEFAULT 0 COMMENT '父级ID',
    path VARCHAR(200) COMMENT '路由路径',
    api_url VARCHAR(200) COMMENT '接口URL',
    method VARCHAR(10) COMMENT '请求方法',
    icon VARCHAR(100) COMMENT '图标',
    sort INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用 1启用',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_permission_code (permission_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- 用户角色关联表
CREATE TABLE IF NOT EXISTS sys_user_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    UNIQUE KEY uk_user_role (user_id, role_id),
    KEY idx_user_id (user_id),
    KEY idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- 角色权限关联表
CREATE TABLE IF NOT EXISTS sys_role_permission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    permission_id BIGINT NOT NULL COMMENT '权限ID',
    UNIQUE KEY uk_role_permission (role_id, permission_id),
    KEY idx_role_id (role_id),
    KEY idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- =============================================
-- 初始化数据
-- =============================================

-- 初始化超级管理员 (密码: admin123)
INSERT INTO sys_user (username, password, nickname, status) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt9U3Ua', '超级管理员', 1);

-- 初始化角色
INSERT INTO sys_role (role_code, role_name, description) VALUES
('SUPER_ADMIN', '超级管理员', '拥有系统所有权限'),
('ADMIN', '普通管理员', '用户管理、内容审核、数据统计'),
('OPERATOR', '运营人员', '内容审核、活动管理、推送管理'),
('AUDITOR', '审核员', '内容审核、举报处理'),
('USER', '普通用户', 'App端所有用户功能'),
('VIP_USER', 'VIP用户', '普通用户权限+VIP特权');

-- 分配超级管理员角色
INSERT INTO sys_user_role (user_id, role_id) VALUES (1, 1);

-- 初始化权限
INSERT INTO sys_permission (permission_code, permission_name, type, parent_id, sort) VALUES
-- 系统管理
('system', '系统管理', 1, 0, 1),
('system:user', '用户管理', 1, 1, 1),
('system:user:list', '用户列表', 3, 2, 1),
('system:user:add', '新增用户', 3, 2, 2),
('system:user:edit', '编辑用户', 3, 2, 3),
('system:user:delete', '删除用户', 3, 2, 4),
('system:user:ban', '封禁用户', 3, 2, 5),
('system:role', '角色管理', 1, 1, 2),
('system:role:list', '角色列表', 3, 8, 1),
('system:role:add', '新增角色', 3, 8, 2),
('system:role:edit', '编辑角色', 3, 8, 3),
('system:role:delete', '删除角色', 3, 8, 4),
('system:permission', '权限管理', 1, 1, 3),
('system:permission:list', '权限列表', 3, 13, 1),

-- 内容管理
('content', '内容管理', 1, 0, 2),
('content:audit', '内容审核', 1, 15, 1),
('content:audit:list', '审核列表', 3, 16, 1),
('content:audit:pass', '审核通过', 3, 16, 2),
('content:audit:reject', '审核拒绝', 3, 16, 3),
('content:report', '举报管理', 1, 15, 2),
('content:report:list', '举报列表', 3, 20, 1),
('content:report:handle', '处理举报', 3, 20, 2),

-- 数据统计
('stats', '数据统计', 1, 0, 3),
('stats:view', '查看统计', 3, 23, 1),
('stats:export', '导出数据', 3, 23, 2),

-- 运营管理
('operation', '运营管理', 1, 0, 4),
('operation:activity', '活动管理', 1, 26, 1),
('operation:push', '推送管理', 1, 26, 2);

-- 分配超级管理员所有权限
INSERT INTO sys_role_permission (role_id, permission_id)
SELECT 1, id FROM sys_permission;
