<template>
	<!-- header -->
	<div class="demo-container">
		<app-header></app-header>
		<div class="item-content">
			<fd-tab-nav :list="tabNavConf.navList" :curr-index="tabNavConf.currIndex" :on-change="tabNavChange">
				<template slot-scope="scope">
					<!-- <div>索引：{{scope.index}}</div> -->
					<div>{{ scope.item.name }}</div>
				</template>
			</fd-tab-nav>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
// import { TabNav } from "fd-h5-components"
import { TabNav } from '~/index' //--本地引入方式调试
// import {  TabNav } from "&/index.umd.min.js" //--本地引入方式调试

Vue.use(TabNav)

import TabNavData from '../../util/test/tabNav.json'
import AppHeader from '../appHeader'
export default {
	data() {
		return {
			tabNavConf: {
				currIndex: 0,
				navList: TabNavData || []
			}
		}
	},
	components: {
		AppHeader
	},
	created() {},
	mounted() {
		// window.addEventListener('resize', this.handleScroll)
		// window.addEventListener('scroll', this.handleScroll, false)
	},
	methods: {
		tabNavChange(x) {
			console.log('索引变化', x)
			this.currIndex = x
		}
	},
	watch: {}
}
</script>
