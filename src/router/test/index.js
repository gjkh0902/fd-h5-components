/*
 * test路由配置-测试
 */
const TestIndexList = () => import("@/pages/test/test-Index-list.vue") // test
const Testnpm = () => import("@/pages/test/test-npm.vue") // test

export default [
	//国家地区code
	{
		path: "/test-index-list",
		name: "testIndexList",
		component: TestIndexList,
		meta: {
			title: "楼层导航选择[mint-ui]",
			icon: "icon-diququhao"
		}
	},
	{
		path: "/test-npm",
		name: "testnpm",
		component: Testnpm,
		meta: {
			title: "NPM包测试",
			icon: "icon-npmbao"
		}
	}
]
