const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 引入内置path模块 【note: 修改配置文件一定要重启】
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir) // path内置模块，可以把后面的参数拼接形成一个新地址
}

module.exports = {
  lintOnSave: false, // 关闭=>保存时语法检查
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，@取代src
      .set('@c', resolve('src/components')) // @c取代src/components
      .set('@a', resolve('src/api')) // @a取代src/api
      .set('@s', resolve('src/assets')) // @s取代src/assets
  },
  // todo: 反向代理【可以配置多个】
  // devServer: {
  //   '/api': { // api别名
  //     target: 'https://m.maoyan.com', // 代理的地址
  //     changeOrigin: true, // 允许跨域
  //     pathRewrite: {
  //       '^/api': "" // 重定向[以/api开头的请求]
  //     }
  //   },
  //   '/bpi': { // api别名
  //     target: 'https://movie.douban.com', // 代理的地址
  //     changeOrigin: true, // 允许跨域
  //     pathRewrite: {
  //       '^/bpi': "" // 重定向[以/bpi开头的请求]
  //     }
  //   }
  // }
  // 配置之后，会将所有以`/api`开头的请求全部代理到https://m.maoyan.com这个服务器上
  // 配置之后，会将所有以`/bpi`开头的请求全部代理到https://movie.douban.com这个服务器上
}