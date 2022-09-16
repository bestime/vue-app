// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// 变量存放目录
const envDir = 'env'

// 路径转换
function getPath (folder: string) {
  return `${process.cwd()}\\${folder}`
}


export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, getPath(envDir))
  console.log("环境变量", getPath(envDir),env)
  
  return {
    server: {
      port: 7000,
      strictPort: true,
      open: false
    },
    envDir, 
    base: env.VITE_ROUTER_BASE,
    
    build: {
      target: 'es2015',
      assetsDir: 'assets'
    },
    resolve: {
      alias: {
        '@': getPath('src')
      }
    },
    plugins: [vue()],
  }
})
