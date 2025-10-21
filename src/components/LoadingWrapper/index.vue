;<style lang="scss" scoped>
.LoadingWrapper {
  box-sizing: border-box;
  position:relative;
}
.loading-root {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  background-color: rgba(255,255,255,0.9);
}
</style>

<template>
  <div class="LoadingWrapper">
    <a-spin class="loading-root" :spinning="props.loading" v-if="props.loading"/>
    <slot/>
  </div>  
</template>

<script lang="ts" setup>
import { startCase } from 'lodash-es';
import { reactive, onBeforeUnmount } from 'vue'
const props = defineProps<{
  loading: boolean
}>()
</script>