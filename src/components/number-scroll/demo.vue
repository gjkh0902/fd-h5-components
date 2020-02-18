<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <!-- 数字卷轴 组件 -->
            <h3>数字卷轴 - 数字滚动翻转跳转</h3>
            <number-scroll :num="num" :auto="auto" :delay="delay" ref="NumberScroll"></number-scroll>
            <!-- 演示操作 -->
            <div class="functions">
                <button class="demo-btn" @click="numSet(100)">改为100</button>
                <button class="demo-btn" @click="numSet(76543)">改为76543</button>
                <button class="demo-btn" @click="numRandom">随机增加</button>
                <button class="demo-btn" @click="numIncrease(100)">增加100</button>
                <button class="demo-btn" @click="numIncrease(38361)">增加38361</button>
            </div>
        </div>
    </div>
</template>

<script>
import { NumberScroll } from '.'
import AppHeader from '../appHeader'
export default {
    data() {
        return {
            num: 6156780, // 数字
            auto: true, // 初始化时自动翻转
            delay: 1500
        }
    },
    components: {
        'number-scroll': NumberScroll,
        AppHeader
    },
    created() {},
    mounted() {},
    methods: {
        numSet (x) { // 设置
            this.num = x
        },
        numIncrease (x) { // 增加
            this.num = this.num + x
        },
        numRandom () { // 随机增加
            this.num = this.num + this.getRandomNumber(1000, 900000)
        },
        getRandomNumber (min, max) { // 随机数
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
    }
};
</script>
