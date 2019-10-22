import Vue from 'vue'
import App from './App.vue'

//样式
import './assets/css/bass.css'

//elm ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios
import axios from 'axios';
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
Vue.prototype.$axios = axios;


//导入路由
import router from '@/router/'

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
// import login from '@/views/login/'
// import home from '@/views/home/'
// const routes = [
//   { path: "/login", component: login },
//   { path: "/home", component: home },
//   { path: "", redirect: "/login" }
// ]
// const router = new VueRouter({
//   routes
// })
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
