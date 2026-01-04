package com.soul.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.soul.entity.system.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Set;

/**
 * 系统用户Mapper
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

    /**
     * 根据用户ID获取角色编码列表
     */
    Set<String> selectRoleCodesByUserId(@Param("userId") Long userId);

    /**
     * 根据用户ID获取权限编码列表
     */
    Set<String> selectPermissionCodesByUserId(@Param("userId") Long userId);

}
