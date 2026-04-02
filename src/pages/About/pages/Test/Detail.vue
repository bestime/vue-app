<style lang="scss" scoped>
.tplDemo {
  box-sizing: border-box;
}
</style>

<template>
  <div class="tplDemo">
    <button @click="state.count++">点击次数（{{ state.count }}）</button>
    <h1>我是测试详情{{ state.dataId }}</h1>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

defineOptions({
  name: 'ROUTE_TEST_DETAIL'
})

const state = reactive({
  count: 0,
  dataId: ''
})

onMounted(function () {
  state.dataId = route.query.id as string
  console.log("加载-我是测试详情", state.dataId)
})

onBeforeUnmount(function () {
  console.log("卸载-我是测试详情", state.dataId)
})
</script>