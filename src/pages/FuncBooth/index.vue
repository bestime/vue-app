<style lang="scss" scoped>
.FuncBooth {
  position:absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  flex-shrink: 0; 
  .body {
    background-color: #001544;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    video {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  .header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
    width: 100%;
    height:90px;
    background-image: url("/static/images/2025-03-17/title.png");
    background-size: 1920px 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 480px;
    }

  }
  .btn-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 400px;
    margin: 180px 20px 0 20px;
    position: relative;
    justify-content: center;
    z-index: 3;
    
    .Card3DButton {
      @for $i from 1 through 8 {
        &:nth-of-type(#{$i}) {
          transition-duration: #{0.5s + ($i - 1) * 0.1s};
        }
      }
      &:nth-of-type(4) {
        margin: 0 5px 0 0;
      }
      &:nth-of-type(5) {
        margin: 0 0 0 5px;
      }
    }
  }
}
</style>

<template>
  <div class="FuncBooth" >
    <div class="body">
      
      
      <div class="header">        
        <img src="/static/images/logo@2x.png"/>
      </div>
      
      <div class="btn-wrapper">
        <Card3DButton v-for="item in state.card3dList" :key="item.name" :item="item"/>
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">

import Card3DButton, { type ICard3dItem } from './components/Card3DButton/index.vue'

import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { serverURL } from '@/request';
import { cloneDeep } from 'lodash-es';
import { IS_DEV } from '@/utils/constant';
const router = useRouter()

const all3Dlist:ICard3dItem[] = [
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-1.png'),
    name: '概况介绍',
    routeName: 'ROUTE_SYSTEM_HOME',
    translateZ: '100px',
    translateX: ['880px', '-107px'],
    rotateY: '20deg',
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-2.png'),
    name: '交易分析',
    routeName: 'ROUTE_NORMALSCREEN_DEALANALYSE',
    translateZ: '55px',
    translateX: ['560px', '-50px'],
    rotateY: '15deg'
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-3.png'),
    name: '实时交易',
    routeName: 'ROUTE_NORMALSCREEN_REALTIMETRADE',
    translateZ: '20px',
    translateX: ['340px', '-17px'],
    rotateY: '10deg'
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-4.png'),
    name: '会员分析',
    routeName: 'ROUTE_NORMALSCREEN_MEMBERANALYSIS',
    translateZ: '0px',
    translateX: ['120px', '0'],
    rotateY: '5deg'
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-5.png'),
    name: '运营分析',
    routeName: 'ROUTE_NORMALSCREEN_OPERATIONANALYSIS',
    translateZ: '0px',
    translateX: ['-120px', '0px'],
    rotateY: '-5deg'
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-6.png'),
    name: '管网设施',
    routeName: 'ROUTE_NORMALSCREEN_PIPEFACILITY',
    translateZ: '20px',
    translateX: ['-340px', '17px'],
    rotateY: '-10deg'
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-7.png'),
    name: '市场分析',
    routeName: 'ROUTE_NORMALSCREEN_MARKETANALYSIS',
    translateZ: '55px',
    translateX: ['-560px', '50px'],
    rotateY: '-15deg'
  },
  {
    enabled: false,
    iconUrl: serverURL('@local', '/static/images/2025-03-17/icon-8.png'),
    name: '智慧应用',
    routeName: 'ROUTE_NORMALSCREEN_COMMANDAPPLICATION',
    translateZ: '100px',
    translateX: ['-880px', '107px'],
    rotateY: '-20deg'
  },
] as ICard3dItem[]

const state = reactive({
  card3dList: [] as ICard3dItem[]
})



function updateCards () {
  const routes = router.getRoutes()
  all3Dlist.forEach(function (d3) {
    d3.enabled = routes.some(function (r) {
      return r.name === d3.routeName
    })
  })

  const enabledNum = all3Dlist.filter(c=>c.enabled).length
  if(enabledNum === 0) {
    router.replace({
      name: 'ROUTE_LOGIN_ROOT'
    })
  }

  console.log("all3Dlist", all3Dlist, cloneDeep(routes))

  state.card3dList = all3Dlist
}


onMounted(function () {  
  updateCards()
  console.log("路由列表", router.getRoutes())
})

</script>