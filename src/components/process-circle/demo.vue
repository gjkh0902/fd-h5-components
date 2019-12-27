<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <process-circle ref="CircleProcess"
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
                </template> -->
            </process-circle>
            <div class="functions">
                <p>
                    <button class="demo-btn" @click="reloadOnClick=!reloadOnClick">{{reloadOnClick ? '点击时不重新加载' : '点击时重新加载'}}</button>
                    <button class="demo-btn" @click="reloadOnChange=!reloadOnChange">{{reloadOnChange ? '变化时不重新加载' : '变化时重新加载'}}</button>
                    <button class="demo-btn" @click="showPercent=!showPercent">{{showPercent ? '不显示内部百分比' : '显示内部百分比'}}</button>
                    <button class="demo-btn" @click="reload">重新加载动画</button>
                </p>
                <p>
                    <button class="demo-btn" @click="percent=40">修改百分比为40%</button>
                    <button class="demo-btn" @click="percent=70.5">修改百分比为70.5%</button>
                    <button class="demo-btn" @click="percent=90">修改百分比为90%</button>
                    <button class="demo-btn" @click="percent=100">修改百分比为100%</button>
                </p>
                <p>
                    <button class="demo-btn" @click="time=1000">修改时间为1000毫秒</button>
                    <button class="demo-btn" @click="time=1500">修改时间为1500毫秒</button>
                    <button class="demo-btn" @click="time=3000">修改时间为3000毫秒</button>
                </p>
                <p>
                    <button class="demo-btn" @click="outWidth=5">外圈宽度5</button>
                    <button class="demo-btn" @click="outWidth=10">外圈宽度10</button>
                    <button class="demo-btn" @click="outWidth=20">外圈宽度20</button>
                    <button class="demo-btn" @click="outWidth=30">外圈宽度30</button>
                    <button class="demo-btn" @click="outWidth=50">外圈宽度50</button>
                </p>
                <p>
                    <button class="demo-btn" @click="inFontColor='#ddd'">内圈字体颜色#ddd</button>
                    <button class="demo-btn" @click="inFontColor='#fff'">内圈字体颜色#fff</button>
                    <button class="demo-btn" @click="inFontColor='#695b5b'">内圈字体颜色#695b5b</button>
                    <button class="demo-btn" @click="inFontColor='#2413fd'">内圈字体颜色#2413fd</button>
                </p>
                <p>
                    <button class="demo-btn" @click="outFrontColor='#ddd'">外圈颜色#ddd</button>
                    <button class="demo-btn" @click="outFrontColor='#fff'">外圈颜色#fff</button>
                    <button class="demo-btn" @click="outFrontColor='#695b5b'">外圈颜色#695b5b</button>
                    <button class="demo-btn" @click="outFrontColor='#2413fd'">外圈颜色#2413fd</button>
                </p>
                <p>
                    <button class="demo-btn" @click="outBackColor='#ddd'">外圈底色#ddd</button>
                    <button class="demo-btn" @click="outBackColor='#fff'">外圈底色#fff</button>
                    <button class="demo-btn" @click="outBackColor='#695b5b'">外圈底色#695b5b</button>
                    <button class="demo-btn" @click="outBackColor='#2413fd'">外圈底色#2413fd</button>
                </p>
                <p>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { ProcessCircle } from '.'
    import AppHeader from '../appHeader'
    export default {
        data () {
            return {
                isShow: true, // 显示圈进度
                showPercent: true, // 显示进度百分比
                percent: 57, // 百分数
                time: 1000, // 转圈时间
                size: 260, // 大小
                reloadOnClick: false, // 点击时重新加载
                reloadOnChange: false, // 变化时重新加载
                inFontColor: '#fff', // 内部字颜色
                outWidth: 30, // 外圈宽度
                outFrontColor: '#fff', // 外圈颜色
                outBackColor: 'rgba(252, 79, 23, 0.65)' // 外圈底色
            }
        },
        components: {
            'process-circle': ProcessCircle,
            AppHeader
        },
        created () {
            // this.navList = this.navList1
        },
        mounted () {
            // window.addEventListener('resize', this.handleScroll)
            // window.addEventListener('scroll', this.handleScroll, false)
        },
        methods: {
            reload (x) {
                this.$refs.CircleProcess.reload()
            },
        },
        watch: {
            outFrontColor () {
                this.reload()
            },
            outBackColor () {
                this.reload()
            },
            inFontColor () {
                this.reload()
            },
            outWidth () {
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

</style>