

<template>
  <a-config-provider :locale="antdLocal">
    <RouterView/>
  </a-config-provider>  
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enGB from 'ant-design-vue/es/locale/en_GB';

import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';


const {locale} = useI18n()

const antdLocal = computed(function () {
  if(locale.value === 'zh') {
    dayjs.locale('zh-cn');
    return zhCN
  } else if(locale.value === 'en') {
    dayjs.locale('en');
    return enGB
  }
})
</script>
