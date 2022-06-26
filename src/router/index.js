import Vue from "vue"
import VueRouter from 'vue-router'
import Layout from '../layout/Layout.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/home/Home.vue'
import User from '../views/user/User.vue'

Vue.use(VueRouter) // Vue上注册使用

const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        redirect: '/layout/home', // 填完整路径【一般是首页，重定向】
        children: [
            {
                path: 'home', // 不要带/
                name: 'home',
                component: Home
            },
            {
                path: 'user',
                name: 'user',
                component: User
            }
        ]
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