<template>
	<transition name="fade" v-if="isShow">
		<div class="fd-index-list">
			<div class="index-header" @click="selectAreaCode(selected)" v-if="selected">
				<div class="index-header-title">
					<span v-if="selected.name">{{ selected.name }} {{ selected.code || selected.label }}</span>
					<span v-else>暂未选中数据</span>
					<i class="iconfont icon-success" v-if="selected.name"></i>
				</div>
			</div>
			<ul
				class="index-list"
				ref="Content"
				:style="{ height: currentHeight + 'px', 'margin-right': navWidth + 'px', 'padding-top': selected ? '48px' : '0px' }"
			>
				<index-section v-for="(item, index) in setCodeArr" :index="item.type" :key="index">
					<index-cell
						v-for="(items, index) in item.list"
						:key="index"
						:title="items.name"
						:desc="items.desc"
						:label="items.code || items.label"
						@click.native="selectAreaCode(items)"
					></index-cell>
				</index-section>
			</ul>
			<div class="index-nav" @touchstart="handleTouchStart" ref="Nav" :style="{ top: selected ? '48px' : '0px' }">
				<ul class="index-nav-list">
					<li class="index-nav-item" v-for="(section, sIndex) in sections" :key="sIndex">{{ section.index }}</li>
				</ul>
			</div>
			<div class="index-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
		</div>
	</transition>
</template>

<script>
import IndexSection from './IndexSection.vue'
import IndexCell from './IndexCell.vue'
export default {
	name: 'fd-index-list',
	props: {
		value: {
			// v-model绑定，是否展示
			type: Boolean,
			default: false
		},
		indexData: {
			// 地区列表数据
			type: Array,
			default: [],
			required: true
		},
		height: Number,
		selected: {
			// 默认选中值
			type: Object,
			default: ''
		},
		onSelected: {
			// 选中回调
			type: Function,
			default: null
		},
		showIndicator: {
			type: Boolean,
			default: true
		},
		isShowHot: {
			type: Boolean,
			default: false
		}
	},
	components: {
		'index-section': IndexSection,
		'index-cell': IndexCell
	},
	data() {
		return {
			isShow: false,
			isShowIndicator: true,
			sections: [],
			navWidth: 0,
			indicatorTime: null,
			moving: false,
			firstSection: null,
			currentIndicator: '',
			currentHeight: this.height,
			navOffsetX: 0,
			setCodeArr: []
		}
	},
	created() {
		this.isShow = this.value
		this.setCodeArr = this.indexData
		this.isShowIndicator = this.showIndicator
	},
	mounted() {
		if (!this.currentHeight) {
			window.scrollTo(0, 0)
			requestAnimationFrame(() => {
				this.currentHeight = document.documentElement.clientHeight - this.$refs.Content.getBoundingClientRect().top
			})
		}
		this.init()
	},
	watch: {
		value(val) {
			this.isShow = val
		},
		showIndicator(val) {
			this.isShowIndicator = val
		},
		sections() {
			this.init()
		},
		height(val) {
			if (val) {
				this.currentHeight = val
			}
		}
	},
	methods: {
		selectAreaCode(val) {
			//this.close()
			this.$emit('onSelected', val)
		},
		init() {
			this.$nextTick(() => {
				this.navWidth = this.$refs.Nav.clientWidth
			})
			let listItems = this.$refs.Content.getElementsByTagName('li')
			if (listItems.length > 0) {
				this.firstSection = listItems[0]
			}
		},
		handleTouchStart(e) {
			if (e.target.tagName !== 'LI') {
				return
			}
			this.navOffsetX = e.changedTouches[0].clientX
			this.scrollList(e.changedTouches[0].clientY)
			if (this.indicatorTime) {
				clearTimeout(this.indicatorTime)
			}
			this.moving = true
			window.addEventListener('touchmove', this.handleTouchMove)
			window.addEventListener('touchend', this.handleTouchEnd)
		},
		handleTouchMove(e) {
			if (e) {
				e.preventDefault()
			}
			this.scrollList(e.changedTouches[0].clientY)
		},
		handleTouchEnd() {
			this.indicatorTime = setTimeout(() => {
				this.moving = false
				this.currentIndicator = ''
			}, 500)
			window.removeEventListener('touchmove', this.handleTouchMove)
			window.removeEventListener('touchend', this.handleTouchEnd)
		},
		scrollList(y) {
			let currentItem = document.elementFromPoint(this.navOffsetX, y)
			if (!currentItem || !currentItem.classList.contains('index-nav-item')) {
				return
			}
			this.currentIndicator = currentItem.innerText
			let targets = this.sections.filter(section => section.index === currentItem.innerText)
			let targetDOM
			if (targets.length > 0) {
				targetDOM = targets[0].$el
				this.$refs.Content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top
			}
		},
		close() {
			// console.log('组件内部关闭')
			this.isShow = false
			this.$emit('input', this.isShow)
		}
	}
}
</script>

<style lang="less" scoped>
.fd-index-list {
	width: 100%;
	position: relative;
	z-index: 999;
	overflow: hidden;
	// -webkit-overflow-scrolling: touch;
	.index-header {
		background-color: #fff;
		box-sizing: border-box;
		color: inherit;
		height: 48px;
		line-height: 48px;
		display: block;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		text-decoration: none;
		border-bottom: 1px solid #d9d9d9;

		.index-header-title {
			padding: 0 10px;
			font-size: 16px;
		}

		.icon-success {
			font-size: 18px;
			position: absolute;
			top: 0;
			right: 10px;
			//color: #137cff;
		}
	}

	.index-list {
		margin: 0;
		padding: 0;
		overflow: auto;
		//padding-top: 48px;
		// margin-top: -1px;
		// min-height: calc(100% + 1px);
	}
	.index-nav {
		position: absolute;
		//top: 48px;
		bottom: 0;
		right: 0;
		margin: 0;
		background-color: #fff;
		border-left: solid 1px #ddd;
		text-align: center;
		max-height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}

	.index-nav-list {
		padding: 0;
		margin: 0;
		list-style: none;
		max-height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.index-nav-item {
		padding: 2px 6px;
		font-size: 13px;
		//color: #137cff;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-touch-callout: none;
	}

	.index-indicator {
		position: absolute;
		width: 55px;
		height: 50px;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		text-align: center;
		line-height: 50px;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 5px;
		color: #fff;
		font-size: 22px;
	}
}
</style>
