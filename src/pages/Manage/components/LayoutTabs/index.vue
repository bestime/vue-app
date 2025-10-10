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
  <a-tabs class="LayoutTabs" :activeKey="activeKey" hide-add type="editable-card" @edit="removeTag" @change="onTabClick">
    <template #leftExtra>
      <span style="padding: 0 0 0 20px;"></span>
    </template>
    <a-tab-pane
      v-for="pane in props.tags"
      :key="pane.uid"
      :closable="pane.removeable && props.tags.length>1"
    >
      <template #tab>
        <span>{{ pane.label }}</span>
        <ReloadOutlined class="tab-reload-icon" v-if="route.fullPath === pane.uid" @click="toRefresh(pane.uid)"/>
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

import { reactive, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {
  ReloadOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
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
  routeName: string,
  uid: string,
  label: string,
  removeable: boolean
}

const activeKey = computed(function () {
  return route.fullPath
})

const props = defineProps<{
  tags: ITabItem[]
}>()


const emits = defineEmits<{
  (name: 'on-refresh', key: string): void
  (name: 'on-cleared'): void
  (name: 'on-remove', key: string): void
}>()

function toRefresh (key: string) {  
  emits('on-refresh', key)
}

function onTabClick (path: any) {
  const to = router.resolve(path)
  router.push(to)
}

function removeTag (uid: any) {
  emits('on-remove', uid)
}

function toCloseOther () {
  props.tags.forEach(function (item) {
    if(item.removeable && item.uid !== activeKey.value) {
      removeTag(item.uid)
    }
  })
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
