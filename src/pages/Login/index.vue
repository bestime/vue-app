<style lang="scss" scoped>
.Login {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 10% 0 0 0;
  justify-content: flex-start;
  flex-direction: column;
  :deep(){
    .ant-tabs-nav::before {
      border: none;
    }
    .ant-tabs-nav-wrap {
      justify-content: center;
    }
  }
}
</style>

<template>
  <div class="Login">
    <h1>{{ t('global.systemName') }}</h1>
    <a-tabs v-model:activeKey="state.activeWayId" style="width: 400px;">
      <a-tab-pane key="a" :tab="t('loginWayAccount')">
        <WithAccount/>
      </a-tab-pane>
    </a-tabs>
    
  </div>  
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import WithAccount from './components/WithAccount/index.vue'
const {t} = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      'loginWayAccount': '账号密码登录'
    },
    "en": {
      'loginWayAccount': 'Sign In with Account'
    },
  }
})


const state = reactive({
  activeWayId: 'a'
})

onMounted(function () {
  
})


</script>

