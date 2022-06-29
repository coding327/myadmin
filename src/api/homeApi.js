// 引入请求工具类,用来处理home页面所有的请求
import request from '../utils/request'

// 1.请求home页面table里所有的数据
export function getHomeApi(params) {
    return request({
        url: '/home',
        method: 'get', // get方式配置项传参属性是params
        params // 对象属性名和变量名相同简写
    })
}

// 2.home单个删除请求接口
export function deleteHomeApi(data) {
    return request({
        url: '/deleteById',
        method: 'post', // post方式配置项传参属性是data
        data
    })
}

// 3.home批量删除请求接口
export function batchDeleteApi(data) {
    return request({
        url: '/batchDel',
        method: 'post',
        data
    })
}