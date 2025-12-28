package com.soul.utils;

import com.soul.security.LoginUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

/**
 * JWT工具类
 */
@Slf4j
@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 生成Token
     */
    public String generateToken(LoginUser loginUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", loginUser.getUserId());
        claims.put("username", loginUser.getUsername());
        claims.put("nickname", loginUser.getNickname());
        claims.put("roles", loginUser.getRoles());
        claims.put("permissions", loginUser.getPermissions());

        return Jwts.builder()
                .claims(claims)
                .subject(loginUser.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * 生成刷新Token
     */
    public String generateRefreshToken(LoginUser loginUser) {
        return Jwts.builder()
                .subject(loginUser.getUsername())
                .claim("userId", loginUser.getUserId())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshExpiration))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * 验证Token
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            log.warn("Token验证失败: {}", e.getMessage());
            return false;
        }
    }

    /**
     * 从Token获取用户信息
     */
    @SuppressWarnings("unchecked")
    public LoginUser getLoginUser(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            LoginUser loginUser = new LoginUser();
            loginUser.setUserId(claims.get("userId", Long.class));
            loginUser.setUsername(claims.getSubject());
            loginUser.setNickname(claims.get("nickname", String.class));
            loginUser.setRoles(new HashSet<>(claims.get("roles", java.util.List.class)));
            loginUser.setPermissions(new HashSet<>(claims.get("permissions", java.util.List.class)));
            loginUser.setStatus(1);

            return loginUser;
        } catch (Exception e) {
            log.error("解析Token失败: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 获取Token过期时间
     */
    public Date getExpirationFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getExpiration();
    }

}
