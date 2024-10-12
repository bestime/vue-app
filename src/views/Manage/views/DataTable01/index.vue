<style lang="scss" scoped>
.DataTable01 {
  padding: 40px;
  background-color: white;

}
</style>

<template>
  <div class="DataTable01">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="科目编号"/>
      <el-table-column prop="name" label="科目名称"/>
      <el-table-column prop="address" label="期初余额" />
      <el-table-column prop="address" label="本期借方" />
      <el-table-column prop="address" label="本期贷方" />
      <el-table-column prop="address" label="期末余额" />
    </el-table>
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableData = ref([])
</script>