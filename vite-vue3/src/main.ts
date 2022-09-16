import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

console.log("环境变量", import.meta.env)

createApp(App)
  .use(router)
  .mount('#app')
