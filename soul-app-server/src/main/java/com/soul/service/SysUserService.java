package com.soul.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.soul.entity.system.SysUser;
import com.soul.security.LoginUser;

import java.util.Set;

/**
 * 系统用户Service
 */
public interface SysUserService extends IService<SysUser> {

    /**
     * 根据用户名查询用户
     */
    SysUser getByUsername(String username);

    /**
     * 根据手机号查询用户
     */
    SysUser getByPhone(String phone);

    /**
     * 获取用户角色编码列表
     */
    Set<String> getRoleCodesByUserId(Long userId);

    /**
     * 获取用户权限编码列表
     */
    Set<String> getPermissionCodesByUserId(Long userId);

    /**
     * 构建登录用户信息
     */
    LoginUser buildLoginUser(SysUser user);

}
