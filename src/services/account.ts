import { request } from '@/utils/request'
import { type BaseResponse } from '@/models/base'
import { type GetCurrentUserResponse } from '@/models/account'

// 获取当前登录账号信息
export const getCurrentUser = () => {
  return request.get<GetCurrentUserResponse>(`/account`)
}

// 修改当前登录账号密码
export const updatePassword = (password: string) => {
  return request.post<BaseResponse<any>>(`/account/password`, {
    password,
  })
}

// 修改当前登录账号名称
export const updateName = (name: string) => {
  return request.post<BaseResponse<any>>(`/account/name`, {
    name,
  })
}

// 修改当前登录账号头像
export const updateAvatar = (avatar: string) => {
  return request.post<BaseResponse<any>>(`/account/avatar`, {
    avatar,
  })
}
