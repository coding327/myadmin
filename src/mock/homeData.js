// 一个页面对应一个js文件用来处理该页面数据增删改查，index.js只是写返回数据给前端用的接口
// 用来伪造home页面的数据

import Mock from 'mockjs'
// import { param2Obj } from '../utils/urlUtils'
import { param2Obj } from '@/utils/urlUtils' // 目录映射

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

// 暴露对象，每个对象对应一个方法
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
        // console.log(config) // {url: '/home?keyword=%E9%87%91', type: 'GET', body: null}
        // console.log(config) config是个对象里面有url，这个url刚好携带了get方式的参数【正好利用上参数解析该工具类】，同时里面还有请求方式
        // console.log(config.url)
        var { keyword, page, pageSize } = param2Obj(config.url) // 参数解析
        var res = List.filter(item => item.username.indexOf(keyword) != -1)
        // console.log(1, keyword)
        // page  pageSize 是做分页的一个关键
        // page=1 pageSize=20      下标0----下标19
        // page=2 pageSize=20      下标20----下标39
        // page=3 pageSize=20      下标40----下标59
        //  ( page-1 )* pageSize <= index < page * pageSize   0<=下标<20
        // 下标满足的过滤出来，返回给前端
        var resLimit = res.filter((item, index) => {
            return (page - 1) * pageSize <= index && index < page * pageSize
        })
        return {
            code: 200,
            msg: '请求成功！',
            // data: res
            data: resLimit,
            total: res.length
        }
    },
    deleteData: config => {
        // console.log(config) // {url: '/deleteById', type: 'POST', body: '{"id":"CC5523bd-5cBF-58c9-b345-98B7fF39FFf2"}'}
        // console.log(JSON.parse(config.body)) // {id: 'd2BC9dDb-bfA3-cd19-b984-C6D5C93aD578'}
        var { id } = JSON.parse(config.body)
        // console.log(id) // d2BC9dDb-bfA3-cd19-b984-C6D5C93aD578
        var res = List.filter(item => item.id != id)
        List = res // 操作List最后都要重新赋值，前端重新请求数据【主要是对数据操作，不需要返回什么数据，最终重新请求数据】
        return {
            code: 200,
            msg: '删除成功',
            data: null // 数据List被res重新赋值，前端重新发请求获取数据
        }
    },
    batchDelete: config => {
        // console.log(config.body) // '{"idArr":["5B19dfbB-7A1f-4bFb-B3A8-cDb2fc8F0F5d","Bee8d7CC-5898-A2B8-F16b-Ed73F747bEC8"]}'
        var { idArr } = JSON.parse(config.body)
        var res = List.filter(item => !idArr.includes(item.id))
        List = res
        return {
            code: 200,
            msg: '批量删除成功',
            data: null // 数据List被res重新赋值，前端重新发请求获取数据
        }
    },
    addHomeData: config => {
        var { username, address, type, income, pay, money } = JSON.parse(config.body)
        List.unshift({
            id: Mock.mock('@guid()'),
            createTime: Mock.mock('@datetime()'),
            username,
            address,
            type,
            income,
            pay,
            money
        })
        return {
            code: 200,
            msg: '添加成功',
            data: null
        }
    },
    editHomeData: config => {
        const { id, username, address, type, income, pay, money } = JSON.parse(config.body)
        List.forEach(item => {
            if (item.id == id) {
                item.username = username
                item.address = address
                item.type = type
                item.income = income
                item.pay = pay
                item.money = money
            }
        })
        return {
            code: 200,
            msg: '修改成功',
            data: null
        }
    }
}










