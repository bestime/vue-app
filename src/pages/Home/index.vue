<style lang="scss" scoped>
.Home {
  box-sizing: border-box;
}
</style>

<template>
  <div class="Home">
    <h3>我是首页</h3>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'

defineOptions({
  name: 'ROUTE_HOME'
})

onMounted(function () {
  console.log("首页加载了")
})
</script>