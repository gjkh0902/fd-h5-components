<template>
	<!-- Alert 弹框提示 -->
	<transition name="fade" v-if="isShow">
		<div class="fd-alert-contanner">
			<div class="alert-contanner">
				<div class="alert-body">
					<p class="alert-title" v-if="alert_title">{{ alert_title }}</p>
					<div class="alert-html" v-if="alert_html" v-html="alert_text"></div>
					<p class="alert-text" v-else>{{ alert_text }}</p>
				</div>
				<div class="alert-footer">
					<div class="alert-btn cancel" v-if="alert_cancal" @click="doCancel">{{ alert_cancal }}</div>
					<div class="alert-btn ok" @click="doOK">{{ alert_ok }}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'fd-alert',
	props: {
		isShow: {
			// v-model 绑定 是否展示
			required: true,
			type: Boolean,
			default: false
		},
		callback: {
			// 点击按钮回调函数
			type: Function,
			default: null
		},
		ok: {
			// 提示按钮
			type: String,
			default: '确定'
		},
		cancel: {
			// 取消按钮
			type: String,
			default: ''
		},
		title: {
			// 提示标题
			type: String,
			default: '提示'
		},
		text: {
			// 提示内容
			required: true,
			type: String,
			default: ''
		},
		html: {
			// 提示内容为HTML
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			//isShow: false,
			alert_title: '',
			alert_text: '',
			alert_ok: '',
			alert_cancal: '',
			alert_html: false
		}
	},
	created() {
		//this.isShow = this.show
		this.alert_title = this.title
		this.alert_text = this.text
		this.alert_ok = this.ok
		this.alert_cancal = this.cancel
		this.alert_html = this.html
	},
	watch: {
		isShow(v) {
			this.isShow = v
		},
		title(v) {
			this.alert_title = v
		},
		text(v) {
			this.alert_text = v
		},
		ok(v) {
			this.alert_ok = v
		},
		cancel(v) {
			this.alert_cancal = v
		},
		html(v) {
			this.alert_html = v
		}
	},
	methods: {
		do(x) {
			this.close()
			if (Object.prototype.toString.call(this.callback) === '[object Function]') {
				this.callback(x)
			}
		},
		doOK() {
			this.do(true)
		},
		doCancel() {
			this.do(false)
		},
		close() {
			// console.log('alert close')
			this.isShow = false
			this.$emit('input', this.isShow)
		}
	}
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/mixin.less');
.fd-alert-contanner {
	.wh();
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(1, 1, 1, 0.7);
	z-index: 11;
	.alert-contanner {
		width: 7.2rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.px2rem(padding-top, 40);
		.px2rem(border-radius, 26);
		background-color: #fff;
		.alert-body {
			.px2rem(padding-left, 30);
			.px2rem(padding-right, 30);
			.px2rem(padding-bottom, 40);
			color: #9b9b9b;
			font-weight: 400;
			font-family: PingFangSC-Regular, PingFang SC;
			.alert-title {
				.px2rem(font-size, 36);
				.px2rem(line-height, 50);
				.px2rem(padding-bottom, 20);
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #4a4a4a;
				text-align: center;
			}
			.alert-text {
				.px2rem(font-size, 28);
				.px2rem(line-height, 40);
				text-align: center;
			}
			.alert-html {
				.px2rem(font-size, 28);
				.px2rem(line-height, 40);
			}
		}
		.alert-footer {
			.px2rem(height, 90);
			.fj();
			.px2rem(border-top-width, 1);
			border-top-style: solid;
			border-top-color: #e9e9e9;
			.alert-btn {
				.fa();
				.px2rem(font-size, 36);
				.px2rem(line-height, 44);
				flex: 1;
				height: 100%;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #9b9b9b;
				text-align: center;
				cursor: pointer;
				&.ok {
					color: #fd5e02;
				}
				& + .alert-btn {
					.px2rem(border-left-width, 1);
					border-left-style: solid;
					border-left-color: #e9e9e9;
				}
			}
		}
	}
}
</style>
