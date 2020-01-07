<template>
	<!-- header -->
	<div class="demo-container">
		<button class="btn-toast" @click="defaultToast">基本样式</button>
		<button class="btn-toast" @click="defaultSuccessToast">默认成功</button>
		<button class="btn-toast" @click="defaultFailToast">默认失败</button>
		<button class="btn-toast" @click="defaultWarnToast">默认警告</button>
		<button class="btn-toast" @click="customToast">自定义</button>
	</div>
</template>

<script>
import { Toast } from "fd-h5-components"
// import Toast from '~/toast/index.js';
//import { Toast } from "~/index" //--本地引入方式调试
// import { Toast } from 'mint-ui';
// import { Toast } from "&/index.umd.min.js" //--本地引入方式调试
import icon from "@assets/logo.png"

export default {
	data() {
		return {}
	},
	components: {},
	created() {},
	mounted() {},
	methods: {
		defaultToast() {
			Toast("这是一个Toast")
		},
		defaultSuccessToast() {
			Toast({
				message: "这是一个成功信息",
				className: "custom",
				iconClass: "icon-success1"
			})
		},
		defaultFailToast() {
			Toast({
				message: "这是一个错误信息",
				className: "custom",
				iconClass: "icon-error"
			})
		},
		defaultWarnToast() {
			Toast({
				message: "这是一个警告信息",
				className: "custom",
				iconClass: "icon-warn"
			})
		},
		customToast() {
			Toast({
				message: "hello world!",
				custom: `<img class="icon-custom" src="${icon}" />`,
				className: "custom"
			})
		}
	}
}
</script>
<style lang="less">
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
	.mk-toast-text {
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
.demo-container {
	padding: 1rem;
	.btn-toast {
		margin: 0 0.5rem 0.5rem 0;
		width: 2rem;
		height: 1rem;
		border: #ddd solid 1px;
		background-color: #fff;
	}
}
</style>
