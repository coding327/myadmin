// 提取url参数工具类[参数解析]

export const param2Obj = url => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    //{keyword:'张三'}
    return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}') // 有键名，没有键值，键值默认为空字符串
}

// 'keyword=' => 'keyword":"'
// '{"keyword":""}'