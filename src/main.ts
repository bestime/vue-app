import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'

const app = createApp(App)

app.use(router)


const buildTime = dayjs(window.viteBuildTime).format('YYYY-MM-DD HH:mm:ss')
console.log("项目打包时间222", buildTime)
app.mount('#app')
