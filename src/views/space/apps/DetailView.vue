<script setup lang="ts">
import { request } from '@/utils/request'

async function debug() {
  const response = await request.post('/apps/2b2a4e9d-cfc5-4021-bcce-6f098b6c940b/debug', {
    query: '你好，你是谁',
  })
  console.log(response)
}
</script>

<template>
  <a-button @click="debug">发起请求</a-button>
</template>

<style scoped></style>
