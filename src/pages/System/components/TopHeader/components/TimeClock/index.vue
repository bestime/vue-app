<style lang="scss" scoped>
.TimeClock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  
  font-family: Roboto-Bold;
  b {
    font-weight: normal;
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    line-height: 14px;
  }
  span {
    font-size: 28px;
    color: white;
    line-height: 28px;
  }
}
</style>

<template>
  <div class="TimeClock">
    <b>{{ state.title }}</b>
    <span>{{ state.subTitle }}</span>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { onUnmounted, reactive } from 'vue';
const emits = defineEmits<{
  (name: 'on-time-change', ms: number): void
}>()

const state = reactive({
  title: '-',
  subTitle: '-'
})

function updateTime () {
  const ms = new Date().getTime()
  const time = dayjs(ms)
  state.title = time.format('YYYY.MM.DD')
  state.subTitle = time.format('HH:mm:ss')
  emits('on-time-change', ms)
}

updateTime()
const timer = setInterval(updateTime, 1000)

onUnmounted(function () {
  clearInterval(timer)
})
</script>