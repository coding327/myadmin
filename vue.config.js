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
  // todo: 反向代理
  // devServer: {
  //   '/api': {
  //     target: 'http://localhost:80',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': ""
  //     }
  //   }
  // }
}