<style lang="scss" scoped>
.PermissonsPerview {
  box-sizing: border-box;
  padding: 20px;
}
</style>

<template>
  <div class="PermissonsPerview">
    <h1>重庆财务管理后台权限配置</h1>
    <a-table
      v-if="state.tableData.length"
      bordered
      rowKey="id"
      :pagination="false"
      :columns="state.columns"
      :data-source="state.tableData"
      :defaultExpandAllRows="true"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-tag color="green" v-if="record.status === '1'" >已配置</a-tag>
          <a-tag color="red" v-if="record.status === '0'" >未配置</a-tag>
        </template>
      </template>
      
    </a-table>
  </div>  
</template>

<script lang="ts" setup>
import { requestLocalFile } from '@/request';
import { reactive, onBeforeUnmount } from 'vue'
import type { TableColumn } from 'ant-design-vue'

const state = reactive({
  columns: [
    {
      title: '权限名称',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '权限ID',
      dataIndex: 'permissiionId',
      key: 'permissiionId',
      // width: '150px',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      // width: '100px',
      align: 'center'
    },
    
  ] as IMyAntdTableColumnItem[],
  tableData: [] as any[]
})

requestLocalFile('/static/json/mock-permission.json').then(function (res: any) {
  const list: any[] = jUtilsBase._Array(res.data.data)
  jUtilsBase.forEachTree(list, function (item) {
    item.id = jUtilsBase.uuid()
  })
  state.tableData = list
})

</script>