<style lang="scss" scoped>
.tplDemo {
  box-sizing: border-box;
}
</style>

<template>
  <div class="tplDemo">
    <h1>我是测试详情</h1>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'

onMounted(function () {
  console.log("加载-我是测试详情")
})
</script>