<style lang="scss" scoped>
.Home {
  box-sizing: border-box;;
  
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
  <div class="flex gap-1 items-center" style="margin: 20px;">
    <a-button @click="toLoading(true)" type="primary">重置并唤起（{{loading.state.count}}）</a-button>
    <a-button @click="toLoading(false)">唤起loading（{{loading.state.count}}）</a-button>
    <a-button @click="toCloseLoading">关闭loading（{{loading.state.count}}）</a-button>
  </div>
  <h1>测试并发loading，目的是开启了N次，也许执行N此关闭才真正关闭：{{loading.state.count}}</h1>
  <LoadingWrapper class="Home" :loading="loading.state.visible">
    <section class="flex items-center justify-center">{{t('welcome')}}{{ t('global.systemName') }}</section>
  </LoadingWrapper>  
</template>

<script lang="ts" setup>
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLoading } from '@/plugins/jcy/hooks'

defineOptions({
  name: 'ROUTE_HOME'
})

const { t } = useI18n({
  useScope: 'global',
  messages: {
    "zh": {
      'welcome': '欢迎来到'
    },
    "en": {
      'welcome': 'Welcome To '
    },
  }
})

const loading = useLoading(true)

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