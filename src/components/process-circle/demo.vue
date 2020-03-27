<template>
	<div class="demo-container">
		<app-header></app-header>
		<div class="item-content">
			<process-circle
				ref="CircleProcess"
				v-if="isShow"
				:showPercent="showPercent"
				:size="size"
				:autoPlay="true"
				:percent="percent"
				:reload-on-click="reloadOnClick"
				:reload-on-change="reloadOnChange"
				:outWidth="outWidth"
				:outBackColor="outBackColor"
				:outFrontColor="outFrontColor"
				:inFontColor="inFontColor"
				:time="time"
			>
				<!-- <template slot-scope="scope">
                    <div class="circle">
                        {{scope.current)}}
                    </div>
				</template>-->
			</process-circle>
			<div class="functions">
				<mt-button
					type="default"
					size="small"
					@click="reloadOnClick=!reloadOnClick"
					plain
				>{{reloadOnClick ? '点击时不重新加载' : '点击时重新加载'}}</mt-button>

				<mt-button
					type="default"
					size="small"
					@click="reloadOnChange=!reloadOnChange"
					plain
				>{{reloadOnChange ? '变化时不重新加载' : '变化时重新加载'}}</mt-button>

				<mt-button
					type="default"
					size="small"
					@click="showPercent=!showPercent"
					plain
				>{{showPercent ? '不显示内部百分比' : '显示内部百分比'}}</mt-button>

				<mt-button type="default" size="small" @click="reload()" plain>重新加载动画</mt-button>
				<mt-button type="default" size="large" @click="percent=40">修改百分比为40%</mt-button>
				<mt-button type="default" size="large" @click="time=1000">修改时间为1000毫秒</mt-button>
				<mt-button type="default" size="large" @click="outWidth=10">外圈宽度10</mt-button>
				<mt-button type="default" size="large" @click="inFontColor='#2413fd'">内圈字体颜色#2413fd</mt-button>
				<mt-button type="default" size="large" @click="outFrontColor='#2413fd'">外圈颜色#2413fd</mt-button>
				<mt-button type="default" size="large" @click="outBackColor='#2413fd'">外圈底色#2413fd</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'mint-ui'
Vue.component(Button.name, Button)
import { ProcessCircle } from '.'
import AppHeader from '../appHeader'
export default {
	data() {
		return {
			isShow: true, // 显示圈进度
			showPercent: true, // 显示进度百分比
			percent: 80, // 百分数
			time: 1000, // 转圈时间
			size: 250, // 大小
			reloadOnClick: false, // 点击时重新加载
			reloadOnChange: false, // 变化时重新加载
			inFontColor: '#fff', // 内部字颜色
			outWidth: 20, // 外圈宽度
			outFrontColor: '#fff', // 外圈颜色
			outBackColor: 'rgba(252, 79, 23, 0.65)' // 外圈底色
		}
	},
	components: {
		'process-circle': ProcessCircle,
		AppHeader
	},
	created() {},
	mounted() {
		// window.addEventListener('resize', this.handleScroll)
		// window.addEventListener('scroll', this.handleScroll, false)
	},
	methods: {
		reload(x) {
			this.$refs.CircleProcess.reload()
		}
	},
	watch: {
		outFrontColor() {
			this.reload()
		},
		outBackColor() {
			this.reload()
		},
		inFontColor() {
			this.reload()
		},
		outWidth() {
			// 设置外圈宽度，需要重新渲染组件
			this.isShow = false
			this.$nextTick(() => {
				this.isShow = true
			})
		}
	}
}
</script>

<style lang="less">
.demo-container {
	.item-content {
		margin-top: 1.5rem;
	}
	.functions {
		.mint-button {
			margin: 0 0.5rem 0.5rem 0;
			cursor: pointer;
		}
	}
}
</style>