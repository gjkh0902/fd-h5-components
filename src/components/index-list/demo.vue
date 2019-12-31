<template>
	<div class="demo-container">
		<app-header></app-header>
		<div class="item-content">
			<mt-cell title="选中返回字段值："></mt-cell>
			<mt-cell title="name" :value="selected.name"></mt-cell>
			<mt-cell title="code" :value="selected.code">1</mt-cell>
			<mt-cell title="firstName" :value="selected.firstName"></mt-cell>
			<mt-cell title="isHot" :value="selected.isHot"></mt-cell>
			<mt-button type="default" size="large" @click="showCodeList = true">点击导航</mt-button>
			<!-- <country-area-code v-if="showCodeList" v-model="showCodeList" :selected="selected" :indexData="indexData" @onSelected="onSelected">
                </country-area-code> -->
			<fd-index-list
				v-if="showCodeList"
				v-model="showCodeList"
				:selected="selected"
				:indexData="indexData"
				@onSelected="onSelected"
			></fd-index-list>
		</div>
	</div>
</template>
<style lang="less" scoped>
@import url("../../assets/css/rem.less");
.demo-container {
	.fd-ndex-list {
		padding-top: 1.5rem;
	}
}
</style>
<script>
import Vue from "vue"
import { Cell, Button } from "mint-ui"
import { IndexList } from "fd-h5-components"
//import { IndexList } from "~/index" //--本地引入方式调试
Vue.use(IndexList)
import IndexListData from "../../util/test/indexList.json"
import AppHeader from "../appHeader"
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
export default {
	data() {
		return {
			showCodeList: false, // 显示国家地区区号组件
			selected: {
				// 默认选中的区号信息
				name: "中国",
				firstName: "Z",
				code: "+86",
				isHot: "1"
			},
			indexData: IndexListData,
			isShowCommon: false
		}
	},
	components: {
		AppHeader
	},
	created() {
		//兼容老版本不显示‘常用’按钮
		//const commonUsed = IndexData.findIndex(item => item.type === '常用')
		//IndexData[commonUsed].type = ""
	},
	mounted() {},
	watch: {},
	methods: {
		onSelected(val) {
			// 选中回调
			console.log("选中回调", val)
			this.selected = val

			//关掉
			this.showCodeList = false
		}
	}
}
</script>
