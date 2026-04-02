<style lang="scss" scoped>
.LayoutTabs {
  box-sizing: border-box;
  background-color: white;
  padding: 15px 0 0 0;
}
.tab-reload-icon {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.3s;
  position: relative;
  right: -8px;
  top: 0px;
  margin:0 0 0 3px !important;
}

.tab-reload-icon:hover {
  color: #222222;
}
.tab-more-btn {
  padding: 0 10px;
}
</style>

<template>
  <!-- <h1>高亮：{{activeKey}}</h1> -->
  <a-tabs class="LayoutTabs" :activeKey="activeKey" hide-add type="editable-card" @edit="removeTag" @change="onTabClick">
    <template #leftExtra>
      <span style="padding: 0 0 0 20px;"></span>
    </template>
    <a-tab-pane
      v-for="pane in state.tagList"
      :key="pane.fullPath"
      :closable="pane.removeable && state.tagList.length>1"
    >
      <template #tab>
        <span>{{ pane.label }}</span>
        <ReloadOutlined class="tab-reload-icon" v-if="activeKey === pane.fullPath" @click="toRefresh(route.fullPath as string)"/>
      </template>
    </a-tab-pane>
    <template #rightExtra>
      <a-dropdown class="tab-more-btn">
        <MoreOutlined />
        <template #overlay>
          <a-menu @click="clickTabMore" :key="locale" style="width: 130px;">
            <a-menu-item key="closeOther">{{ t("tabs.close-other") }}</a-menu-item>
            <a-menu-item key="refreshCurrent">{{ t("tabs.refresh-current-page") }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tabs>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter, type RouteLocationNormalizedGeneric } from 'vue-router';
import { ReloadOutlined, MoreOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import type { IMenuItem } from '../LayoutMenu/index.vue';
import { routeList } from '@/router';
const router = useRouter()
const route = useRoute()
const {t,locale} = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      "tabs": {
        "close-other": '关闭其他',
        'refresh-current-page': '刷新当前页'
      }
    },
    "en": {
      "tabs": {
        "close-other": 'Close other',
        'refresh-current-page': 'Refresh current'
      }
    },
  }
})
export interface ITabItem {
  cacheName: string
  fullPath: string,
  label: string,
  removeable: boolean
  highlights?: IMenuItem[]
}

const state = reactive({
  tagList: [] as ITabItem[]
})

const activeKey = computed(function () {
  return route.fullPath
})

function onRouteUpdateCb (to: RouteLocationNormalizedGeneric) {
  // @ts-ignore
  const label = to.meta?.cacheTitle?.(to) ?? '请配置标题'
  
  if(!state.tagList.some(c=>c.fullPath === to.fullPath)) {
    const item: ITabItem = {
      fullPath: to.fullPath,
      label,
      cacheName: jUtilsBase.trim(to.meta.cacheName),
      removeable: to.meta?.cacheCannotRemove !== true,
      highlights: []
    }
    state.tagList.push(item)
    emits('on-add', item)
  }  
}

onBeforeRouteUpdate(function (to, from, next) {  
  if(to.fullPath !== '') {
    onRouteUpdateCb(to)
  }  
  next()
})


onMounted(function () {
  const rcfHome = jUtilsBase.deepFindItem(routeList, function (item) {
    return item.name === 'ROUTE_HOME'
  })
  const rpsHome = router.resolve(rcfHome!)
  // @ts-ignore
  onRouteUpdateCb(rpsHome)
  onRouteUpdateCb(route)
})

const emits = defineEmits<{
  (name: 'on-refresh', key: string): void
  (name: 'on-cleared'): void
  (name: 'on-remove', key: ITabItem): void
  (name: 'on-add', data: ITabItem): void
}>()

function toRefresh (key: string) {  
  emits('on-refresh', key)
}

function onTabClick (rullPath:any) {
  router.push(rullPath)
}

function removeTag (fullPath: any) {  
  // 关闭当前标签时，需要切换到最近一个标签（规则，优先向右，再向左）
  if(fullPath === route.fullPath) {
    const cidx = state.tagList.findIndex(c=>c.fullPath === fullPath)
    let toIdx = jUtilsBase.changeIndex(state.tagList.length-1, cidx, 1)
    if(toIdx === 0) {
      toIdx = cidx - 1
    }
    router.push(state.tagList[toIdx]!.fullPath)
  }
  
  // 再决定是否缓存组件
  const toRemoveItem = state.tagList.find(c=>c.fullPath === fullPath)!
  const toRemoveNum = state.tagList.filter(c=>c.cacheName === toRemoveItem.cacheName).length
  if(toRemoveNum <= 1) {
    emits('on-remove', toRemoveItem)
  }
  // 先移出列表
  jUtilsBase.arrayRemove(state.tagList, function (item) {
    return item.fullPath === fullPath
  })  
}

function toCloseOther () {
  const firstTag = state.tagList.find(c=>c.fullPath !== activeKey.value && c.removeable)
  if(firstTag) {
    removeTag(firstTag.fullPath)
    if(state.tagList.length>0) {
      toCloseOther()
    }
  }  
}

function clickTabMore (ev: any) {
  switch(ev.key) {
    case 'closeOther':
      toCloseOther()
      break;
    case 'refreshCurrent':
      emits('on-refresh', activeKey.value)
      break;
  }
}
</script>
