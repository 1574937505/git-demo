package com.soul.common.result;

import lombok.Getter;

/**
 * 响应状态码枚举
 */
@Getter
public enum ResultCode {

    SUCCESS(200, "操作成功"),
    FAIL(500, "操作失败"),

    // 认证相关 1xxx
    UNAUTHORIZED(1001, "未登录或登录已过期"),
    TOKEN_INVALID(1002, "Token无效"),
    TOKEN_EXPIRED(1003, "Token已过期"),
    ACCESS_DENIED(1004, "权限不足"),
    ACCOUNT_DISABLED(1005, "账号已被禁用"),
    ACCOUNT_LOCKED(1006, "账号已被锁定"),

    // 参数相关 2xxx
    PARAM_ERROR(2001, "参数错误"),
    PARAM_MISSING(2002, "缺少必要参数"),
    PARAM_INVALID(2003, "参数格式不正确"),

    // 业务相关 3xxx
    USER_NOT_FOUND(3001, "用户不存在"),
    USER_ALREADY_EXISTS(3002, "用户已存在"),
    PASSWORD_ERROR(3003, "密码错误"),
    PHONE_ALREADY_BOUND(3004, "手机号已被绑定"),
    VERIFY_CODE_ERROR(3005, "验证码错误"),
    VERIFY_CODE_EXPIRED(3006, "验证码已过期"),

    // 系统相关 5xxx
    SYSTEM_ERROR(5000, "系统错误"),
    SERVICE_UNAVAILABLE(5001, "服务不可用"),
    DATABASE_ERROR(5002, "数据库异常");

    private final Integer code;
    private final String message;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

}
