<style lang="scss" scoped>
.LayoutBreadcrumb {
  box-sizing: border-box;
  background-color: white;
  padding: 0 20px 15px 20px;
  list-style: none;
  margin: 0;
  user-select: none;
  li {
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 14px;
    color: #808080;
    b {
      font-weight: normal;
      margin: 0 2px;
    }
    span {
      padding: 0 8px;
      transition: 0.3s;
      border-radius: 4px;
      line-height: 26px;
      display: inline-block;
    }
    &:nth-last-of-type(1) {
      color: #000;
    }
    &:not(:nth-last-of-type(1)).is-route {
      cursor: pointer;
      &:hover {
        span {
          background-color: #eee;
        }
      }
    }
  }
}
</style>

<template>
  <ul class="LayoutBreadcrumb">
    <li v-for="(item, index) in breadList" @click="toJump(item)" :class="{'is-route': item.isRoute}">
      <span>{{item.label}}</span>
      <b v-if="index<breadList.length-1">/</b>
    </li>
  </ul>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, computed } from 'vue'
import { type IMenuItem } from '../LayoutMenu/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { cloneDeep } from 'lodash-es';



interface IProps {
  meunTree: IMenuItem[]
}
const props = defineProps<IProps>()
const route = useRoute()
const router = useRouter()

type TBread = IMenuItem & {
  isRoute: boolean
}

const breadList = computed<TBread[]>(function () {
  const allRoutes = router.getRoutes()
  const currentRouteName = route.name as string
  let hightItem:IMenuItem|undefined;

  const list:IMenuItem[] = jUtilsBase.deepFindTreePath(props.meunTree, function (item:IMenuItem) {
    const inTree = item.key === currentRouteName
    const inHight = item.highlights?.find(c=>c.key===currentRouteName)
    if(!inTree && !hightItem && inHight) {
      hightItem = inHight
    }
    return  inTree || !!inHight || false
  }, {
    id: 'key',
    children: 'children',
  })

  if(hightItem) {
    list.push(hightItem)
  }
  

  const result:TBread[] = cloneDeep(list) as TBread[]
  result.forEach(function (item) {
    // @ts-ignore
    item.isRoute = allRoutes.some(c=>c.name===item.key)
  })

  return result
})

function toJump (item: TBread) {
  if(item.key === route.name || !item.isRoute) return
  router.push({
    name: item.key
  })
}

</script>