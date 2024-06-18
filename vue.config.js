const { defineConfig } = require('@vue/cli-service')
console.log("环境变量", process.env.VUE_APP_ROUTE_ROOT)
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_ROUTE_ROOT
})
