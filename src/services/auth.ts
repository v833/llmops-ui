import { request } from '@/utils/request'
import { type BaseResponse } from '@/models/base'
import { type PasswordLoginResponse } from '@/models/auth'

// 账号密码登录请求
export const passwordLogin = (email: string, password: string) => {
  return request.post<PasswordLoginResponse>(`/auth/password-login`, {
    email,
    password,
  })
}

// 退出登录请求
export const logout = () => {
  return request.post<BaseResponse<any>>(`/auth/logout`)
}
