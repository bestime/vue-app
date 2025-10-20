<style lang="scss" scoped>
.LayoutHeader {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
  border-bottom: #ededed solid 1px;
  .toggle-menu {
    cursor: pointer;
    font-size: 20px;
    transition: 0.15s;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    &:hover{
      background-color: #eaeaea;
    }
  }
  .right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>

<template>
  <div class="LayoutHeader">
    <div type="primary" @click="toggle" class="toggle-menu">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <div class="right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{state.userName}}
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="toLogout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown class="header-dropdown">
        <GlobalOutlined class="language" />
        <template #overlay>
          <a-menu class="g-menu-01" @click="clickLanguage" :active-key="state.currentLang">
            <a-menu-item v-for="item in state.langList" :key="item.id">{{item.label}}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import i18n, { type TLocals } from '@/i18n';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  GlobalOutlined
} from '@ant-design/icons-vue';
import { apiLoginLoginResultData, apiLoginLogout } from '@/services';
import { useRouter } from 'vue-router';
import { setLanguage } from '@/utils/tools';
const router = useRouter()

const state = reactive({
  userName: '-',
  currentLang: 'zh' as TLocals,
  langList: [
    { id: 'zh', label: '中文' },
    { id: 'en', label: 'English' },
  ] as {
    id: TLocals,
    label: string
  }[]
})

const collapsed = defineModel<boolean>('collapsed',{
  required: true
})
function toggle () {
  collapsed.value = !collapsed.value;
};





function clickLanguage (ev:any) {
  const locale: TLocals = ev.key
  document.querySelector('html')!.setAttribute('lang', locale);
  i18n.global.locale.value = locale
  state.currentLang = locale
  setLanguage(locale)
}

onMounted(function () {
  state.currentLang = i18n.global.locale.value

  apiLoginLoginResultData().then(function (resp) {
    state.userName = jUtilsBase.defualtFormatter('-', resp.data.data?.user?.name)
  })
})

function toLogout () {
  apiLoginLogout().then(function () {
    router.replace({
      name: 'ROUTE_LOGIN_ROOT'
    })
  })
}
</script>