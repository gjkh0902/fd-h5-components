<template>
	<div class="demo-container">
		<app-header v-if="!indexListConf.showList"></app-header>
		<div class="item-content">
			<div v-if="!indexListConf.showList">
				<mt-cell title="选中返回字段值："></mt-cell>
				<mt-cell title="name" :value="indexListConf.selected.name"></mt-cell>
				<mt-cell title="code" :value="indexListConf.selected.code">1</mt-cell>
				<mt-cell title="firstName" :value="indexListConf.selected.firstName"></mt-cell>
				<mt-cell title="isHot" :value="indexListConf.selected.isHot"></mt-cell>
				<mt-button type="default" size="large" @click="indexListConf.showList = true">点击导航</mt-button>
			</div>
			<fd-index-list
				v-if="indexListConf.showList"
				v-model="indexListConf.showList"
				:selected="indexListConf.selected"
				:indexData="indexListConf.indexData"
				@onSelected="indexListSelected"
			></fd-index-list>
		</div>
	</div>
</template>
<style lang="less" scoped>
@import url('../../assets/css/rem.less');
.demo-container {
	padding-top: 0;
}
</style>
<script>
import Vue from 'vue'
import { Cell, Button } from 'mint-ui'
import { IndexList } from 'fd-h5-components'
//import { IndexList } from '~/index' //--本地引入方式调试
Vue.use(IndexList)
import IndexListData from '../../util/test/indexList.json'
import AppHeader from '../appHeader'
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
export default {
	data() {
		return {
			//初始化indexlist
			indexListConf: {
				showList: false, // 控制显隐
				selected: {
					// 默认选中
					name: '中国',
					firstName: 'Z',
					code: '+86',
					isHot: '1'
				},
				indexData: IndexListData
			}
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
		indexListSelected(val) {
			// 选中回调
			console.log('选中回调', val)
			this.indexListConf.selected = val

			//关掉
			this.indexListConf.showList = false
		}
	}
}
</script>
