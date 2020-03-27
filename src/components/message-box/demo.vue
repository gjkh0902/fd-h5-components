<template>
	<div class="demo-container">
		<app-header></app-header>
		<div class="item-content">
			<!-- 演示操作 -->
			<div class="functions">
				<mt-button type="default" size="large" @click="showE">纯提示</mt-button>
				<mt-button type="default" size="large" @click="showA">添加提示标题</mt-button>
				<mt-button type="default" size="large" @click="showB">确定+取消</mt-button>
				<mt-button type="default" size="large" @click="showC">很多内容</mt-button>
				<mt-button type="default" size="large" @click="showD">插入HTML标签内容</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'mint-ui'
Vue.component(Button.name, Button)
import { MessageBox } from '~/index' //--本地引入方式调试
import AppHeader from '../appHeader'
export default {
	data() {
		return {}
	},
	components: {
		AppHeader
	},
	watch: {},
	created() {},
	mounted() {
		// MessageBox({
		// 	title: '',
		// 	text: '没有取消按钮',
		// 	ok: '确认',
		// 	callback: x => {
		// 		this.msg = '提示按钮点击回调' + x
		// 		console.log('提示按钮点击回调', x)
		// 	}
		// })
	},
	methods: {
		showA() {
			MessageBox({
				title: '提示',
				text: '添加提示标题',
				ok: '确认',
				callback: x => {
					this.msg = '提示按钮点击回调' + x
					console.log('提示按钮点击回调', x)
				}
			})
		},
		showB() {
			MessageBox({
				title: '提示',
				text: '确定+取消',
				ok: '确认',
				cancel: '取消',
				callback: x => {
					console.log('按钮回调', x)
					this.msg = '按钮回调' + x + '，点击了' + (x ? '确定' : '取消') + '按钮'
				}
			})
		},
		showC() {
			MessageBox({
				title: '提示',
				text: '很长的内容很长的内容很长的内容很长的内容很长的内容很长的内容很长的内容很长的内容很长的内容...',
				ok: '确认',
				cancel: '取消',
				callback: x => {
					console.log('按钮回调', x)
					this.msg = '按钮回调' + x
				}
			})
		},
		showD() {
			MessageBox({
				title: '提示',
				text: '<span class="red">大神</span>你好<br /><hr/><p>列表</p><ul><li>列表</li><li>列表</li></ul>',
				html: true,
				ok: '确认',
				callback: x => {
					console.log('按钮回调', x)
					this.msg = '按钮回调' + x
				}
			})
		},
		showE() {
			MessageBox('纯提示')
		}
	}
}
</script>

<style lang="less" scoped>
.demo-container {
	.functions {
		.mint-button {
			margin: 0 0 0.5rem 0;
			cursor: pointer;
		}
	}
}
</style>
