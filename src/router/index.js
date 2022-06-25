import Vue from "vue"
import VueRouter from 'vue-router'
import Layout from '../layout/Layout.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter) // Vue上注册使用

const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout
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