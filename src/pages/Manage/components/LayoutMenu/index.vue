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
import { computed, type VNode } from 'vue'
import { reactive, watch, h } from 'vue';
import { PieChartOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const {t, locale} = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      "menu": {
        "home": '首页',
        'group_01': '分组一',
        'aboutUs': '关于我们',
        'aboutOther': '关于其他（复用上组件）',
        'test': '测试',
      }
    },
    "en": {
      "menu": {
        "home": 'Home',
        'group_01': 'Group One',
        'aboutUs': 'About Us',
        'aboutOther': 'About Other',
        'test': 'Test',
      }
    },
  }
})

const router = useRouter()
const route = useRoute()

const emits = defineEmits<{
  (name: 'on-menu-update', data: IMenuItem[]): void
}>()

const props = defineProps<{
  collapsed: boolean
}>()


function getMenuList ():IMenuItem[] {
  const list:IMenuItem[] =  [
    {
      key: 'ROUTE_HOME',
      label: t('menu.home'),
      icon: () => h(DesktopOutlined),
    },
    {
      key: '2',
      label: t('menu.group_01'),
      icon: () => h(PieChartOutlined),
      children: [
        {
          key: 'ROUTE_ABOUT',
          icon: () => h(InboxOutlined),
          label: t('menu.aboutUs'),
        },
        {
          key: 'ROUTE_ABOUT_OTHER',
          icon: () => h(InboxOutlined),
          label: t('menu.aboutOther'),
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
  menuList: [] as IMenuItem[]
});

export interface IMenuItem {
  key: string
  label: string
  icon?: () => VNode
  children?: IMenuItem[],
  highlights?: IMenuItem[]
}

function onItemClick (ev:any) {
  const item:IMenuItem = ev.item.originItemValue
  if(item.key === route.name) return;  
  router.push({
    name: item.key
  })
}

const openKeys = computed(function () {
  const cName = route.name as string
  const path: IMenuItem[] = jUtilsBase.deepFindTreePath(state.menuList, function (leaf: IMenuItem) {
    return leaf.key === cName || leaf.highlights?.some(c=>c.key===cName) || false
  }, {
    id: 'key',
    children: 'children',
  })
  return path.map(c=>c.key)
})

function updateLanguage () {
  state.menuList = getMenuList()  
  emits('on-menu-update', state.menuList)
}

watch(() => locale.value, updateLanguage, {
  immediate: true
})
</script>