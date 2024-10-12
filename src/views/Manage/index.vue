<style lang="scss" scoped>
.Manage {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
}
.router-content {
  flex: 1;
  align-self: stretch;
}

.left-menu {
  background-color: #464646;
  width: 300px;
  flex-shrink: 0;
  align-self: stretch;  
}
.no-menus {
  width: 300px;
  background-color: #464646;
  font-size: 20px;
  color: #b1b1b1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

:deep(.el-menu) {
  overflow: auto;
  overflow-x: hidden;
  &.el-menu--inline {
    background-color: #313131;
  }
}

.el-menu-item.is-active {
  color: white;
  background-color: #d7722a;
}


</style>

<template>
  <div class="Manage">
    <!-- <div v-if="filterList.length===0" class="no-menus">
      <span>暂无可访问的菜单</span>
      <span>请配置对应权限</span>
    </div> -->
    <el-menu
      background-color="#545c64"
      class="left-menu"
      :default-active="defaultActiveId"
      text-color="#fff"
    >
      <el-sub-menu :index="item.id" v-for="item in filterList" :key="item.id">
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="cd.id" v-for="cd in item.children" :key="cd.id" @click="onSelect(cd)">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>{{cd.title}}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    
    <div class="router-content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TrendCharts, DataLine } from '@element-plus/icons-vue'
import { filterMenu } from './lib'
import type { IMenItem } from './lib'
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { requestLocalFile } from '@/request';


const router = useRouter()
const route = useRoute()
const list = ref<IMenItem[]>([])
const filterList = computed(function () {
  return filterMenu(list.value, router.getRoutes().map(c=>c.name as string))
})

const defaultActiveId = computed(function () {
  let routeId: string | undefined;
  route.matched.toReversed().find(function (c) {
    return jUtilsBase.deepFindItem(list.value, function (d) {
      const isEq = c.name === d.routeName
      if(isEq) {
        routeId = d.id
      }
      return isEq
    })
  })
  return routeId
})

function onSelect (item: IMenItem) {
  // console.log("item.routeName",item.routeName)
  if(!item.routeName) return;
  router.push({
    name: item.routeName
  })
}

onMounted(function () {
  requestLocalFile<IMenItem[]>('/static/json/manage-routes.json').then(function (res) {
    list.value = res.data
  })
})
</script>