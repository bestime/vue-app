<style lang="scss" scoped>
.HeaderButton {
  font-size: 18px;
  color:#7CA0C8;
  width: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  cursor: pointer;
  outline: none;
  gap: 10px;
  &::after{
    transform: scale(0);
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background-color: #27B1FF;
    transition: 0.3s ease-out;
  }
  &:hover {
    &::after{
      transform: scale(1);
    }
  }
  &.selected {
    color: #fff;    
    background: linear-gradient(180deg, rgba(5, 125, 253, 0.10) 0%, rgba(5, 125, 253, 0.50) 100%);
    &::after{
      transform: scale(1);
    }
  }
}

.more-wrapper{
  padding: 10px;
  margin: 0;
  list-style: none;
  li {
    font-size: 16px;
    color:#F9F9F999;
    line-height: 38px;
    width: 132px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    border-radius: 2px;
    transition: 0.15s;
    &:hover {
      background-color: #113980;
    }
    &[is-selected="true"] {
      background-color: #096fff;
      color: white;
    }
  }
}
</style>

<template>
  <el-dropdown :teleported="false" placement="bottom" popper-class="g-el-popper01">
    <div class="HeaderButton" :class="{selected: isSelected(item.routeName)}" @click="navigateTo(item)">
      <span>{{props.item.label}}</span>
      <el-icon v-if="hasDropdown"><ArrowDownBold /></el-icon>
    </div>
    <template #dropdown>
      <ul class="more-wrapper" v-if="hasDropdown">
        <li v-for="cd in item.children" :key="item.routeName" :is-selected="isSelected(cd.routeName)" @click="navigateTo(cd)">{{cd.label}}</li>
      </ul>
    </template>
  </el-dropdown>
  
</template>

<script lang="ts" setup>
import { serverURL } from '@/request';

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowDownBold,
} from '@element-plus/icons-vue'
import type { IMenuItem} from '@/pages/System/components/TopHeader/lib'
import { isActiveMenu } from '@/utils/tools';


const router = useRouter()

const route = useRoute()



interface IProps {
  
  data: IMenuItem[]
  item: IMenuItem
}


const props = defineProps<IProps>()

function isSelected (itemName: string) {
  return isActiveMenu(props.data, route.name as string, itemName)
}



const hasDropdown = computed(function () {
  return props.item.children && props.item.children.length > 0 ? true : false
})


function navigateTo (item: IMenuItem) {
  router.push({
    name: item.routeName
  })
}
</script>