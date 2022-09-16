<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()


function jumpTo (routeName: string) {
  router.push({
    name: routeName
  })
}


</script>

<template>
  <div class="nihao">
    <ul>
      <li @click="jumpTo('HOME')">主页</li>
      <ul>
        <li @click="jumpTo('LiSi')">子页</li>
      </ul>
    </ul>
  </div>
  <RouterView/>
</template>

<style scoped lang="scss">
.nihao {
  border: red solid 2px;
  user-select: none;
  li {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
