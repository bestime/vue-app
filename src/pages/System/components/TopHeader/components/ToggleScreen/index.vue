<style lang="scss" scoped>
.ToggleScreen {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("/static/images/button_expanded@2x.png");
  background-size: 100% 100%;
  user-select: none;
  cursor: pointer;
  outline: none;
  
  
}

ul {
  padding: 5px 0;
  li {
    width: 100px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    cursor: pointer;
    user-select: none;
    transition: 0.15s;
    &:hover {
      background-color: #056adc;
    }
    &::before {
      content: '';
      width: 16px;
      height: 16px;
      margin: 0 8px 0 0;
    }
    &:nth-of-type(1)::before {
      background-image: url("/static/images/2025-03-17/001.png");
    }
    &:nth-of-type(2)::before {
      background-image: url("/static/images/2025-03-17/002.png");
    }
    &:nth-of-type(3)::before {
      background-image: url("/static/images/2025-03-17/003.png");
    }
  }
}

</style>

<template>
  <el-dropdown :teleported="false" class="ToggleScreen" placement="bottom-end" trigger="click" popper-class="g-el-popper01">
    <div class="ToggleScreen"></div>
    <template #dropdown>
      <ul class="test">
        <li @click="jumpToLogin">退出</li>
      </ul>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { apiLoginLoginResultData, apiLoginLogout } from '@/services';
import { useRouter } from 'vue-router';

const router = useRouter()

function jumpToLogin () {
  apiLoginLogout().finally(function () {
    router.replace({
      name: 'ROUTE_LOGIN_ROOT'
    })
  })
}

</script>