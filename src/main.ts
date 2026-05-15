import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import "@/styles/global.scss"
import i18n from './i18n';
import { reloadRoutes } from './permission';
import { requestLocalFile } from './request';
import { decodeMessage, encodeMessage } from './utils/tools';

const notCheckPath = ['#/permission-preview', '#/login']
const needCheck = notCheckPath.includes(window.location.hash)
const app = createApp(App)



reloadRoutes(needCheck).then(function () {
  app.use(router)
  app.use(Antd)
  app.use(i18n);
  app.mount('#app')

  console.log("加密：第1个", decodeMessage(encodeMessage('张三')))
  console.log("加密：第2个", decodeMessage(encodeMessage('李四')))
  console.log("加密：第3个", decodeMessage(encodeMessage('王五')))
})

