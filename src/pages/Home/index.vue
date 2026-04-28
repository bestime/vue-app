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
    
    
  </div>
  
  <div class="Home">
    <section class="flex items-center justify-center">{{t('welcome')}}{{ t('global.systemName') }}</section>    
  </div>  
  
  <Demo/>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/plugins-jcy/hooks/useLoading'
import useDelayToggle from '@/plugins-jcy/hooks/useDelayToggle';
import Demo from '@/components/Demo/index.vue'



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







</script>