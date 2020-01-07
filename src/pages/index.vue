<template>
	<div class="demo-container">
		<div class="fixed-header">
			<ul>
				<li class="title">{{ title }}</li>
			</ul>
		</div>

		<!-- 统一内容模版开始 -->
		<div class="item-content">
			<!-- 读取组件列表开始-->
			<ul>
				<li v-for="(item, index) in routerConfig" :key="index" class="item-router" @click="linkUrl(item.path)">
					<p v-if="(index > 1) & !item.isPro">
						<i class="iconfont" :class="item.meta.icon"></i>
						<i class="title">{{ item.meta.title }}</i>
						<i class="iconfont icon-gengduo"></i>
					</p>
				</li>
			</ul>
			<!-- 读取组件列表结束-->
		</div>
		<!-- 统一内容模版结束 -->
	</div>
</template>
<style lang="less" scoped>
@import url("../assets/css/rem.less");
.demo-container {
	.item-content ul li.item-router {
		cursor: pointer;

		p {
			.px2rem(padding, 35);
			.flexbox();
			border-bottom: 1px #ededed solid;
			.px2rem(font-size, 28);

			i.iconfont {
				.px2rem(margin-right, 10);
				.px2rem(margin-top, 3);
				.px2rem(font-size, 28);
			}

			i.icon-gengduo {
				margin-left: auto;
			}
		}
	}
}
</style>
<script>
import Vue from "vue"
import { Cell } from "mint-ui"
Vue.component(Cell.name, Cell)
import RouterConfig from "../router/index"

export default {
	name: "index",
	data() {
		return {
			routerConfig: RouterConfig.options.routes || [],
			title: this.$route.meta.title
		}
	},
	created() {},
	methods: {
		linkUrl(url) {
			this.$router.push(url)
		}
	},
	mounted() {
		console.log(this.routerConfig)
	}
}
</script>
