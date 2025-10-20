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
    <LayoutMenu ref="menu-ref" :collapsed="state.isOpen" @on-tab-change="onTabChange" :clearId="state.clearId" @on-menu-update="onMenuChange"/>
    <div class="page-container">
      <LayoutHeader v-model:collapsed="state.isOpen"/>
      <!-- <h1>{{state.routeKey}}</h1>
      <h2>{{state.aliveNames}}</h2> -->
      <LayoutTabs :tags="state.tabList" @on-refresh="onRefreshTab" @on-remove="toRemove"/>
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
import {  cloneVNode, computed, nextTick, onBeforeUnmount, reactive, useTemplateRef, watch } from 'vue'
import LayoutMenu, { type IMenuItem } from './components/LayoutMenu/index.vue'
import LayoutTabs, { type ITabItem } from './components/LayoutTabs/index.vue'
import LayoutHeader from './components/LayoutHeader/index.vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import LayoutBreadcrumb from './components/LayoutBreadcrumb/index.vue'


const route = useRoute()
const iCache = useTemplateRef('ref-alive')
const state = reactive({
  menus: [] as IMenuItem[],
  clearId: 0,
  isOpen: false,
  tabList: [] as ITabItem[],
  aliveNames: [] as string[],
  routeKey: '',
  aliveKeys: {} as Record<string, {
    count: number,
    id: string
  }>
})

const iMenu = useTemplateRef('menu-ref')

function onMenuChange (v: IMenuItem[]) {
  state.menus = v
}

function onTabChange (data: ITabItem[], newKey?: string) {
  const newOpen = !jUtilsBase.isNull(newKey) && !!state.aliveKeys[newKey] && !state.tabList.some(c=>c.routeName === newKey)
  // console.log("是否重载", newOpen,newKey)
  // console.log("tab列表", data)
  state.tabList = data
  if(newOpen) {
    nextTick(function () {
      onRefreshTab(newKey)
    })
  }  
}

function updateRouteKey () {
  const currentComponentName = route.name as string
  
  if(jUtilsBase.isNull(state.aliveKeys[currentComponentName])) {
    state.aliveKeys[currentComponentName] = {
      count: 0,
      id:`${currentComponentName}@0` 
    }
  }
  const needCache = route.meta.cache === true
  if(needCache === false) {
    jUtilsBase.arrayRemove(state.aliveNames, (c) => c === currentComponentName)
  } else if(!state.aliveNames.includes(currentComponentName)) {
    state.aliveNames.push(currentComponentName)
  }
  state.routeKey = state.aliveKeys[currentComponentName].id
}

watch(() => route.name, updateRouteKey, {
  immediate: true
})

async function onRefreshTab (key: string) {
  if(!jUtilsBase.isNull(state.aliveKeys[key])) {
    const count = ++state.aliveKeys[key].count
    state.aliveKeys[key].id = `${key}@${count}`    
  }  
  updateRouteKey()
}


function toRemove (key: string) {
  iMenu.value?.removeTag(key)
}

</script>