<template>
	<div class="demo-container">
		<app-header></app-header>
		<!-- 统一内容模版开始 -->
		<div class="item-content">
			<mt-index-list>
				<mt-index-section v-for="(item, index) in IndexListData" :key="index" :index="item.type">
					<mt-cell
						v-for="(citem, cindex) in item.list"
						:key="cindex"
						:title="citem.name"
						@click.native="checkedData(citem)"
					>
					</mt-cell>
				</mt-index-section>
			</mt-index-list>
		</div>
		<!-- 统一内容模版结束 -->
	</div>
</template>
<script>
import Vue from "vue"
import IndexListData from "../../util/test/indexList.json"
import { IndexList, IndexSection, Cell } from "mint-ui"
import AppHeader from "@/components/appHeader"
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
export default {
	name: "test-Index-list",
	data() {
		return {
			IndexListData: IndexListData || []
		}
	},
	components: {
		AppHeader
	},
	created() {},
	methods: {
		checkedData(val) {
			//已选数据
			console.log(val)
			this.$Toast(val.name)
		}
	},
	mounted() {
		console.log(TestJsonData)
	}
}
</script>
