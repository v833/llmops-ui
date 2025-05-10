import { request, ssePost } from '@/utils/request'
import type {
  CreateAppRequest,
  GetAppResponse,
  GetDebugConversationMessagesWithPageRequest,
  GetDebugConversationMessagesWithPageResponse,
  GetDraftAppConfigResponse,
  GetPublishHistoriesWithPageResponse,
  UpdateDraftAppConfigRequest,
} from '@/models/app'
import type { BasePaginatorRequest, BaseResponse } from '@/models/base' // 获取应用基础信息

// 获取应用基础信息
export const getApp = (app_id: string) => {
  return request.get<GetAppResponse>(`/apps/${app_id}`)
}

// 在个人空间下新增应用
export const createApp = (req: CreateAppRequest) => {
  return request.post<BaseResponse<{ id: string }>>(`/apps`, req)
}

// 获取特定应用的草稿配置信息
export const getDraftAppConfig = (app_id: string) => {
  return request.get<GetDraftAppConfigResponse>(`/apps/${app_id}/draft-app-config`)
}

// 更新特定应用的草稿配置信息
export const updateDraftAppConfig = (app_id: string, req: UpdateDraftAppConfigRequest) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/draft-app-config`, req)
}

// 获取应用的调试长记忆
export const getDebugConversationSummary = (app_id: string) => {
  return request.get<BaseResponse<{ summary: string }>>(`/apps/${app_id}/summary`)
}

// 更新应用的调试长记忆
export const updateDebugConversationSummary = (app_id: string, summary: string) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/summary`, { summary })
}

export const debugChat = (app_id: string, query: string, onData: (event) => void) => {
  return ssePost(
    `/apps/${app_id}/conversations`,
    {
      query,
    },
    onData,
  )
}

// 停止某次应用的调试会话
export const stopDebugChat = (app_id: string, task_id: string) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/conversations/tasks/${task_id}/stop`)
}

// 获取应用的调试会话消息列表
export const getDebugConversationMessagesWithPage = (
  app_id: string,
  req?: GetDebugConversationMessagesWithPageRequest,
) => {
  return request.get<GetDebugConversationMessagesWithPageResponse>(
    `/apps/${app_id}/conversations/messages`,
    { params: req },
  )
}

// 清空应用的调试会话记录
export const deleteDebugConversation = (app_id: string) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/conversations/delete-debug-conversation`)
}

// 更新/发布应用的配置信息
export const publish = (app_id: string) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/publish`)
}

// 取消指定应用的发布
export const cancelPublish = (app_id: string) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/cancel-publish`)
}

// 获取应用的发布历史列表信息
export const getPublishHistoriesWithPage = (app_id: string, req: BasePaginatorRequest) => {
  return request.get<GetPublishHistoriesWithPageResponse>(`/apps/${app_id}/publish-histories`, {
    params: req,
  })
}

// 回退指定的历史配置到草稿
export const fallbackHistoryToDraft = (app_id: string, app_config_version_id: string) => {
  return request.post<BaseResponse<any>>(`/apps/${app_id}/fallback-history`, {
    app_config_version_id,
  })
}
