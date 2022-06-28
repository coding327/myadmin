import axios from 'axios'
// axios进行二次封装    封装成请求工具类
// server是通过axios创建得一个服务  可以放所有配置项

const server = axios.create({
    baseURL: '',
    timeout: 5000
})

// 请求拦截 添加请求头
server.interceptors.request.use(config => {
    return config
})

// 响应拦截 处理错误信息    加解密
server.interceptors.response.use(res => {
    return res.data
})

export default server

