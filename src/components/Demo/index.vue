<style lang="scss" scoped>
.Demo {
  box-sizing: border-box;
  margin: 20px;
  ul {
    border-top: #444 solid 1px;
  }
  li {
    padding: 10px;
    border: #444 solid 1px;
    border-top: none;
    user-select: none;
    cursor: pointer;
    &.is-selected {
      background-color: #444;
      color: white;
    }
  }
}
.rightbox {
  border: red solid 4px;
  margin: 0 0 0 20px;
}
</style>

<template>
    <div class="Demo flex items-start">
      <ul>
        <li v-for="item in demoList" :key="item.id" @click="onSelect(item.id)" :class="{'is-selected': item.id === state.activeCpId}">{{item.title}}</li>
      </ul>
      <div class="flex-1 rightbox">
        <component :is="realComponent"/>
      </div>
      
    </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, computed, defineAsyncComponent } from 'vue'

const demoList = [
  {
    id:'1',
    title: '组件-并发loading',
    component: defineAsyncComponent(function () {
      return import("@/components/Demo/components/Example01.vue")
    }) 
  },
  {
    id:'2',
    title: 'hooks-延迟消失',
    component: defineAsyncComponent(function () {
      return import("@/components/Demo/components/Example02.vue")
    }) 
  },
  {
    id:'3',
    title: 'maptalks-缩放marker',
    component: defineAsyncComponent(function () {
      return import("@/components/Demo/components/Example03.vue")
    }) 
  },
  {
    id:'4',
    title: 'maptalks-飞行marker',
    component: defineAsyncComponent(function () {
      return import("@/components/Demo/components/Example04.vue")
    }) 
  },
]

const state = reactive({
  activeCpId: getId()
})

const realComponent = computed(function () {
  return demoList.find(c=>c.id === state.activeCpId)!.component
})

function onSelect (id: string) {
  state.activeCpId = id
  saveId(id)
}

function saveId (id: string) {
  jUtilsBrowser.setStorage('DEMO-ID', id)
}

function getId () {
  return jUtilsBrowser.getStorage('DEMO-ID') || '1'
}

</script>