import { request } from '@/utils/request'
import type {
  GetConversationMessagesWithPageRequest,
  GetConversationMessagesWithPageResponse,
} from '@/models/conversation'
import type { BaseResponse } from '@/models/base'

// 获取指定会话的消息列表
export const getConversationMessages = (
  conversation_id: string,
  req: GetConversationMessagesWithPageRequest,
) => {
  return request.get<GetConversationMessagesWithPageResponse>(
    `/conversations/${conversation_id}/messages`,
    { params: req },
  )
}

// 删除特定的会话
export const deleteConversation = (conversation_id: string) => {
  return request.post<BaseResponse<any>>(`/conversations/${conversation_id}/delete`)
}

// 删除特定会话下的指定消息
export const deleteMessage = (conversation_id: string, message_id: string) => {
  return request.post<BaseResponse<any>>(`/conversations/${conversation_id}/messages/${message_id}`)
}

// 获取指定会话的名称
export const getConversationName = (conversation_id: string) => {
  return request.get<BaseResponse<{ name: string }>>(`/conversations/${conversation_id}/name`)
}

// 修改指定会话的名称
export const updateConversationName = (conversation_id: string, name: string) => {
  return request.post<BaseResponse<any>>(`/conversations/${conversation_id}/name`, { name })
}

// 置顶或取消置顶某个会话
export const updateConversationIsPinned = (conversation_id: string, is_pinned: boolean) => {
  return request.post<BaseResponse<any>>(`/conversations/${conversation_id}/is-pinned`, {
    is_pinned,
  })
}
