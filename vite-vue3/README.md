# [前端]人工影响天气智能安全防护系统

注意：图片、字体、json等静态资源，不要放在`scr`下任何目录，请放在`public/static`文件夹

项目导航:
1.  [项目规范](https://github.com/bestime/code-standard)
2.  [构建命令](#构建命令)
3.  [项目配置](#项目配置)
4.  [自定义环境变量](#自定义环境变量)

## 项目配置
- 构建工具采用 vite
- 前端框架采用 vue3

## 构建命令
- `npm run dev` 开发模式
- `npm run build:hash` 发布模式（hash）
- `npm run build:history` 发布模式（history）
- `npm run preview` 预览

## 自定义环境变量
- VITE_ROUTER_MODE - 路由模式。支持 hash 和 history
- VITE_ROUTER_BASE - 项目baseUrl，会直接影响系统变量 BASE_URL

