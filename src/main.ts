import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/styles/index.scss"
import i18n from './i18n';
import { reloadRoutes } from './permission';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// element-plus的样式文件通过cdn引入就行，不需要导入
import ElementPlus, { ElMessage } from 'element-plus'

const notCheckPath = ['#/permission-preview', '#/login', '#/', '']
const needCheck = notCheckPath.includes(window.location.hash)
const app = createApp(App)
app.use(i18n);
reloadRoutes(needCheck).then(function () {
  app.use(router)
  
  app.use(ElementPlus, {
    locale: zhCn,
  })  
  
  app.mount('#app')
})

