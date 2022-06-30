import Vue from "vue"
import VueRouter from 'vue-router'
import Layout from '../layout/Layout.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/home/Home.vue'
import User from '../views/user/User.vue'
import Login from '../views/login/Login.vue'
import UserManage from '../views/userManage/UserManage.vue'
import FundManage from '../views/fundManage/FundManage.vue'
import AreaManage from '../views/fundManage/components/AreaManage.vue'
import FundWater from '../views/fundManage/components/FundWater.vue'

Vue.use(VueRouter) // Vue上注册使用

const routes = [
    {
        path: '/',
        redirect: '/layout/home', // 填完整路径【一般是首页，重定向】
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        children: [
            {
                path: 'home', // 最前面不要带/
                name: 'home',
                component: Home
            },
            {
                path: 'user',
                name: 'user',
                component: User
            },
            {
                path: 'userManage',
                name: 'userManage',
                component: UserManage
            },
            {
                path: 'fundManage',
                name: 'fundManage',
                component: FundManage,
                children: [
                    {
                        path: 'areaManage',
                        name: 'areaManage',
                        component: AreaManage
                    },
                    {
                        path: 'fundWater',
                        name: 'fundWater',
                        component: FundWater
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    routes
})

export default router