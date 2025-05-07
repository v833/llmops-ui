import { ssePost } from '@/utils/request'

export const debugApp = (app_id: string, query: string, onData: (event) => void) => {
  return ssePost(
    `/apps/${app_id}/debug`,
    {
      query,
    },
    onData,
  )
}
