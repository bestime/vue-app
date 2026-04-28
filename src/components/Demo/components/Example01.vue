<style lang="scss" scoped>
.Example01 {
  box-sizing: border-box;
  section {
    background-color: #e0e0e0;
    margin: 20px;
    height: 300px;
    font-size: 26px;
    font-weight: bold;
    border-radius: 8px;
  }
}
</style>

<template>
  <div class="Example01">
    <div>
      <a-button @click="toLoading(true)" type="primary">重置并唤起（{{loading.state.count}}）</a-button>
      <a-button @click="toLoading(false)">唤起loading（{{loading.state.count}}）</a-button>
      <a-button @click="toCloseLoading">关闭loading（{{loading.state.count}}）</a-button>
    </div>
    <h1>测试并发loading，目的是开启了N次，也许执行N次关闭才真正关闭：{{loading.state.count}}</h1>  
    <LoadingWrapper :loading="loading.state.visible">
      <section class="flex items-center justify-center">loading测试</section>    
    </LoadingWrapper>
  </div>
  
</template>

<script lang="ts" setup>
import useLoading from '@/plugins-jcy/hooks/useLoading';
import { reactive, onBeforeUnmount } from 'vue'
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
const loading = useLoading(false)

function toLoading (reset: boolean) {
  if(reset===true) {
    loading.reset()
  }
  loading.show()
}
function toCloseLoading () {
  loading.close()
}
</script>