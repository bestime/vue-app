import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const buildTime = dayjs(window.viteBuildTime).format('YYYY-MM-DD HH:mm:ss')
console.log(`%c 项目打包时间：${buildTime}`, 'background:pink;color:black;padding: 4px 8px 4px 0;border-radius:4px;' )

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')




