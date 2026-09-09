;<style lang="scss" scoped>
.LoadingWrapper {
}
.loading-root {
  z-index: 99999;
  background-color: rgba(255,255,255,0.9);
}
</style>

<template>
  <div class="LoadingWrapper jy-border-box jy-relative">
    <Transition name="g_trans_fade">
      <a-spin class="loading-root jy-absolute jy-inset-0 jy-flex jy-items-center jy-justify-center" :spinning="true" v-if="props.loading"/>
    </Transition>    
    <slot/>
  </div>  
</template>

<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()
</script>