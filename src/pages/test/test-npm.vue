<template>
	<div class="demo-container">
		<app-header></app-header>

		<!-- 统一内容模版开始 -->
		<div class="item-content">
			<fd-tab-nav :list="navList" :curr-index="currIndex" :on-change="navChange">
				<template slot-scope="scope">
					<!-- <div>索引：{{scope.index}}</div> -->
					<div>{{ scope.item.name }}</div>
				</template>
			</fd-tab-nav>

			<mt-button type="default" size="large" plain class="mk-top" @click="showCodeList = true">index-list</mt-button>

			<fd-index-list
				v-if="showCodeList"
				v-model="showCodeList"
				:selected="selected"
				:indexData="indexData"
				@onSelected="onSelected"
			></fd-index-list>
		</div>
		<!-- 统一内容模版结束 -->
	</div>
</template>
<style lang="less" scoped>
@import url("../../assets/css/rem.less");
.demo-container {
	.fd-index-list {
		padding-top: 1.5rem;
	}
	.mk-top {
		margin-top: 1rem;
	}
}
</style>
<script>
import Vue from "vue"
import { Button } from "mint-ui"
Vue.component(Button.name, Button)
import AppHeader from "@/components/appHeader"

//json数据
import IndexListData from "../../util/test/indexList.json"
import TabNavData from "../../util/test/tabNav.json"

//fd-h5-components
import { IndexList, TabNav } from "fd-h5-components"
//import { IndexList, TabNav } from "~/index" //--本地引入方式调试
Vue.use(IndexList)
Vue.use(TabNav)

//mk-libs
import { QNUploader } from "mk-libs"
export default {
	name: "test-npm",
	data() {
		return {
			showCodeList: false, //显示index-list组件
			selected: {
				// 默认选中的信息
				name: "中国",
				firstName: "Z",
				code: "+86",
				isHot: "1"
			},
			indexData: IndexListData,
			navList: TabNavData
		}
	},
	components: {
		AppHeader
	},
	created() {},
	methods: {
		onSelected(val) {
			// indexlist选中回调
			console.log("选中回调", val)
			this.selected = val
			this.showCodeList = false
		},
		navChange(x) {
			console.log("索引变化回调", x)
			this.currIndex = x
		}
	},
	mounted() {
		console.log(QNUploader)
	}
}
</script>
