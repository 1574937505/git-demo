// 统一响应格式类型定义

export interface Result<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

export interface PageResult<T> {
  total: number
  records: T[]
  current: number
  size: number
}

export interface PageRequest {
  current?: number
  size?: number
  [key: string]: any
}

export enum ResultCode {
  SUCCESS = 200,
  FAIL = 500,

  // 认证相关 1xxx
  UNAUTHORIZED = 1001,
  TOKEN_INVALID = 1002,
  TOKEN_EXPIRED = 1003,
  ACCESS_DENIED = 1004,
  ACCOUNT_DISABLED = 1005,
  ACCOUNT_LOCKED = 1006,

  // 参数相关 2xxx
  PARAM_ERROR = 2001,
  PARAM_MISSING = 2002,
  PARAM_INVALID = 2003,

  // 业务相关 3xxx
  USER_NOT_FOUND = 3001,
  USER_ALREADY_EXISTS = 3002,
  PASSWORD_ERROR = 3003,
  PHONE_ALREADY_BOUND = 3004,
  VERIFY_CODE_ERROR = 3005,
  VERIFY_CODE_EXPIRED = 3006,

  // 系统相关 5xxx
  SYSTEM_ERROR = 5000,
  SERVICE_UNAVAILABLE = 5001,
  DATABASE_ERROR = 5002
}
