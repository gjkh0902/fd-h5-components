import Vue from 'vue'
import Router from 'vue-router'

// 子模块路由
import CommonRouter from './common/index' // 公共模块
import ComponentsRouter from './components/index' // 公共组件模块
import testRouter from './test/index' // 测试mint-ui模块

Vue.use(Router)

let router = new Router({
    base: process.env.NODE_ENV === 'production' ? '/h5' : '/',
    mode: 'history',
    routes: [
        ...CommonRouter,
        ...ComponentsRouter,
        ...testRouter
    ]
})

//设置页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router