<template>
    <div class="tabs-nav-container">
        <ul class="tabs-nav-list" ref="tabsNavList" :style="month_style">
            <li class="tabs-nav-item" v-for="(item, index) in innerList" :key="index" @click="selectItem(index)" :class="[{'active': index == cIndex}]">
                <slot name="default" :item="item" :index="index"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'tabs-nav',
    props: {
        list: { // 初始化参数：列表
            required: true,
            type: Array,
            default: []
        },
        currIndex: { // 初始化参数：当前选中的位置
            type: [Number, String],
            default: 0
        },
        onChange: { // 索引变化之后的回调
            type: Function,
            default: null
        }
    },
    data () {
        return {
            innerList: [],
            month_style: {},
            cIndex: 0
        }
    },
    beforeMount () {},
    mounted () {
        // this.innerList = this.list
        // this.$nextTick(() => {
        window.addEventListener('resize', this.handle_center, false)
        // })
    },
    beforeCreate () {},
    computed: {},
    created () {
        // console.log('this.size', this.size)
        this.init()
    },
    methods: {
        init () {
            this.cIndex = this.currIndex
            this.buildList(this.list)
        },
        selectItem (x) {
            // console.log('选中的选中的选中的选中的', x)
            this.cIndex = x
            this.handle_center()
            if (this.onChange) {
                this.onChange(x)
            }
            // let y = this.innerList[x]
            // if (this.currDate && this.currDate == y.year + '-' + y.month) {
            //     this.handle_center()
            //     this.onChange && this.onChange(x)
            //     return
            // }
            // this.currDate = y.year + '-' + y.month
            // this.handle_center()
            // this.onChange && this.onChange(x)
        },
        set_nav_center () {
            // 头部月份内容不超过视图宽度时则居中显示
            if (this.month && this.month.length && this.month.length * 66 < document.body.clientWidth) {
                this.month_style = {
                    'width': this.month.length * 66 + 'px'
                }
            } else {
                this.month_style = {}
                this.$nextTick(() => {
                    this.handle_center()
                })
            }
        },
        handle_center () {
            this.$nextTick(() => {
                // 将 current 放置在 container 中的居中位置
                let container = this.$refs.tabsNavList
                // console.log(container.clientWidth)
                let current = document.querySelector('.tabs-nav-container .tabs-nav-item.active')
                if (container.clientWidth < container.scrollWidth) {
                    // 需要向左移动的距离
                    let left = current.getBoundingClientRect()['left'] +
                        current.getBoundingClientRect()['width'] / 2 -
                        container.clientWidth / 2
                    // console.log('需要向左移动的距离', left)
                    // 右侧多处的宽度
                    let right = container.scrollWidth - container.scrollLeft - container.clientWidth
                    // 最终需要左移的宽度
                    let need = left < right ? left : right
                    // console.log('最终需要左移的宽度', need)
                    // container.scrollLeft = container.scrollLeft + need
                    container.scrollTo({ 
                        left: container.scrollLeft + need, 
                        behavior: 'smooth' 
                    })
                }
            })
        },
        reflash () {
            console.log('reflash')
            this.handle_center()
        },
        buildList (x) {
            let t = []
            if (x) {
                for(let i in x) {
                    t.push(x[i])
                }
            }
            this.innerList = t
        }
    },
    watch: {
        list: {
            handler(val, oldVal) {
                this.buildList(val)
                this.handle_center()
            }
        },
        currIndex: { // 传入参数变化
            handler(val, oldVal) {
                this.cIndex = val
                this.handle_center()
            }
        }
        // cIndex: { // 本地数据变化
        //     handler(val, oldVal) {
        //         this.onChange && this.onChange(val)
        //     }
        // },
        // curItem: { // 传入参数变化
        //     handler(val, oldVal) {
        //         this.currDate = val
        //     }
        // },
        // currDate: {
        //     handler(val, oldVal) {
        //         this.handle_center()
        //     }
        // }
        ,innerList: {
            // UI验收时要求去掉 https://shimo.im/docs/dlta2r0kCJspiSFV
            handler(val, oldVal) {
                this.$nextTick(() => {
                    this.set_nav_center()
                })
            }
        }
    }
}
</script>

<style lang="less">
    .tabs-nav-container {
        height: 46px;
        box-shadow: 0px 0px 0px 0px rgba(221,221,221,1);
        border-bottom: 1px solid #f6f6f6;
        margin-left: auto;
        margin-right: auto;
        .tabs-nav-list {
            width: 100%;
            height: 45px;
            background: rgba(255,255,255,1);
            box-shadow: 0px 0px 0px 0px rgba(221,221,221,1);
            overflow-x: auto;
            overflow-y: hidden;
            display: -webkit-box;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            margin-left: auto;
            margin-right: auto;
            .tabs-nav-item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 66px;
                color: #9B9B9B;
                font-size:16px;
                font-weight: 400;
                color: rgba(155,155,155,1);
                line-height: 16px;
                text-align: center;
                position: relative;
                overflow: hidden;
                &.active {
                    font-weight:bold;
                    color:rgba(74,74,74,1);
                }
                &::after {
                    content: ' ';
                    display: block;
                    height: 3px;
                    width: 36px;
                    position: absolute;
                    // background-color: #fd5e02;
                    bottom: 0;
                    left: 14px;
                    border-radius: 2px;
                }
                &.active::after {
                    background-color: #fd5e02;
                }
                .month-y {
                    width:23px;
                    height:12px;
                    font-size:10px;
                    font-weight:400;
                    color:rgba(155,155,155,1);
                    line-height:12px;
                }
            }
        }
    }
</style>
