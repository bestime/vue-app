<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { apiGetUserInfo } from './request/api/user';
const tabs = [
  {
    name: 'ROUTE_LEVEL_ONE',
    label: '一级路由'
  },
  {
    name: 'ROUTE_LEVEL_ONE_TWO',
    label: '二级路由'
  }
]

apiGetUserInfo()
</script>

<template>
  <ul class="tab-box">
    <RouterLink :to="{name: item.name}" v-for="item in tabs" :key="item.name" custom v-slot="{ route, isExactActive }">
      <li :class="{'is-active': isExactActive}">
        <a :href="route.href">{{item.label}}</a>
      </li>
    </RouterLink>
  </ul>
  <div class="tips">看到6张图片加载成功，表示可以部署到任意目录</div>
  <RouterView />
</template>

<style lang="scss" scoped>
.tab-box {
  display: flex;
  background-color: black;
  margin: 0;
  padding: 0;
  list-style: none;
  li {
   margin: 0 20px;
   padding: 10px;
   color: white;
   &.is-active {
    background-color: yellow;
    color:black;
   }
  }
  a {
    font-size: 16px;
    color: inherit;
    font-style: normal;
  }


}

.tips {
    text-align: center;
    font-size: 20px;
    background: red;
    display: block;
    color: white;
    padding: 20px;
  }
</style>
