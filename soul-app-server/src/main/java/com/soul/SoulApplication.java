package com.soul;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 灵魂交友 - 应用启动类
 */
@SpringBootApplication
@MapperScan("com.soul.mapper")
public class SoulApplication {

    public static void main(String[] args) {
        SpringApplication.run(SoulApplication.class, args);
    }

}
