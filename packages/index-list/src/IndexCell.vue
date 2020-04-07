<template>
	<div class="index-cell">
		<div class="index-cell-left">
			<slot name="left"></slot>
		</div>
		<div class="index-cell-wrapper">
			<div class="index-cell-title">
				<slot name="title">
					<span class="index-cell-text" v-text="title"></span>
					<span v-if="label" class="index-cell-label" v-text="label"></span>
				</slot>
			</div>
			<div class="index-cell-desc" v-if="desc">
				<slot>
					<span v-text="desc"></span>
				</slot>
			</div>
		</div>
		<div class="index-cell-right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
/**
 * index-cell
 * @module components/cell
 * @desc 单元格
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {string} [desc] - 右侧显示文字
 * @param {slot} - 同 desc, 会覆盖 desc 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 */
export default {
	name: 'index-cell',
	props: {
		title: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		desc: {
			type: String,
			default: ''
		}
	},
	computed: {},
	methods: {
		handleClick($event) {
			$event.preventDefault()
			this.$router.push(this.href)
		}
	}
}
</script>

<style lang="less" scoped>
.index-cell {
	background-color: #fff;
	box-sizing: border-box;
	color: inherit;
	min-height: 48px;
	display: block;
	overflow: hidden;
	position: relative;
	text-decoration: none;
	&:first-child .index-cell-wrapper {
		background-origin: border-box;
	}
	&:last-child {
		background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-size: 100% 1px;
		background-repeat: no-repeat;
		background-position: bottom;
	}
	.index-cell-wrapper {
		background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
		background-size: 120% 1px;
		background-repeat: no-repeat;
		background-position: top left;
		background-origin: content-box;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		box-sizing: border-box;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		font-size: 16px;
		line-height: 1;
		min-height: inherit;
		overflow: hidden;
		padding: 0 10px;
		width: 100%;
	}
	.index-cell-text {
		vertical-align: middle;
	}
	.index-cell-label {
		color: #888;
		display: block;
		font-size: 12px;
		margin-top: 6px;
	}
	.index-cell-title {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.index-cell-desc {
		color: #888;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.index-cell-left {
		position: absolute;
		height: 100%;
		left: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
	.index-cell-right {
		position: absolute;
		height: 100%;
		right: 0;
		top: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
	.index-cell-allow-right::after {
		border: solid 2px #c8c8cd;
		border-bottom-width: 0;
		border-left-width: 0;
		content: ' ';
		top: 50%;
		right: 20px;
		position: absolute;
		width: 5px;
		height: 5px;
		-webkit-transform: translateY(-50%) rotate(45deg);
		transform: translateY(-50%) rotate(45deg);
	}
}
</style>
