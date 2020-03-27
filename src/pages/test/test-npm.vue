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

			<mt-button type="default" size="large" plain class="mk-top" @click="indexListConf.showList = true">index-list</mt-button>

			<fd-index-list
				v-if="indexListConf.showList"
				v-model="indexListConf.showList"
				:selected="indexListConf.selected"
				:indexData="indexListConf.indexData"
				@onSelected="indexListSelected"
			></fd-index-list>
		</div>
		<!-- 统一内容模版结束 -->
	</div>
</template>
<style lang="less">
//toast demo css
.custom {
	/* width: 4rem; */
	background-color: #f1f3f4 !important;
	.icon-success1 {
		font-size: 1.2rem;
		color: #62b587;
	}
	.icon-error {
		font-size: 1.2rem;
		color: #ff4d00;
	}
	.icon-warn {
		font-size: 1.2rem;
		color: #ff9900;
	}
	.fd-toast-text {
		color: #666;
		font-size: 0.4rem;
	}
}
.icon-custom {
	width: 1.5rem;
	height: 1.5rem;
}
</style>
<style lang="less" scoped>
@import url('../../assets/css/rem.less');
.demo-container {
	.mk-top {
		margin-top: 1rem;
	}
}
</style>
<script>
import Vue from 'vue'
import { Button } from 'mint-ui'
Vue.component(Button.name, Button)
import AppHeader from '@/components/appHeader'

//json数据
import IndexListData from '../../util/test/indexList.json'
import TabNavData from '../../util/test/tabNav.json'

//fd-h5-components
import { IndexList, TabNav, Toast } from 'fd-h5-components'
//import { IndexList, TabNav } from "~/index" //--本地引入方式调试
// import { IndexList, TabNav } from "&/index.umd.min.js" //--本地引入方式调试
Vue.use(IndexList)
Vue.use(TabNav)

export default {
	name: 'test-npm',
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
			},
			currIndex: 0,
			navList: TabNavData || []
		}
	},
	components: {
		AppHeader
	},
	created() {},
	methods: {
		indexListSelected(val) {
			// 选中回调
			console.log('选中回调', val)
			this.indexListConf.selected = val

			//关掉
			this.indexListConf.showList = false
		},
		navChange(x) {
			console.log('索引变化回调', x)
			this.currIndex = x
		}
	},
	mounted() {
		console.log(IndexList)
		Toast('test toast')
		Toast({
			message: '这是一个成功信息，这是一个成功信息，这是一个成功信息',
			className: 'custom',
			iconClass: 'icon-success1'
		})
	}
}
</script>
