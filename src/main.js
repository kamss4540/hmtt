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

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let obj = JSON.parse(window.localStorage.getItem('token'))
  if (obj) config.headers.Authorization = `Bearer ${obj.token}`
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  window.console.dir(error)
  if (error.response.status == 401) {
    Vue.prototype.$message.error('token以失效,请重新登录')
    router.push('/login')
  }

  return Promise.reject(error);
});

import JSONbig from 'json-bigint';
axios.defaults.transformResponse = [function (data) {
  try {
    // 试试，如果能转JSON就转JSON
    return JSONbig.parse(data);

  } catch (error) {
    // 不能转会进到catch里
    // 就直接return data，响应体长什么样子，我就给你原样返回
    return data;
  }
}]

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
