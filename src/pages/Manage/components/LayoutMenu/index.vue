<style lang="scss" scoped>
.LayoutMenu {
  box-sizing: border-box;
  width: 220px;
  flex-shrink: 0;
  background-color: #001529;
  align-self: stretch;
  transition: 0.3s;
  padding: 0;
  &[is-fold=true] {
    width: 52px;
    .logo-box {
      padding: 5px 0;
      justify-content: center;
      img {
        width: 30px;
        height: 30px;
        margin: 0;
      }
      span {
        display: none;
      }
    }
    :deep(.ant-menu) {
      width: auto !important;
      .ant-menu-item {
        width: 40px !important;
        flex-shrink: 0;
        padding:0 12px !important;
        text-align: center;
      }
      .ant-menu-submenu-title {
        padding:0 12px !important;
      }
    }
  }
  :deep(){
    .ant-menu-item {
      box-sizing: border-box;
      width: auto !important;
    }
    
  }
}
.logo-box {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: #14395b solid 1px;
  img {
    width: 40px;
    height: 40px;
    margin: 0 10px 0 20px;
    border-radius: 50%;
    border: white solid 2px;
    transition: 0.3s;
  }
  span {
    font-size: 16px;
    line-height: normal;
    color: white;
  }
}
</style>

<template>
  <div class="LayoutMenu " :is-fold="props.collapsed">
    <div class="logo-box">
      <img src="/static/images/logo.png"/>
      <span class="g-keep-all">{{ t('global.systemName') }}</span>
    </div>
    <a-menu
      :openKeys="props.collapsed ? undefined : openKeys"
      :selectedKeys="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="props.collapsed"
      :items="state.menuList"
      @click="onItemClick"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
import {  computed, onBeforeUnmount, onMounted, type VNode } from 'vue'
import { reactive, watch, h } from 'vue';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  TransactionOutlined,
} from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import type { ITabItem } from '../LayoutTabs/index.vue';
import { clone, cloneDeep } from 'lodash-es';
import { useI18n } from 'vue-i18n';
const {t, locale} = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      "menu": {
        "home": '首页',
        'group_01': '分组一',
        'aboutUs': '关于我们',
        'test': '测试',
      }
    },
    "en": {
      "menu": {
        "home": 'Home',
        'group_01': 'Group One',
        'aboutUs': 'About Us',
        'test': 'Test',
      }
    },
  }
})

const router = useRouter()
const route = useRoute()


const emits = defineEmits<{
  (name: 'on-tab-change', data: ITabItem[], newKey?: string): void
  (name: 'on-menu-update', data: IMenuItem[]): void
}>()

const props = defineProps<{
  clearId: number
  collapsed: boolean
}>()




function getMenuList ():IMenuItem[] {
  const list:IMenuItem[] =  [
    {
      key: 'ROUTE_HOME',
      label: t('menu.home'),
      icon: () => h(DesktopOutlined),
      removeable: false
    },
    {
      key: 'ROUTE_GROUP_01',
      label: t('menu.group_01'),
      icon: () => h(PieChartOutlined),
      children: [
        {
          key: 'ROUTE_ABOUT',
          icon: () => h(InboxOutlined),
          label: t('menu.aboutUs'),
        },
        {
          key: 'ROUTE_TEST',
          icon: () => h(AppstoreOutlined),
          label: t('menu.test'),
          highlights: [
            {
              key: 'ROUTE_TEST_DETAIL',
              label: '详情',
            }
          ]
        },
      ]
    },
  ]
  const allRoutes = router.getRoutes()

  return jUtilsBase.treeFilter(list, function (item) {
    return allRoutes.some(c=>c.name === item.key)
  })
}

const state = reactive({
  openTags: [] as ITabItem[],
  menuList: [] as IMenuItem[]
});


export interface IMenuItem {
  key: string,
  label: string
  icon?: () => VNode
  removeable?: boolean
  children?: IMenuItem[],
  highlights?: IMenuItem[]
}

function onItemClick (ev:any) {
  const item:IMenuItem = ev.item.originItemValue
  if(item.key === route.name) return;  
  setCurrentMenu(item, true)
}


function setCurrentMenu (item: IMenuItem, reload: boolean) {
  const to = router.resolve({
    name: item.key,
    query: {
      id: 'test'
    }
  })
  router.push(to)
  if(!state.openTags.some(c=>c.uid === to.fullPath)) {
    state.openTags.push({
      routeName: item.key,
      uid: to.fullPath,
      label: item.label,
      removeable: item.removeable !== false
    })
  }
  const nk = reload ? to.fullPath : undefined
  emits('on-tab-change', cloneDeep(state.openTags), nk)
}

function removeTag (key: string) {  
  const index = state.openTags.findIndex(c=>c.uid === key)
  let toIdx = index
  if(toIdx > 0) {
    toIdx--
  } else if(toIdx<state.openTags.length) {
    toIdx++
  }

  const toKey = state.openTags[toIdx]?.uid
  state.openTags.splice(index, 1)
  emits('on-tab-change', cloneDeep(state.openTags), undefined)
  
  if(state.openTags.length === 0) {
    setCurrentMenu(state.menuList[0]!,  true)
  } else if(route.fullPath === key && toKey) {
    const routeName = state.openTags.find(c=>c.uid === toKey)?.routeName
    const to = jUtilsBase.deepFindItem(state.menuList, function (c) {
      return c.key === routeName
    })!
    setCurrentMenu(to, true)
  }
}


const openKeys = computed(function () {
  const currentRouteName = route.name as string
  const path: IMenuItem[] = jUtilsBase.deepFindTreePath(state.menuList, function (leaf: IMenuItem) {
    return leaf.key === currentRouteName || leaf.highlights?.some(c=>c.key===currentRouteName) || false
  }, {
    id: 'key',
    children: 'children',
  })
  return path.map(c=>c.key)
})

function init () {
  const currentRouteName = route.name as string
  const currentItem = jUtilsBase.deepFindItem(state.menuList,function (item) {
    return item.key === currentRouteName || item.highlights?.some(c=>c.key === currentRouteName) || false
  })
  console.log("currentItem", currentItem)
  if(currentItem) {
    setCurrentMenu(currentItem, false)
  }
}

defineExpose({
  removeTag
})

onMounted(function () {
  init()
})


function updateLanguage () {
  state.menuList = getMenuList()
  
  state.openTags.forEach(function (tag) {
    const iMenu = jUtilsBase.deepFindItem(state.menuList, function (c) {
      return c.key === tag.routeName
    })!
    tag.label = iMenu.label
  })
  emits('on-tab-change', cloneDeep(state.openTags), '')
  emits('on-menu-update', state.menuList)
}

watch(() => locale.value, updateLanguage, {
  immediate: true
})


</script>