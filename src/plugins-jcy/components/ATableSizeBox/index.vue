<style lang="scss" scoped>
.ATableSizeBox {
  border: none !important;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  visibility: hidden;
  &[data-inited="true"] {
    opacity: 1;
    pointer-events: unset;
    visibility: visible;
  }
}
</style>

<template>
  <div class="ATableSizeBox jy-border-box jy-shrink-0 jy-height-0" ref="wrapper-ref" :data-inited="state.isInited">
    <slot :scroll="state.scroll"/>
    <div class="_footerSlot">
      <slot name="footer"/>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { debounce, throttle } from 'lodash-es';
import { reactive, onBeforeUnmount, onMounted, useTemplateRef, watch, nextTick } from 'vue'
const oRoot = useTemplateRef('wrapper-ref')

let iObsv:ReturnType<typeof jUtilsBrowser.observeDomResize> | undefined
let iObsvHeader: ReturnType<typeof jUtilsBrowser.observeDomResize> | undefined
let iPerHeader:HTMLElement | undefined
let maxWrapperHeight = 0

const state = reactive({
  isInited: false,
  scroll: {
    x: undefined,
    y: undefined as string | undefined
  }
})


const updateSize = debounce(async function (fromName: string, el: HTMLElement) {
  maxWrapperHeight = el.offsetHeight
  // await getHeader()
  const iHheader = el.getElementsByClassName('ant-table-thead')[0] as HTMLDivElement |undefined 
  const footerSlot = el.getElementsByClassName('_footerSlot')[0]as HTMLDivElement |undefined  

  const iTBodyBody = el.getElementsByClassName('ant-table-tbody')[0]as HTMLDivElement |undefined  
  const headerHeight = jUtilsBase._Number(iHheader?.offsetHeight)
  let footerHeight = 0
  if(iHheader && iPerHeader !== iHheader) {
    iPerHeader = iHheader
    iObsvHeader?.()
    iObsvHeader = jUtilsBrowser.observeDomResize(iHheader, function (Ih) {
      if(Ih.offsetHeight && Ih.offsetWidth) {
        updateSize('表头', el)
      }
    }, ['width', 'height'], 200, false)
  }
  
  if(footerSlot) {
    footerHeight += footerSlot.offsetHeight
    const style = window.getComputedStyle(footerSlot)
    
    footerHeight += +jUtilsBase.trim(style.marginTop).replace('px', '')
    footerHeight += +jUtilsBase.trim(style.marginBottom).replace('px', '')
    // console.log("阿斯利康", footerSlot.offsetHeight, style.marginTop, style.marginBottom)
  }
  // footerHeight = 64

 
  
  state.scroll.y = maxWrapperHeight - headerHeight - footerHeight + 'px'


  console.log("执行更新", fromName, '=>',state.scroll, maxWrapperHeight, headerHeight,footerHeight)
  state.isInited = true
}, 150,{
  leading: true
})


onMounted(function () {
  iObsv = jUtilsBrowser.observeDomResize(oRoot.value!, function (el) {
    updateSize('父容器', el)
  },['width', 'height'])
})

onBeforeUnmount(function () {
  iObsv?.();
  iObsvHeader?.()
})


onBeforeUnmount(function () {
  updateSize.cancel()
})
</script>