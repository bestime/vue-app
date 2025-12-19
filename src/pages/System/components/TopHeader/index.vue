<style lang="scss" scoped>
.TopHeader {
  flex-shrink: 0;
  background-color: #00215b;
  height: 64px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
  z-index: 10;
  .navlilst {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    flex:1;
    margin: 0 0 0 30px;
  }
}

.logo {
  width: 330px;
  height: 36px;
  margin: 0 0 0 20px;
  cursor: pointer;
  user-select: none;
}
.split-pt {
  width: 2px;
  height: 32px;
  background-color: rgba(168, 222, 253, 0.1);
  margin: 0 20px;
}
.user-info{
  color: white;
  font-size: 18px;
  margin: 0 30px 0 0;
}
</style>

<template>
  <div class="TopHeader">
    <img src="/static/images/logo@2x.png" class="logo" @click="onLogoClick"/>
    <div class="navlilst">
      <HeaderButton :data="menuList"  v-for="item in menuList" :key="item.routeName" :item="item"/>
    </div>
    
    <div class="user-info">{{state.userName}}</div>
    <TimeClock @on-time-change="onTimeChange"/>
    <div class="split-pt"></div>
    <!-- <LanguageSelect/> -->
    <ToggleScreen/>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import HeaderButton from './components/HeaderButton/index.vue'
import TimeClock from './components/TimeClock/index.vue'
import ToggleScreen from './components/ToggleScreen/index.vue'
import { useRoute, useRouter } from 'vue-router';

import { getNormalMenuList } from './lib';
import { getRouteNames } from '@/permission';
import { apiLoginLoginResultData } from '@/services';

const router = useRouter()
const route = useRoute()

function onLogoClick () {
  router.push({
    name: 'ROUTE_FUNBOOTH'
  })
}
const emits = defineEmits<{
  (name: 'on-time-change', ms: number): void
}>()








const state = reactive({
  userName: ''
})

const all = getNormalMenuList()
const menuList = computed(function () {
  const names = getRouteNames()
  const fit = jUtilsBase.treeFilter(all, function (item) {
    return names.includes(item.routeName)
  })
  return fit
})


function onTimeChange (ms: number) {
  emits('on-time-change', ms)
}

onMounted(function () {
  apiLoginLoginResultData().then(function (resp) {
    state.userName = jUtilsBase.defualtFormatter('-', resp.data.data?.user?.name)
  })
})


</script>