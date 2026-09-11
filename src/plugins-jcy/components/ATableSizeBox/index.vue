<style lang="scss" scoped>
.ATableSizeBox {
  border: none !important;
  pointer-events: none;
  transition: 0.3s;
  &[data-inited="true"] {
    pointer-events: unset;
  }
}


.ATableSizeBoxBody {
  background: white;
  border-radius: 6px;
}
</style>

<template>
  <div class="ATableSizeBox jy-border-box jy-shrink-0 jy-height-0 jy-overflow-hidden" ref="wrapper-ref" :data-inited="state.isInited">
    <LoadingWrapper class="ATableSizeBoxBody" :loading="props.loading" :style="cmpData.bodyStyle">
      <div v-if="slots.header" class="ATableSizeBoxHeader jy-reset jy-overflow-hidden">
        <slot name="header"/>
      </div>
      <slot :scroll="state.scroll"/>
      <div v-if="slots.footer" class="ATableSizeBoxFooter jy-reset jy-overflow-hidden">
        <slot name="footer"/>
      </div>
    </LoadingWrapper>
  </div>  
</template>

<script lang="ts" setup>
import { debounce, throttle } from 'lodash-es';
import { reactive, onBeforeUnmount, onMounted, useTemplateRef, watch, nextTick, useSlots, computed, onActivated, onDeactivated } from 'vue'
import LoadingWrapper from '@/plugins-jcy/components/LoadingWrapper/index.vue'
interface IProps {
  padding?: number
  loading?: boolean
}

/**
 * 表格主体：只能是表格a-table，且不能有padding、border、margin，并需要禁用表格自带的分页器
*/
const props = withDefaults(defineProps<IProps>(), {
  padding: 0
})



const oRoot = useTemplateRef('wrapper-ref')

const slots = useSlots()

const cmpData = computed(function () {
  return {
    bodyStyle: {
      padding: props.padding + 'px'
    }
  }
})

let iObsv:ReturnType<typeof jUtilsBrowser.observeDomResize> | undefined
let maxWrapperHeight = 0
let updateId = jUtilsBase.getUniqSessionId()

const state = reactive({
  isInited: false,
  scroll: {
    x: undefined,
    y: undefined as string | undefined
  }
})

const updateSize = debounce(async function (fromName: string, el: HTMLElement) {
  maxWrapperHeight = el.offsetHeight
  
  updateId = jUtilsBase.getUniqSessionId()
  const flag = updateId
  await jUtilsBase.variableHasValue.async(function () {
    return !!el.getElementsByClassName('ant-table-thead')[0]
  }, 30)
  if(updateId !== flag) return;
  const iHheader = el.getElementsByClassName('ant-table-thead')[0] as HTMLDivElement |undefined 
  const iHeaderSlot = el.getElementsByClassName('ATableSizeBoxHeader')[0]as HTMLDivElement |undefined  
  const iFooterSlot = el.getElementsByClassName('ATableSizeBoxFooter')[0]as HTMLDivElement |undefined  

  
  const headerHeight = jUtilsBase._Number(iHheader?.offsetHeight)
  const footerHeight = jUtilsBase._Number(iFooterSlot?.offsetHeight)
  const slotHeaderHeight = jUtilsBase._Number(iHeaderSlot?.offsetHeight)
  state.scroll.y = maxWrapperHeight - props.padding*2 - headerHeight - footerHeight - slotHeaderHeight + 'px'


  // console.log("执行更新", fromName, '=>',state.scroll, maxWrapperHeight, headerHeight,slotHeaderHeight,footerHeight)
  state.isInited = true
}, 60,{
  leading: true
})


function _Mounted () {
  jUtilsBrowser.nextTick(nextTick).then(function () {
    iObsv = jUtilsBrowser.observeDomResize(oRoot.value!, function (el) {
      updateSize.cancel()
      updateSize('父容器', el)
    },['width', 'height'])  
  })
}

function _unMount () {
  iObsv?.();
  updateSize.cancel()
}

onActivated(function () {
  _Mounted()
})

onMounted(function () {  
  _Mounted()
})

onBeforeUnmount(function () {
  _unMount()
})

onDeactivated(function () {
  _unMount()
})
</script>