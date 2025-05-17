import { request } from '@/utils/request'
import type { GetLanguageModelResponse, GetLanguageModelsResponse } from '@/models/language-model'

// 获取所有语言模型列表信息
export const getLanguageModels = () => {
  return request.get<GetLanguageModelsResponse>(`/language-models`)
}

// 获取指定模型的详细信息
export const getLanguageModel = (provider_name: string, model_name: string) => {
  return request.get<GetLanguageModelResponse>(`/language-models/${provider_name}/${model_name}`)
}
