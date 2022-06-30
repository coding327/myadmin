<template>
    <div class="container">
        <!-- <h3 style="margin-right: 10px;">欢迎您，{{ this.$route.query.username }}</h3> -->
        <!-- 双大括号里面的方法和变量都需要是在vue中挂上的，方法挂到methods上， -->
        <h3 style="margin-right: 10px;">欢迎您，{{ getToken('token') && getToken('token').replace('---token---', '') }}</h3>
        <el-button type="warning" @click="exit">退出登录</el-button>
    </div>
</template>

<script type="text/javascript">
// 引入获取token方法,token存储在cookie中
import { getToken,removeToken } from '../utils/cookieUtils'
export default {
    data() {
        return {}
    },
    components: {},
    methods: {
        getToken,
        exit() {
            // 移除token
            removeToken('token')
            // 回到登录页，不登陆不让访问首页
            this.$router.push('/login')
        }
    },
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}
</style>
