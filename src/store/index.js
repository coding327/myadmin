import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {}, // 保存用户信息
        routes: [] // 保存全部路由
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setRouter(state, routes) {
            state.routes = routes
        }
    }
})


