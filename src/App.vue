<template>
  <div id="app">
    <img alt="Vue logo" :src="icon_01">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { serverURL } from '@/request'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      icon_01: serverURL('@local', '/static/images/logo.png')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
