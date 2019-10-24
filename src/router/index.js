import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'

//2.use
Vue.use(VueRouter)

//3.导入组件
import login from '@/views/login/'
import home from '@/views/home/'
import article from '@/views/home/article'
import publish from '@/views/home/publish'

//4.设置路由规则
const routes = [
    { path: "/login", component: login },
    {
        path: "/home", component: home, children: [
            { path: "/article", component: article },
            { path: "/publish", component: publish }
        ]
    },
    { path: "", redirect: "/login" }
]

//5.创建路由对象并使用规则
const router = new VueRouter({
    routes
})

//导航守卫
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('login') != -1) {
        next()
    } else {
        let obj = window.localStorage.getItem('token');

        if (obj) {
            next()
        } else {
            Vue.prototype.$message.error('请先登录');
            router.push('/login')
        }
    }
})

///导出
export default router