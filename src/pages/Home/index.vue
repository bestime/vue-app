<style lang="scss" scoped>
.Home {
  box-sizing: border-box;;
  
  section {
    text-align: center;
    background-color: #e0e0e0;
    margin: 20px;
    padding: 100px 0;
    font-size: 26px;
    font-weight: bold;
    border-radius: 8px;
  }
}
</style>

<template>
  <div class="Home">
    <section>{{t('welcome')}}{{ t('global.systemName') }}</section>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n({
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