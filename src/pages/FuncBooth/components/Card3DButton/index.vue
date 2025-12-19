<style lang="scss" scoped>
.Card3DButton {
  width: 200px;
  height: 380px;
  font-size: 30px;
  color: white;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  flex-direction: column;
  border-radius: 8px;
  background-image: url("/static/images/2025-03-17/card-normal.png");
  background-size: 100% 100%;
  transition-timing-function: cubic-bezier(0.915, 0.020, 0.370, 1.040);
  &:hover {
    background-image: url(("/static/images/2025-03-17/card-selected.png"));
  }
  &[is-disabled="true"] {
    opacity: 0.3 !important;
    pointer-events: none;
  }
  &[is-anend="true"] {
    transition-duration: 0.3s !important;
    transition-timing-function: ease-in-out;
  }
  img {
    width: 100px;
    height: 100px;
    margin: 70px 0 30px 0;
    pointer-events: none;
  }
  span {
    width: 160px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    flex-shrink: 0;
    font-size: 24px;
    color: white;
    background: linear-gradient(90deg, rgba(0, 80, 161, 0.00) 0%, #0050A1 50%, rgba(0, 80, 161, 0.00) 100%);
    
  }
}
</style>

<template>
  <div class="Card3DButton" :is-disabled="!props.item.enabled" :is-anend="state.stopAnimate" :style="style" @mouseenter="onMouseIn" @mouseleave="onMouseOut" @click="jumpPage(item)">
    <img :src="props.item.iconUrl"/>
    <span>{{props.item.name}}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { computed, nextTick, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
export interface ICard3dItem {
  enabled: boolean
  iconUrl: string,
  routeName: string,
  name: string,
  translateZ: string,
  translateX: [string, string],
  rotateY: string
  newWindow?: boolean
}
const props = defineProps<{
  item: ICard3dItem
}>()

const state = reactive({
  isHover: false,
  inited: false,
  stopAnimate: false
})
let timer_01: any

function jumpPage (item: ICard3dItem) {
  if(item.newWindow) {
    const gg: any = router.getRoutes().find(c=>c.name === item.routeName)
    const myLocation = router.resolve(gg)
    window.open(myLocation.href, '_blank')
    return;
  }
  
  
  router.replace({
    name: item.routeName
  })
}

onMounted(function () {
  clearTimeout(timer_01)
  timer_01 = setTimeout(function () {
    state.inited = true
  }, 100)
})
onUnmounted(function () {
  clearTimeout(timer_01)
})


function onMouseIn () {
  state.stopAnimate = true
  nextTick(function () {
    state.isHover = true
  })
}
function onMouseOut () {
  state.isHover = false
}

const style = computed(function () {
  let scale = 0
  let x = props.item.translateX[0]
  let y = '300px'
  let rotateX = '-90deg'
  let opacity = 0
  
  
  if(state.isHover) {
    scale = 1.05
    x = props.item.translateX[1]
    y = '-15px'
    rotateX = '0deg'
    opacity = 1
  } else if(state.inited) {
    x = props.item.translateX[1]
    y = '0'
    rotateX = '0deg'
    opacity = 1
    scale = 1
  }
  return {
    opacity,    
    transform: `perspective(600px) skewX(${rotateX}) rotateY(${props.item.rotateY}) translate3d(${x},${y},${props.item.translateZ}) scale(${scale})`
  }
})
</script>