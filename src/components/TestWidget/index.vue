<style scoped lang="scss">
.TestWidget {
  background-color: red;
  width: 200px;
  line-height: 40px;
  color: white;
}
.bgimg {
  background-image: url("/static/images/tobacco.png");
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
</style>

<template>
  <button class="TestWidget" @click="onClick">测试按钮</button>
  <div class="bgimg">背景图片</div>
</template>

<script lang="ts" setup>
import { apiTest } from '@/api';

function onClick () {
  apiTest({
    params: {
      ie: 'UTF-8',
      wd: '你好'
    }
  }).then(function (res) {
    const a = res.data
    alert(a)
    
  })
}
</script>