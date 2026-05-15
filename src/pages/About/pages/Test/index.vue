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
    <ATableSizeBox class="table-panel"  style="height: 500px" :updateKey="state.tableUpdateId">
      <template #default="{ scroll }">
        <a-table :scroll="scroll" :dataSource="state.testData" :columns="state.tableColumns" :pagination="false">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operate'">
              <button @click="toShowDetail(record)">查看详情</button>
            </template>
          </template>
        </a-table>
      </template>      
    </ATableSizeBox>
    <AntdPagerWidget :data="pager.state" @on-change="onPageChange"/>
  </LoadingWrapper>
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted, watch } from 'vue'
import { apiThreemeetingArchiveGetThreeMeetingArchiveList } from '@/services'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LoadingWrapper from '@/plugins-jcy/components/LoadingWrapper/index.vue'
import ATableSizeBox from '@/plugins-jcy/components/ATableSizeBox/index.vue'
import AntdPagerWidget from '@/plugins-jcy/components/AntdPagerWidget/index.vue'
import usePager from '@/plugins-jcy/hooks/usePager'

const router = useRouter()

const pager = usePager([5, 36])
pager.set(5, 100)

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



function onPageChange (page: number, size: number) {
  console.log("分页变化", page, size)
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
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
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


function toShowDetail (data: any) {
  router.push({
    name: 'ROUTE_TEST_DETAIL',
    query: {
      id: data.id
    }
  })
}

watch(() => locale.value, function () {
  state.tableColumns = getColumns()
}, {
  immediate: true
})

onMounted(function () {
  console.log("测试页-加载")
  updateList()
})

onBeforeUnmount(function () {
  console.log("测试页-卸载")
})
</script>

