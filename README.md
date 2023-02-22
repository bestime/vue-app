# 通用vue3项目模板

项目导航:
1.  [项目规范](#项目规范)
2.  [构建命令](#构建命令)
3.  [自定义环境变量](#自定义环境变量)

### 项目规范
项目采用 eslint + prettier 统一代码风格，具体配置请参考官方文档

- eslint 文档 `https://eslint.bootcss.com/docs/rules/`
- prettier 文档 `https://www.prettier.cn/docs/options.html`

### 构建命令（可根据情况自行添加）
- `npm run dev` 开发模式
- `npm run build:hash` 发布模式（hash）
- `npm run build:history` 发布模式（history）
- `lint-check` 代码质量检测
- `lint-fix` 代码质量修复

## 自定义环境变量
- `VITE_ROUTER_MODE -` 路由模式。支持 hash 和 history
- `VITE_ROUTER_BASE -` 项目baseUrl，会直接影响系统变量 BASE_URL
- 服务器01配置
  - `VITE_SERVER_01.origin` - 服务器地址
  - `VITE_SERVER_01.apiPrefix` - api前缀
  - `VITE_SERVER_01.devProxy` - 是否开启本地代理(true|false)