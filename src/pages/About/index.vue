<style lang="scss" scoped>
.About {
  box-sizing: border-box;
}
</style>

<template>
  <div class="About">
    <h3>关于我们</h3>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'
onMounted(function () {
  console.log("关于我们加载了")
})

defineOptions({
  name: 'ROUTE_ABOUT'
})

onBeforeUnmount(function () {
  console.log("关于我们-卸载")
})
</script>