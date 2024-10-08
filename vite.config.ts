import { fileURLToPath, URL } from 'node:url'
import { vitePluginHtmlTemplate } from '@bestime/utils_build'
import { defineConfig, loadEnv, CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'

// 变量存放目录
const envDir = 'env'

// 路径转换
function getPath (folder: string) {
  return fileURLToPath(new URL(folder, import.meta.url))
}

/** node_modules包分包配置，将需要打在一起的放在同一个数据就行，会自动生成文件名 */
const chunkList = [
  ['lodash-es'],
  ['dayjs', 'axios', 'vue-router'],
  ['vue']
]

// https://vitejs.dev/config/
export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, getPath(envDir))
  const proxy: CommonServerOptions['proxy'] = {
    [`${env.VITE_HOST_01_NAME}`]: {
      target: env.VITE_HOST_01_TARGET,
      changeOrigin: true,
      rewrite: function (path) {
        const reg = new RegExp(`^${env.VITE_HOST_01_NAME}`)
        return path.replace(reg, '')
      },
    },
  }
  console.log("开发代理", proxy)
  return {
    server: {
      port: 7000,
      strictPort: true,
      open: false,
      host: '0.0.0.0',
      proxy
    },
    envDir,
    base: env.VITE_ROUTER_BASE,
    plugins: [
      vue(),
      vitePluginHtmlTemplate({
        // 可自行配置其他变量
        VITE_BUILD_TIME: new Date().getTime(),
      })
    ],
    build: {
      assetsDir: 'packed', // 被打包后的资源放在此目录下
      rollupOptions: {
        output: {
          manualChunks: chunkList.reduce(function (chunkMap, item) {
            const chunkName = item.join('_')
            chunkMap[chunkName] = item
            return chunkMap
          }, {} as Record<string, string[]>)
        }
      }
    },
    resolve: {
      alias: {
        '@': getPath('./src')
      }
    }
  }
})
