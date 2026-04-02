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
  <div class="Home">
    <section class="flex items-center justify-center">{{t('welcome')}}{{ t('global.systemName') }}</section>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n';
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