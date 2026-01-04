package com.soul.service;

import com.soul.dto.request.LoginRequest;
import com.soul.dto.response.LoginResponse;

/**
 * 认证服务
 */
public interface AuthService {

    /**
     * 用户名密码登录
     */
    LoginResponse login(LoginRequest request);

    /**
     * 刷新Token
     */
    LoginResponse refreshToken(String refreshToken);

    /**
     * 登出
     */
    void logout(String token);

}
