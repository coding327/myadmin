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
// 引入获取token工具类
import { getToken } from '@/utils/cookieUtils'
// 引入获取用户信息请求接口
import { getUserApi } from '@a/loginApi.js'
// 引入vuex文件
import store from '../store/index'
// 引入动态创建菜单的二级路由【管理员可以访问，普通用户不行】
import ShenPi from '../views/shenpi/ShenPi.vue'
// 引入动态创建菜单的二级路由【管理员和普通用户都可以访问】
import CWu from '../views/cwu/CWu.vue'

Vue.use(VueRouter) // Vue上注册使用

// 为什么vuex要保存？
// 如果vuex已经保存了用户信息和路由数组，就不需要再发请求，渲染菜单页面直接拿vuex里面的数据渲染即可

// 动态生成菜单【主分支，省略其它分支】：有无token=>有token,发请求获取用户信息【并保存到vuex里面】，拿到里面角色=>通过角色，在动态路由里面筛选【动态路由里面会有个meta对象里面除了title还有个角色role属性】=>拿到该角色的路由数组，与公共数组合并【concat不影响原数组，记得重新赋值】=>得到新的routes【保存到vuex里面】=>重新添加一下路由【该用户使用新的路由】=>最后next()跳转过去，注意解决动态添加路由的bug=>渲染菜单=>vuex里面拿路由数据使用v-for渲染即可

// 公共路由，任何角色都有这个权限【同时这也是一个初始路由配置，根据角色不同新生成的路由配置需要重新渲染==>重新配置到router上，完成了我们内部路由配置，渲染这一块==>外部路由渲染菜单借助vuex保存咱们的角色路由，再渲染到页面上】
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
                component: Home,
                meta: { title: '首页' } // 路由对象中的meta可以放自定义属性
            },
            {
                path: 'user',
                name: 'user',
                component: User,
                meta: { title: '用户页面' }
            },
            {
                path: 'userManage',
                name: 'userManage',
                component: UserManage,
                meta: { title: '首页管理' }
            },
            {
                path: 'fundManage',
                name: 'fundManage',
                component: FundManage,
                meta: { title: '资金管理' },
                children: [
                    {
                        path: 'areaManage',
                        name: 'areaManage',
                        component: AreaManage,
                        meta: { title: '区域管理' }
                    },
                    {
                        path: 'fundWater',
                        name: 'fundWater',
                        component: FundWater,
                        meta: { title: '资金流水' }
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

// 制作权限菜单的路由数组【权限菜单补上meta的title,最终渲染，渲染标题就是title】
const routerAsync = [
    {
        path: 'shenpi',
        name: 'shenpi',
        component: ShenPi,
        meta: { rules: ['管理员'], title: '审批管理' }
    },
    {
        path: 'cwu',
        name: 'cwu',
        component: CWu,
        meta: { rules: ['管理员', '普通用户'], title: '财务管理' } // 角色中分离了一个普通用户【其实分一个管理员就可以了，管理员基本上都可以访问，这个路由可以直接放到公共路由里】
    },
]

// 根据用户的rule角色在路由数组里面进行筛选
function getRouteFun(rule, routerAsync) {
    return routerAsync.filter(item => item.meta.rules.includes(rule))
}

// 白名单【已经在白名单的直接放行】
var whiteArr = ['/login', '/register']
// 全局前置路由守卫 路由跳转之前触发    to新路由对象【重定向也包含在内】    from是旧路由对象  【注意如果next()有参数改变to的去向，这时又将触发全局前置路由守卫，同时成为新的to,而from不变】
router.beforeEach((to, from, next) => {
    var path = to.path // 新的路由对象
    var token = getToken('token')
    if (token) {
        // 有token
        if (path == '/login') { // 避免重复登录
            next('/')
        } else {
            // 为什么不把保存用户信息和权限菜单放上面：上面只是避免重复登陆，让你next到根目录，而根目录重定向到首页必定执行下面这个，所以说制作权限菜单放下面
            // 从vuex里获取用户信息，如果已经有了用户信息，就不发送直接放行【通过vuex里的用户信息制作权限菜单】
            // step1: vuex里没有用户信息，发送请求，获取用户信息（主要是角色信息），保存到vuex
            if (store.state.routes.length == 0) { // 如果vuex已经保存了用户信息和路由数组，就不需要再发请求，渲染菜单页面直接拿vuex里面的路由数据渲染即可
                getUserApi({ token }).then(res => {
                    if (res.code == 200) {
                        // console.log(res.data)
                        var rule = res.data.rule
                        store.commit('setUser', res.data) // 保存用户信息
                        // 制作权限菜单【先制作二级路由数组，调用方法通过用户rule得到它的路由数组】
                        var userRouter = getRouteFun(rule, routerAsync)
                        // console.log(userRouter)
                        // 这里我们是直接再赋值给原数组，routes是经过改变了的
                        routes[1].children = routes[1].children.concat(userRouter) // concat不影响原数组
                        // console.log(routes[1].children)
                        store.commit('setRouter', routes) // 权限菜单===【最终路由数组】存储到vuex里面
                        // 注意：新版本router.addRoutes已废弃：使用 router.addRoute() 代替。
                        // for (let x of newRoutes) {
                        //     router.addRoute(x)
                        // }
                        router.addRoutes(routes) // 动态添加路由【路由是会改变的，最初公共路由是默认路由，后添加的覆盖默认的路由】
                        next({ ...to, replace: true }) // 解决动态添加路由的bug,正常情况下应该是next()放行
                    }
                })
            } else {
                // step2: vuex有用户信息就直接放行
                next() // vuex有值直接放行[vuex把数据存储到内存中，在该项目路径下，切换路由，菜单初次没有就往vuex里面放用户信息和动态路由，后面我们切换路由直接用vuex里面已经有的]
                // step3: v-for动态渲染菜单，此时路由根据角色已经改变
            }
        }
    } else {
        if (whiteArr.includes(path)) {
            next()
        } else {
            next('/login') // 和this.$router.push() 一样实现路由跳转
        }
    }
})

export default router