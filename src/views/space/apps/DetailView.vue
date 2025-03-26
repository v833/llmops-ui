<script setup lang="ts">
import { post } from '@/utils/request'

async function debug() {
  const response = await post('/apps/e0d13c78-870b-46df-b2f5-693ae9d5d727/debug', {
    body: { query: '你好，你是谁' },
  })
  console.log(response)
}
</script>

<template>
  <a-button @click="debug">发起请求</a-button>
</template>

<style scoped></style>
