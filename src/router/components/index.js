// 组件演示路由
const TabNav = () =>
    import ('@/components/tab-nav/demo.vue')
const ProcessCircle = () =>
    import ('@/components/process-circle/demo.vue')
const IndexList = () =>
    import ('@/components/index-list/demo.vue')
const Swiper = () =>
    import ('@/components/swiper/demo.vue')
const Overlay = () =>
    import ('@/components/overlay/demo.vue')
const Dialog = () =>
    import ('@/components/dialog/demo.vue')
const Audio = () =>
    import ('@/components/audio/demo.vue')
const Grade = () =>
    import ('@/components/grade/demo.vue')

const QNUploader = () =>
    import ('@/components/qiniuUpload/index.vue')
const MKAudio = () =>
    import ('@/components/mkAudio/index.vue')
const Toast = () =>
    import ('@/components/toast/demo.vue')
const MessageBox = () =>
    import ('@/components/message-box/demo.vue')
const NumberScroll = () =>
    import ('@/components/number-scroll/demo.vue')

const basePath = ''

export default [{
        path: `/qiniu-uploader`,
        name: 'QNUploader',
        component: QNUploader,
        meta: {
            title: '七牛上传控件',
            icon: 'icon-shangchuan',
            keepAlive: false,
        },
    },
    {
        path: `/toast`,
        name: 'Toast',
        component: Toast,
        meta: {
            title: 'Toast 提示',
            icon: 'icon-tishi',
            keepAlive: false,
        },
    },
    {
        path: '/message-box',
        name: 'MessageBox',
        component: MessageBox,
        meta: {
            title: 'MessageBox 对话框',
            icon: 'icon-alert',
            keepAlive: false,
        },
    },
    {
        path: `/tab-nav`,
        name: 'TabNav',
        component: TabNav,
        meta: {
            title: 'Tab标签切换',
            icon: 'icon-tab', //iconfont图标
            keepAlive: false,
        },
    },
    {
        path: `/index-list`,
        name: 'IndexList',
        component: IndexList,
        meta: {
            title: '楼层导航选择',
            icon: 'icon-diququhao',
            keepAlive: false,
        },
    },
    {
        path: `/process-circle`,
        name: 'ProcessCircle',
        component: ProcessCircle,
        meta: {
            title: '进度圈',
            icon: 'icon-jinduquan',
            keepAlive: false,
        },
        isPro: process.env.VUE_APP_ISPRO,
    },
    {
        path: `/swiper`,
        name: 'Swiper',
        component: Swiper,
        meta: {
            title: 'Swiper 轮播组件',
            icon: 'icon-lunbo',
            keepAlive: false,
        },
        isPro: process.env.VUE_APP_ISPRO,
    },
    {
        path: `/overlay`,
        name: 'Overlay',
        component: Overlay,
        meta: {
            title: 'Overlay 浮层',
            icon: 'icon-fuceng',
            keepAlive: false,
        },
        isPro: process.env.VUE_APP_ISPRO,
    },
    {
        path: `/dialog`,
        name: 'Dialog',
        component: Dialog,
        meta: {
            title: 'Dialog 弹出框',
            icon: 'icon-danchukuang',
            keepAlive: false,
        },
        isPro: process.env.VUE_APP_ISPRO,
    },
    {
        path: `/audio`,
        name: 'Audio',
        component: Audio,
        meta: {
            title: '音频播放',
            icon: 'icon-yinpin',
            keepAlive: false,
        },
        isPro: process.env.VUE_APP_ISPRO,
    },
    {
        path: `/mkAudio`,
        name: 'MKAudio',
        component: MKAudio,
        meta: {
            title: '音频播放器',
            icon: 'icon-bofangqi',
            keepAlive: false,
        },
        isPro: process.env.VUE_APP_ISPRO,
    },
    {
        path: `/grade`,
        name: 'Grade',
        component: Grade,
        meta: {
            title: '星级评分',
            icon: 'icon-xingjipingfen',
            keepAlive: false,
        },
    },
    {
        path: '/number-scroll',
        name: 'NumberScroll',
        component: NumberScroll,
        meta: {
            title: '数字卷轴',
            icon: 'icon-daohang',
            keepAlive: false,
        },
    },
]