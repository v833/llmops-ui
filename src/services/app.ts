import { request } from '@/utils/request'

export const debugApp = (app_id: string, query: string) => {
  return request.post(`/apps/${app_id}/debug`, { query })
}
