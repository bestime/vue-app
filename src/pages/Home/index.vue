<style lang="scss" scoped>
.Home {
  box-sizing: border-box;
  margin: 20px;
  padding: 20px;
  background-color: white;
}
</style>

<template>
  <div class="Home">
    <h3>{{ t('message') }}</h3>
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      'message': '我是首页'
    },
    "en": {
      'message': 'wo shi shou ye'
    },
  }
})

defineOptions({
  name: 'ROUTE_HOME'
})

onMounted(function () {
  console.log("首页加载了")
})
</script>
