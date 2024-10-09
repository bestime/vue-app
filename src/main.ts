import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'

const app = createApp(App)

app.use(router)


const buildTime = dayjs(window.viteBuildTime).format('YYYY-MM-DD HH:mm:ss')
console.log(`%c 项目打包时间：${buildTime}`, 'background:pink;color:black;padding: 4px 8px 4px 0;border-radius:4px;' )
app.mount('#app')
