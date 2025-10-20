<style lang="scss" scoped>
.Ready {
  box-sizing: border-box;
}
</style>

<template>
  <div class="Ready">
  </div>  
</template>

<script lang="ts" setup>
import { getFirstRouteName, reloadRoutes } from '@/permission'
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

onMounted(function () {
  if(route.name === 'ROUTE_APP_ROOT') {    
    reloadRoutes().then(function () {
      const name = getFirstRouteName()
      router.replace({
        name
      })
    })
  }
})
</script>