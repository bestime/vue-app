<style lang="scss" scoped>
.NormalScreen {
  position:absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  flex-shrink: 0;  
  color:yellow;
  display: flex;
  flex-direction: column;
  background-color: var(--jsc-bg-color-1);
  :deep(.nine_size_box_body) {
    display: flex;
    flex-direction: column;    
  }
  .route-box {
    flex: 1;
  }
  .water-box{
    width: 1920px;
    height: 1080px;
    display: flex;
    flex-direction: column;
    background-color: #011036;
  }
  
}
</style>

<template>
  <div class="NormalScreen" id="normal-screen-wrapper">
    <div class="water-box">
      <template v-if="state.inited">
        <TopHeader/>
        <RouterView class="route-box"/>
      </template>
    </div>      
  </div>    
</template>

<script lang="ts" setup>
import TopHeader from './components/TopHeader/index.vue'
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { IS_DEV } from '@/utils/constant';


const state = reactive({
  inited: false,
  control: false,
  scaleMode: 'scale-stretch' as 'initial' | 'scale-stretch' | 'scale-aspect' | 'scale-aspect-scroll',
})

onMounted(function () {
  nextTick(function () {
    state.inited = true
  })
})

onBeforeUnmount(function () {

})
if(IS_DEV) {
  state.control = true
  state.scaleMode = 'initial'
}
</script>