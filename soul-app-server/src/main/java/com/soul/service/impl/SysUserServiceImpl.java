package com.soul.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.soul.entity.system.SysUser;
import com.soul.mapper.SysUserMapper;
import com.soul.security.LoginUser;
import com.soul.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * 系统用户Service实现
 */
@Service
@RequiredArgsConstructor
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    @Override
    public SysUser getByUsername(String username) {
        return getOne(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getUsername, username)
                .eq(SysUser::getDeleted, 0));
    }

    @Override
    public SysUser getByPhone(String phone) {
        return getOne(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getPhone, phone)
                .eq(SysUser::getDeleted, 0));
    }

    @Override
    public Set<String> getRoleCodesByUserId(Long userId) {
        return baseMapper.selectRoleCodesByUserId(userId);
    }

    @Override
    public Set<String> getPermissionCodesByUserId(Long userId) {
        return baseMapper.selectPermissionCodesByUserId(userId);
    }

    @Override
    public LoginUser buildLoginUser(SysUser user) {
        Set<String> roles = getRoleCodesByUserId(user.getId());
        Set<String> permissions = getPermissionCodesByUserId(user.getId());
        return new LoginUser(user, roles, permissions);
    }

}
