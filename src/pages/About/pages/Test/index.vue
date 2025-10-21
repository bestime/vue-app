<style lang="scss" scoped>
.Test {
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  margin: 20px;
}
</style>

<template>
  <LoadingWrapper class="Test" :loading="state.loading">
    <a-button @click="toDeta">跳转到测试页详情，菜单保持高亮</a-button>
    <ATableSizeBox class="table-panel"  style="height: 500px" :updateKey="state.tableUpdateId">
      <template #default="{ scroll }">
        <a-table :scroll="scroll" :dataSource="state.testData" :columns="state.tableColumns" />
      </template>      
    </ATableSizeBox>    
  </LoadingWrapper>
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted, watch } from 'vue'
import { apiThreemeetingArchiveGetThreeMeetingArchiveList } from '@/services'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
import ATableSizeBox from '@/components/ATableSizeBox/index.vue'

const router = useRouter()

const { t, locale } = useI18n({
  useScope: 'global',
  messages: {  
    "zh": {
      'title': '标题',
      'content': '内容',
    },
    "en": {
      'title': 'Title',
      'content': 'Content',
    },
  }
})
defineOptions({
  name: 'ROUTE_TEST'
})

function toDeta () {
  router.push({
    name: 'ROUTE_TEST_DETAIL'
  })
}



const state = reactive({
  tableUpdateId: '',
  loading: false,
  tableColumns: [] as any[],
  testData: [] as any[]
})

function getColumns () {
  return [
    {
      title: t('title'),
      dataIndex: 'meetingName',
      key: 'meetingName',
    },
    {
      title: t('content'),
      dataIndex: 'mettingTopic',
      key: 'mettingTopic',
    },
  ]
}





async function updateList () {
  state.loading = true
  apiThreemeetingArchiveGetThreeMeetingArchiveList({
    data: {
      dept: '5',
      type: '1'
    }
  }).then(function (res) {
    state.testData = res.data.data
    state.tableUpdateId = jUtilsBase.uuid()
  }).finally(function () {
    state.loading = false
  })
}


watch(() => locale.value, function () {
  state.tableColumns = getColumns()
}, {
  immediate: true
})

onMounted(function () {
  console.log("测试页加载了")
  updateList()
})
</script>

