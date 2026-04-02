<style lang="scss" scoped>
.About {
  box-sizing: border-box;
  margin: 20px;
  padding: 20px;
  background-color: white;
}
</style>

<template>
  <div class="About">
    <h1>{{ t('global.systemName') }}</h1>
    <h3>{{ t('message') }}</h3>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()

const { t } = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      'message': '关于我们页面'
    },
    "en": {
      'message': 'About Us Page'
    },
  }
})

let flag = ''

onMounted(function () {
  flag = JSON.stringify(route.fullPath)
  console.log("关于我们加载了：", flag)
})

defineOptions({
  name: 'ROUTE_ABOUT'
})

onBeforeUnmount(function () {
  console.log("关于我们-卸载", flag)
})
</script>