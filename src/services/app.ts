import { request } from '@/utils/request'
import { type DebugAppResponse } from '@/models/app'

export const debugApp = (app_id: string, query: string) => {
  return request.post<DebugAppResponse>(`/apps/${app_id}/debug`, { query })
}
