<style lang="scss" scoped>
.Example02 {
  box-sizing: border-box;
  section {
    background-color: #e0e0e0;
    margin: 20px;
    height: 300px;
    font-size: 26px;
    font-weight: bold;
    border-radius: 8px;
  }
}
</style>

<template>
  <div class="Example02">
    <div style="width: 100px;height: 100px;background-color: red;" @mousemove="onEnter('A')" @mouseleave="onLeave('A')"></div>
    <div style="width: 100px;height: 100px;background-color: yellow;position:relative;z-index:5;top: -20px;left:20px;" @mousemove="onEnter('B')" @mouseleave="onLeave('B')"></div>
  </div>
  
</template>

<script lang="ts" setup>
import useLoading from '@/plugins-jcy/hooks/useLoading';
import { reactive, onBeforeUnmount } from 'vue'
import useDelayToggle from '@/plugins-jcy/hooks/useDelayToggle';
const dyEnter = useDelayToggle()

function onEnter (tag: string) {
  dyEnter.show(tag)
  console.log("移入", tag)
}
function onLeave (tag: string) {
  dyEnter.close(tag)
  console.log("移出", tag)
}

</script>