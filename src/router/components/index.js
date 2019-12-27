// 组件演示路由
const tabsNav = r => require.ensure([], () => r(require("@/components/tabs-nav/demo.vue")), "tabsNav")
const ProcessCircle = r => require.ensure([], () => r(require("@/components/process-circle/demo.vue")), "ProcessCircle")
const IndexList = r => require.ensure([], () => r(require("@/components/index-list/demo.vue")), "CountryAreaCode")
const Swiper = r => require.ensure([], () => r(require("@/components/swiper/demo.vue")), "Swiper")
const Overlay = r => require.ensure([], () => r(require("@/components/overlay/demo.vue")), "Overlay")
const Dialog = r => require.ensure([], () => r(require("@/components/dialog/demo.vue")), "Dialog")
const Audio = r => require.ensure([], () => r(require("@/components/audio/demo.vue")), "Audio")
const Grade = r => require.ensure([], () => r(require("@/components/grade/demo.vue")), "Grade")

const QNUploader = r => require.ensure([], () => r(require("@/components/qiniuUpload/index.vue")), "QNUploader")
const MKAudio = r => require.ensure([], () => r(require("@/components/mkAudio/index.vue")), "MKAudio")

const basePath = ""

export default [
	{
		path: `/qiniu-uploader`,
		name: "QNUploader",
		// component: tabsNav => require(['@/components/tabs-nav/demo.vue'], tabsNav),
		component: QNUploader,
		meta: {
			title: "七牛上传控件",
			icon: "icon-shangchuan",
			keepAlive: true
		}
	},
	{
		path: `/tabs-nav`,
		name: "tabsNav",
		// component: tabsNav => require(['@/components/tabs-nav/demo.vue'], tabsNav),
		component: tabsNav,
		meta: {
			title: "Tab导航居中",
			icon: "icon-daohang", //iconfont图标
			keepAlive: true
		}
	},
	{
		path: `/process-circle`,
		name: "ProcessCircle",
		component: ProcessCircle,
		meta: {
			title: "进度圈",
			icon: "icon-jinduquan",
			keepAlive: true
		}
	},
	{
		path: `/index-list`,
		name: "IndexList",
		component: IndexList,
		meta: {
			title: "楼层导航选择",
			icon: "icon-diququhao",
			keepAlive: true
		}
	},
	{
		path: `/swiper`,
		name: "Swiper",
		component: Swiper,
		meta: {
			title: "Swiper 轮播组件",
			icon: "icon-lunbo",
			keepAlive: true
		}
	},
	{
		path: `/overlay`,
		name: "Overlay",
		component: Overlay,
		meta: {
			title: "Overlay 浮层",
			icon: "icon-fuceng",
			keepAlive: true
		}
	},
	{
		path: `/dialog`,
		name: "Dialog",
		component: Dialog,
		meta: {
			title: "Dialog 弹出框",
			icon: "icon-danchukuang",
			keepAlive: true
		}
	},
	{
		path: `/audio`,
		name: "Audio",
		component: Audio,
		meta: {
			title: "音频播放",
			icon: "icon-yinpin",
			keepAlive: true
		}
	},
	{
		path: `/mkAudio`,
		name: "MKAudio",
		component: MKAudio,
		meta: {
			title: "音频播放器",
			icon: "icon-yinpin",
			keepAlive: false
		}
	},
	{
		path: `/grade`,
		name: "Grade",
		component: Grade,
		meta: {
			title: "星级评分",
			icon: "icon-xingjipingfen",
			keepAlive: false
		}
	}
]
