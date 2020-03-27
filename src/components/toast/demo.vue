<template>
	<!-- header -->
	<div class="demo-container">
		<app-header></app-header>
		<div class="functions">
			<mt-button type="default" size="large" @click="defaultToast">基本样式</mt-button>
			<mt-button type="default" size="large" @click="defaultSuccessToast">默认成功</mt-button>
			<mt-button type="default" size="large" @click="defaultFailToast">默认失败</mt-button>
			<mt-button type="default" size="large" @click="defaultWarnToast">默认警告</mt-button>
			<mt-button type="default" size="large" @click="customToast">自定义(html标签)</mt-button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'mint-ui'
Vue.component(Button.name, Button)
//import { Toast } from "fd-h5-components"
// import Toast from '~/toast/index.js';
import { Toast } from '~/index' //--本地引入方式调试
// import { Toast } from 'mint-ui';
// import { Toast } from "&/index.umd.min.js" //--本地引入方式调试
import icon from '@assets/logo.png'
import AppHeader from '../appHeader'

export default {
	data() {
		return {}
	},
	components: {
		AppHeader
	},
	created() {},
	mounted() {},
	methods: {
		defaultToast() {
			Toast('这是一个Toast')
		},
		defaultSuccessToast() {
			Toast({
				message: '这是一个成功信息',
				className: 'custom',
				iconClass: 'icon-success1'
			})
		},
		defaultFailToast() {
			Toast({
				message: '这是一个错误信息',
				className: 'custom',
				iconClass: 'icon-error'
			})
		},
		defaultWarnToast() {
			Toast({
				message: '这是一个警告信息',
				className: 'custom',
				iconClass: 'icon-warn'
			})
		},
		customToast() {
			Toast({
				message: 'hello world!',
				custom: `<img class="icon-custom" src="${icon}" />`,
				className: 'custom'
			})
		}
	}
}
</script>
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
.demo-container {
	padding: 1.5rem 0 0 0;
	.mint-button {
		margin: 0 0.5rem 0.5rem 0;
		cursor: pointer;
	}
}
</style>
