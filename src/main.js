import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注入数据接口
import './mock/index'
// import MyPage from './components/MyPage.vue'
import MyPage from '@c/MyPage.vue'
Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
Vue.component('MyPage', MyPage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




