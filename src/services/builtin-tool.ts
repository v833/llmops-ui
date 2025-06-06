import { request } from '@/utils/request'
import { type GetBuiltinToolsResponse, type GetCategoriesResponse } from '@/models/builtin-tool'

// 获取内置分类列表信息
export const getCategories = async () => {
  return request.get<GetCategoriesResponse>('/builtin-tools/categories')
}

// 获取所有内置工具提供者列表
export const getBuiltinTools = async () => {
  return request.get<GetBuiltinToolsResponse>('/builtin-tools')
}

// 获取内置工具详情
export const getBuiltinTool = (provider_name: string, tool_name: string) => {
  return request.get(`/builtin-tools/${provider_name}/tools/${tool_name}`)
}
