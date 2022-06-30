// 登录数据操作
// 登录数据[提前写死两个，默认一个管理员]
var LoginList = [
    { username: 'admin', pwd: '123456', name: '小明', token: 'admin---token---' },
    { username: 'aaa', pwd: '123456', name: '小红', token: 'aaa---token---' }
]


export default {
    getLoginData: config => {
        var { username, pwd } = JSON.parse(config.body)
        // console.log(username, pwd) // 解构成功
        // 默认失败，经过遍历找到就重新赋值
        var result = {
            code: 201,
            msg: '验证失败',
            data: null,
        }
        LoginList.forEach(item => {
            if (item.username == username && item.pwd == pwd) {
                result.code = 200
                result.msg = '验证成功'
                result.data = item.token
                return // 每个item都会执行判断,同时找到就停止循环【最好使用find】
            }
            // } else {
            //     result.code = 201
            //     result.msg = '验证失败'
            //     result.data = null
            // }
        })
        // 循环完return结果
        // console.log(result)
        return result
    }
}


