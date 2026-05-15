<style lang="scss" scoped>
.ATableSizeBox {
  box-sizing: border-box;
  border: none !important;
  position:relative;
  flex-shrink: 0;
}
.ATableSizeBody {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>

<template>
  <div class="ATableSizeBox" ref="wrapper-ref">
    <div class="ATableSizeBody">
      <slot :scroll="state.scroll"/>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { debounce, throttle } from 'lodash-es';
import { reactive, onBeforeUnmount, onMounted, useTemplateRef, watch, nextTick } from 'vue'
const oRoot = useTemplateRef('wrapper-ref')

let iObsv:ReturnType<typeof jUtilsBrowser.observeDomResize> | undefined

const props = defineProps<{
  updateKey: string
}>()


let iObsvHeader: ReturnType<typeof jUtilsBrowser.observeDomResize> | undefined
let iPerHeader:HTMLElement | undefined

const state = reactive({
  scroll: {
    x: '100%',
    y: undefined as string | undefined
  }
})


async function getHeader () {
  await jUtilsBase.variableHasValue.async(function () {
    console.log("还好", oRoot.value!)
    return !!oRoot.value!.getElementsByClassName('ant-table-thead')[0]
  }, 500)
}

const updateSize = debounce(async function (fromName: string, el: HTMLElement) {
  // await getHeader()
  const iHheader = el.getElementsByClassName('ant-table-thead')[0] as HTMLDivElement |undefined  
  const footer = el.getElementsByClassName('ant-pagination')[0] as HTMLDivElement |undefined  
  const headerHeight = jUtilsBase._Number(iHheader?.offsetHeight)
  let footerHeight = 0
  if(iHheader && iPerHeader !== iHheader) {
    iPerHeader = iHheader
    iObsvHeader = jUtilsBrowser.observeDomResize(iHheader, function (Ih) {
      if(Ih.offsetHeight && Ih.offsetWidth) {
        updateSize('表头', el)
      }
    }, ['width', 'height'], 200, false)
  }
  if(footer) {
    footerHeight = footer.offsetHeight
    const style = window.getComputedStyle(footer)
    footerHeight += +jUtilsBase.trim(style.marginTop).replace('px', '')
    footerHeight += +jUtilsBase.trim(style.marginBottom).replace('px', '')
  }
  state.scroll.x = '100%'
  state.scroll.y = el.offsetHeight - headerHeight - footerHeight + 'px'
  console.log("执行更新", fromName, '=>',state.scroll, el.offsetHeight, iHheader?.offsetHeight,footerHeight, footer)
}, 150,{
  leading: true
})


onMounted(function () {
  iObsv = jUtilsBrowser.observeDomResize(oRoot.value!, function (el) {
    updateSize('父容器', el)
  },['width', 'height'])
})
watch(()=>props.updateKey, function () {
  nextTick(function () {
    if(oRoot.value) {
      updateSize('数据更新', oRoot.value)
    }    
  })
  
})

onBeforeUnmount(function () {
  iObsv?.();
  iObsvHeader?.()
})


onBeforeUnmount(function () {
  updateSize.cancel()
})
</script>