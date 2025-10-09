<style lang="scss" scoped>
.Test {
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  margin: 20px;
}
</style>

<template>
  <div class="Test">
    <a-table :dataSource="state.testData" :columns="tableColumns" />
  </div>  
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import { apiThreemeetingArchiveGetThreeMeetingArchiveList } from '@/services'

defineOptions({
  name: 'ROUTE_TEST'
})



const state = reactive({
  testData: [] as any[]
})

const tableColumns = [
  {
    title: '标题',
    dataIndex: 'meetingName',
    key: 'meetingName',
  },
  {
    title: '内容',
    dataIndex: 'mettingTopic',
    key: 'mettingTopic',
  },
]

apiThreemeetingArchiveGetThreeMeetingArchiveList({
  data: {
    dept: '5',
    type: '1'
  }
}).then(function (res) {
  state.testData = res.data.data
})



onMounted(function () {
  console.log("测试页加载了")
})
</script>