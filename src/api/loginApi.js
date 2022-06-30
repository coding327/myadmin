import request from '../utils/request'

// 1.登录页面请求接口
export const loginApi = data => request({ url: '/login', method: 'post', data })


