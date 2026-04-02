<style lang="scss" scoped>

.Manage {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  background: #f5f5f5;
}
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 0;
}
.page-route-root {
  flex: 1;
  overflow: auto;
}
</style>

<template>
  <div class="Manage">
    <LayoutMenu :collapsed="state.isOpen" @on-menu-update="onMenuChange"/>
    <div class="page-container">
      <!-- <h1>唯一key：{{state.routeKey}}</h1>
      <h2>{{state.aliveNames}}</h2>
      <h2>缓存：{{state.aliveKeys}}</h2> -->
      <LayoutHeader v-model:collapsed="state.isOpen"/>
      
      <LayoutTabs  @on-refresh="onRefreshTab" @on-remove="toRemove" @on-add="onAddTab"/>
      <LayoutBreadcrumb :meunTree="state.menus"/>
      <RouterView #default="{Component, route}">
        <KeepAlive ref="ref-alive" :include="state.aliveNames">
          <component :is="Component" :key="state.routeKey"/>
        </KeepAlive>
      </RouterView>      
    </div>    
  </div>  
</template>

<script lang="ts" setup>
import {  reactive, watch } from 'vue'
import LayoutMenu, { type IMenuItem } from './components/LayoutMenu/index.vue'
import LayoutTabs, { type ITabItem } from './components/LayoutTabs/index.vue'
import LayoutHeader from './components/LayoutHeader/index.vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import LayoutBreadcrumb from './components/LayoutBreadcrumb/index.vue'

const route = useRoute()
const state = reactive({
  menus: [] as IMenuItem[],
  isOpen: false,
  aliveNames: [] as string[],
  routeKey: '',
  aliveKeys: {} as Record<string, number>
})

function onMenuChange (v: IMenuItem[]) {
  state.menus = v
}

function updateRouteKey () {
  const useRtKey = route.fullPath as string
  state.aliveKeys[useRtKey] = jUtilsBase._Number(state.aliveKeys[useRtKey])
  state.routeKey = useRtKey + '→' + state.aliveKeys[useRtKey]
}

async function onRefreshTab (key: string) {
  if(!jUtilsBase.isNull(state.aliveKeys[key])) {
    const count = ++state.aliveKeys[key]
    state.aliveKeys[key] = count
  }  
  updateRouteKey()
}

function onAddTab (tab: ITabItem) {
  if(tab.cacheName) {
    const exist = state.aliveNames.includes(tab.cacheName)
    if(!exist) {
      state.aliveNames.push(tab.cacheName)
    }    
  } else {
    jUtilsBase.arrayRemove(state.aliveNames, (c) => c === tab.cacheName)
  }
}

function toRemove (tag: ITabItem) {
  // 仅清空缓存的组件就行
  jUtilsBase.arrayRemove(state.aliveNames, function (item) {
    return item === tag.cacheName
  })  
}


watch(() => route.fullPath, updateRouteKey, {
  immediate: true
})
</script>