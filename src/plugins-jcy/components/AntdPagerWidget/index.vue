<style lang="scss" scoped>
.AntdPagerWidget {
  margin: 20px 0 0 0;
}
</style>

<template>
  <div class="AntdPagerWidget jy-flex jy-items-center jy-justify-end jy-border-box">
    <a-pagination
      v-model:current="props.data.current"
      v-model:page-size="props.data.size"
      :page-size-options="sizesStrs"
      :total="props.data.total"
      show-size-changer
      @change="onPageChange"
      :show-total="showTotal"
    >
    </a-pagination>
  </div> 
</template>

<script lang="ts" setup>
import { reactive, onBeforeUnmount, computed } from 'vue'
import useAntdPager from '@/plugins-jcy/hooks/usePager'
interface Props {
  data: ReturnType<typeof useAntdPager>['state']
}
const props = withDefaults(defineProps<Props>(), {});

let timer01: any
const emits = defineEmits<{
  (name: 'on-change', page: number, size: number): void
}>()
function onPageChange (page: number, size:number) {
  props.data.current = page
  props.data.size = size
  commitEmitChange()
}

const sizesStrs = computed(function () {
  // antd中必须用字符串才显示正常，官方文档有问题
  return props.data.sizes.map(c=>c.toString())
})



function commitEmitChange () {
  clearTimeout(timer01)
  timer01 = setTimeout(function () {
    emits('on-change', props.data.current, props.data.size)
  }, 300)
}

function showTotal (v: number) {
  return `共${v}条`
}

onBeforeUnmount(function () {
  clearTimeout(timer01)
})
</script>