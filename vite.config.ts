import { fileURLToPath, URL } from 'node:url';
import path from 'path';
// @ts-ignore
import rollupPluginHtmlTemplate from './build-utils/rollup-plugin-html-template.cjs';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import dayjs from 'dayjs';

// 变量存放目录
const envDir = 'env';

// 路径转换
function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath);
}

// https://vitejs.dev/config/
export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, resolve(envDir));
  console.log('环境变量', resolve(envDir), env);

  return {
    server: {
      host: '0.0.0.0',
      strictPort: true,
      open: false,
      port: 1314,
      proxy: {
        '^/(VITE_SERVER_01)': {
          ws: true,
          target: env['VITE_SERVER_01.origin'],
          changeOrigin: true,
          rewrite: function (url) {
            return url.replace(/^\/(VITE_SERVER_01)/, '');
          },
        },
      },
    },
    envDir,
    base: env.VITE_ROUTER_BASE,
    plugins: [
      rollupPluginHtmlTemplate({
        author: 'bestime',
        buildTimestamp: +new Date(),
        buildDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'modules',
      assetsDir: 'build',
      rollupOptions: {
        manualChunks: {
          'vue-group': ['vue', 'vue-router']
        }
      },
    },
  };
});
