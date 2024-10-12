<template>
  <h1>登录</h1>
  <input/>
  <input/>
  <button @click="commitLogin">登录</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()
function commitLogin () {
  router.push({
    name: 'ROUTE_MANAGE_ROOT'
  })
}
</script>