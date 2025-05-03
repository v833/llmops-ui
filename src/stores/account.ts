import { defineStore } from 'pinia'
import { ref } from 'vue'

// 初始值
const initAccount = {
  name: 'admin',
  email: 'admin@admin.com',
  avatar: '',
}

export const useAccountStore = defineStore('account', () => {
  // 1.定义数据
  const account = ref({ ...initAccount })

  // 2.函数/动作
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function update(params: any) {
    Object.assign(account.value, params)
  }

  function clear() {
    account.value = { ...initAccount }
  }

  return { account, update, clear }
})
