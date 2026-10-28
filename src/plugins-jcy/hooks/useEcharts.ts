import EchartsProxy, { type IConfig } from '@/plugins-jcy/EchartsProxy'
import { onBeforeMount, onBeforeUnmount, onMounted, watch, type ShallowRef } from "vue";
import type { ECharts, EChartsOption } from 'echarts'

interface ISetting {
  onInstenceChange?: (instence: ECharts) => void
}

/**
 * 简化echarts操作
 * 1. 不再关心dom是否挂载
 * 2. 不需要手动销毁实例
 * @param el useTemplateRef 对象（当然ref也是可以的）。是一个div
 * @param config 其他配置
 * @returns 
 */
export default function useEcharts (el: Readonly<ShallowRef<HTMLDivElement | null>>, config?:IConfig, setting?:ISetting) {
  const iChartProxy = new EchartsProxy(config)
  
  
  watch(() => el.value, function () {
    if(el.value) {
      const i = iChartProxy.setDom(el.value)
      if(setting?.onInstenceChange) {
        setting.onInstenceChange(i)
      }
    } else {
      iChartProxy.removeDom()
    }
  }, {
    immediate: true
  })

  onBeforeUnmount(function () {
    iChartProxy.dispose()
  })


  return {
    setOption: function (data:EChartsOption) {
      iChartProxy.setOption(data)
    },
  }
}