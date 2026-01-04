package com.soul.service.impl;

import com.soul.common.exception.BusinessException;
import com.soul.common.result.ResultCode;
import com.soul.dto.request.LoginRequest;
import com.soul.dto.response.LoginResponse;
import com.soul.entity.system.SysUser;
import com.soul.security.LoginUser;
import com.soul.service.AuthService;
import com.soul.service.SysUserService;
import com.soul.utils.JwtUtils;
import com.soul.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * 认证服务实现
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final SysUserService sysUserService;
    private final JwtUtils jwtUtils;
    private final RedisUtils redisUtils;

    @Value("${jwt.expiration}")
    private Long expiration;

    private static final String TOKEN_BLACKLIST_PREFIX = "token:blacklist:";

    @Override
    public LoginResponse login(LoginRequest request) {
        try {
            // 认证
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            LoginUser loginUser = (LoginUser) authentication.getPrincipal();

            // 生成Token
            String accessToken = jwtUtils.generateToken(loginUser);
            String refreshToken = jwtUtils.generateRefreshToken(loginUser);

            log.info("用户登录成功: {}", loginUser.getUsername());

            return LoginResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .expiresIn(expiration / 1000)
                    .userId(loginUser.getUserId())
                    .username(loginUser.getUsername())
                    .nickname(loginUser.getNickname())
                    .roles(loginUser.getRoles())
                    .build();
        } catch (AuthenticationException e) {
            log.warn("用户登录失败: {} - {}", request.getUsername(), e.getMessage());
            throw new BusinessException(ResultCode.PASSWORD_ERROR);
        }
    }

    @Override
    public LoginResponse refreshToken(String refreshToken) {
        // 验证刷新Token
        if (!jwtUtils.validateToken(refreshToken)) {
            throw new BusinessException(ResultCode.TOKEN_INVALID);
        }

        // 从刷新Token获取用户信息
        LoginUser loginUser = jwtUtils.getLoginUser(refreshToken);
        if (loginUser == null) {
            throw new BusinessException(ResultCode.TOKEN_INVALID);
        }

        // 重新加载用户信息
        SysUser user = sysUserService.getByUsername(loginUser.getUsername());
        if (user == null || user.getStatus() != 1) {
            throw new BusinessException(ResultCode.ACCOUNT_DISABLED);
        }

        // 重新构建登录用户
        loginUser = sysUserService.buildLoginUser(user);

        // 生成新Token
        String newAccessToken = jwtUtils.generateToken(loginUser);
        String newRefreshToken = jwtUtils.generateRefreshToken(loginUser);

        return LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .expiresIn(expiration / 1000)
                .userId(loginUser.getUserId())
                .username(loginUser.getUsername())
                .nickname(loginUser.getNickname())
                .roles(loginUser.getRoles())
                .build();
    }

    @Override
    public void logout(String token) {
        if (token != null && jwtUtils.validateToken(token)) {
            // 将Token加入黑名单
            long remainingTime = jwtUtils.getExpirationFromToken(token).getTime() - System.currentTimeMillis();
            if (remainingTime > 0) {
                redisUtils.set(TOKEN_BLACKLIST_PREFIX + token, "1", remainingTime, TimeUnit.MILLISECONDS);
            }
            log.info("用户登出成功");
        }
    }

}
