// 一个页面对应一个js文件用来处理该页面数据增删改查，index.js只是写返回数据给前端用的接口
// 用来伪造home页面的数据

import Mock from 'mockjs'
import { param2Obj } from '@/utils/urlUtils'

var List = [] // 用来存放数据
// 模仿静态页面的表格里的数据格式写，注意每条数据一般都是有id的，这里我们补上即可
// tableData: [
//     {
//         username: "王小虎",
//         address: "上海市普陀区金沙江路",
//         createTime: "2022-6-24 10:10:10",
//         type: 0, //0充值 1优惠卷 2购买一定盈
//         income: 1000,
//         pay: 100,
//         money: 900,
//     },
// ],
for (var i = 0; i < 100; i++) {
    List.push({
        id: Mock.mock('@guid()'),
        username: Mock.mock('@cname()'),
        address: Mock.mock('@county(true)'),
        createTime: Mock.mock('@datetime()'),
        type: Mock.mock('@natural(0, 2)'), //0充值 1优惠卷 2购买一定盈
        income: Mock.mock('@natural(1000, 2000)'),
        pay: Mock.mock('@natural(100, 200)'),
        money: Mock.mock('@natural(800, 1500)'),
    })
}

export default {
    // getHomeData: config => {
    //     // console.log(config) config是个对象里面有url，这个url刚好携带了get方式的参数【正好利用上参数解析该工具类】，同时里面还有请求方式
    //     return {
    //         code: 200,
    //         msg: '请求成功！',
    //         data: List
    //     }
    // }
    // 引入了关键词，升级一下
    getHomeData: config => {
        // console.log(config) config是个对象里面有url，这个url刚好携带了get方式的参数【正好利用上参数解析该工具类】，同时里面还有请求方式
        // console.log(config.url)
        var { keyword } = param2Obj(config.url) // 参数解析
        // console.log(1, keyword)
        var res = List.filter(item => item.username.indexOf(keyword) != -1)
        return {
            code: 200,
            msg: '请求成功！',
            data: res
        }
    }
}










