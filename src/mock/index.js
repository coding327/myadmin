// index.js主要提供数据接口,最终注入到main.js，某个页面数据、数据增删改查需要创建js文件，进行操作然后暴露,暴露对象【接口只是负责调用】
import Mock from 'mockjs'
// 引入homeData对象
import homeData from './homeData'
// 引入 loginData对象
import loginData from './loginData'

// 写数据接口，与请求接口对应
// 参数1：接口的正则表达式[与前端的url要对应]
// 参数2：请求类型 get post put delete
// 参数3：返回给前端的数据
// home页面所有数据，初始数据
Mock.mock(/\/home/, 'get', homeData.getHomeData)
// 接口 单删
Mock.mock(/\/deleteById/, 'post', homeData.deleteData)
// 接口 批量删除
Mock.mock(/\/batchDel/, 'post', homeData.batchDelete)
// 接口 数据添加
Mock.mock(/\/addHome/, 'post', homeData.addHomeData)
// 接口 数据修改
Mock.mock(/\/editHome/, 'post', homeData.editHomeData)
// 接口 登录
Mock.mock(/\/login/, 'post', loginData.getLoginData)
// 接口 获取用户信息
Mock.mock(/\/getUser/, 'post', loginData.getUserInfo)