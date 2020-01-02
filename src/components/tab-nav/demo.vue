<template>
	<!-- header -->
	<div class="demo-container">
		<app-header></app-header>
		<div class="item-content">
			<fd-tab-nav
				:list="navList"
				:curr-index="currIndex"
				:on-change="navChange"
			>
				<template slot-scope="scope">
					<!-- <div>索引：{{scope.index}}</div> -->
					<div>{{ scope.item.name }}</div>
				</template>
			</fd-tab-nav>
			<!-- <br />
			<div class="functions">
				<button class="demo-btn" @click="navList = navList1">切换数据源：4个</button>
				<button class="demo-btn" @click="navList = navList2">切换数据源：8个</button>
				<button class="demo-btn" @click="currIndex = 0">选中第一个</button>
				<button class="demo-btn" @click="currIndex = 2">选中第三个</button>
				<button class="demo-btn" @click="currIndex = navList.length - 1">选中第最后一个</button>
			</div> -->
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { TabNav } from "fd-h5-components";
//import { TabNav } from "~/index" //--本地引入方式调试
Vue.use(TabNav);

import TabNavData from "../../util/test/tabNav.json";
import AppHeader from "../appHeader";
export default {
	data() {
		return {
			currIndex: 0,
			navList: [],
			navList1: TabNavData
		};
	},
	components: {
		AppHeader
	},
	created() {
		this.navList = this.navList1;
	},
	mounted() {
		// window.addEventListener('resize', this.handleScroll)
		// window.addEventListener('scroll', this.handleScroll, false)
	},
	methods: {
		navChange(x) {
			console.log("索引变化", x);
			this.currIndex = x;
		}
	},
	watch: {}
};
</script>
