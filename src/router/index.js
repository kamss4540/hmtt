import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

//2.use
Vue.use(VueRouter)

//3.导入组件
import login from '@/views/login/'
import home from '@/views/home/'

//4.设置路由规则
const routes = [
    { path: "/login", component: login },
    { path: "/home", component: home },
    { path: "", redirect: "/login" }
]

//5.创建路由对象并使用规则
const router = new VueRouter({
    routes
})

///导出
export default router