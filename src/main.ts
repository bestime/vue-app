import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import "@/styles/index.scss"
import i18n from './i18n';
import { reloadRoutes } from './permission';

const notCheckPath = ['#/permission-preview', '#/login', '#/', '']
const needCheck = notCheckPath.includes(window.location.hash)
const app = createApp(App)
reloadRoutes(needCheck).then(function () {
  app.use(router)
  app.use(Antd)
  app.use(i18n);
  app.mount('#app')
})

