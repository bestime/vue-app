<style lang="scss" scoped>
.tplDemo {
  box-sizing: border-box;
}
</style>

<template>
  <div class="tplDemo">
    <a-button @click="toggleChart" type="primary">显示/隐藏报表</a-button>
    <div ref="ref-chart-box" v-if="state.showChart" style="width: 50%;height: 500px;"></div>
  </div>  
</template>

<script lang="ts" setup>
import useEcharts from '@/plugins-jcy/hooks/useEcharts'
import { reactive, onBeforeUnmount, useTemplateRef, onMounted } from 'vue'
const state = reactive({
  showChart: true
})

const iChart = useEcharts(useTemplateRef('ref-chart-box'), {
  resize: true
})
function toggleChart () {
  state.showChart = !state.showChart
}


function updateChart01 () {
  iChart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      }
    ]
  })
}

onMounted(function () {
  updateChart01()
})
</script>