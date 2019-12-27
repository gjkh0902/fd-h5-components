/*
 * 公共路由配置
 */
const Index = () =>
    import ('@/pages/index.vue') // 路由入口
const Error404 = () =>
    import ('@/components/404.vue') // 404错误页面

export default [
    // 入口
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: 'H5组件库',
        }
    },
    {
        path: '*',
        name: '',
        component: Error404,
        meta: {
            title: '抱歉--访问出错了',
            icon: 'icon-sorry'
        }
    }
]