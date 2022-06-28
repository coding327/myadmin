// index.js主要提供数据接口,最终注入到main.js，某个页面数据增删改查需要创建js文件，进行操作然后暴露,暴露对象
import Mock from 'mockjs'
// 引入homeData对象
import homeData from './homeData'

// 写数据接口，与请求接口对应
// 参数1：接口的正则表达式
// 参数2：请求类型 get post put delete
// 参数3：返回给前端的数据
Mock.mock(/\/home/, 'get', homeData.getHomeData)


