<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <h2>只有一个元素</h2>
            <swiper :interval="1500" :indicator="true">
                <slide v-for="(item, index) in demoData1" :key="index" :class="map[item]">
                    <div style="height: 300px;line-height: 300px;background-color: #ddd;">{{item}}</div>
                </slide>
            </swiper>

            <h2>文本元素</h2>
            <swiper
                :onChange="onChange"
                :onTransitionend="onTransitionend"
                :defaultSlide="demoData2.defaultSlide"
                :interval="demoData2.interval"
                :arrow="demoData2.arrow"
                :indicator="demoData2.indicator">
                <slide v-for="(item, index) in demoData2.textList" :key="index" :class="map[item]" @click="slideClick(index)">
                    <div :style="{'height': '300px','line-height': '300px','background-color': item.bg}">{{item.text}}</div>
                </slide>
                <h2 class="global" slot="swiper-footer">底部文字</h2>
            </swiper>
            <p>图片轮播，自动播放</p>
            <swiper :autoplay="true">
                <slide v-for="(item, index) in imgList" :key="index">
                    <div style="height: 300px;background-color: #ddd;">
                        <img :src="item" alt="">
                    </div>
                </slide>
            </swiper>

            <h2>通常情况</h2>
            <swiper :onTransitionend="transitionend" ref="swiper" :defaultSlide="0" :interval="1500" :indicator="true" :vLock="true">
                <slide v-for="(item, index) in list" :key="index" :class="map[item]">
                    <div style="height: 100px;background-color: #ddd;">{{item}}</div>
                </slide>
            </swiper>

            <div class="functions">
                <div class="demo-btn">当前是第{{currentSlide}}个slide</div>
                <div class="demo-btn" @click="previous">上一个</div>
                <div class="demo-btn" @click="next">下一个</div>
                <div class="demo-btn" @click="slideTo">滚动到索引=3的</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Slide } from '.'
import AppHeader from '../appHeader'
export default {
    components: {
        Swiper,
        Slide,
        AppHeader
    },
    data() {
        return {
            list: [],
            demoData1: ['哈哈'],
            demoData2: {
                defaultSlide: 3,
                interval: 1500,
                arrow: true,
                indicator: true,
                textList: [
                    {text: 'Hello World', bg: '#c5b9b9'},
                    {text: '你好', bg: '#e66969'},
                    {text: '你好', bg: '#d42222'},
                    {text: '你好', bg: '#878cce'},
                    {text: '你好', bg: '#ddd'}
                ]
            },
            map: {
                0: 'slide a',
                1: 'slide b',
                2: 'slide c',
                3: 'slide d',
                4: 'slide e',
                5: 'slide f'
            },
            currentSlide: 0,
            imgList: [
                'https://bucket-zb-fanba.oss-cn-hangzhou.aliyuncs.com/4b4c9042e3754101ae11d4d97882cbc1.jpg',
                'http://www.nvsay.com/uploads/allimg/161108/172-16110R2214b22.jpg',
                'http://www.nvsay.com/uploads/allimg/161108/172-16110R2220UG.jpg',
                'http://t10.baidu.com/it/u=1863417261,812716211&fm=173&s=FAA0804142D83674D72CC59D0300D083&w=640&h=359&img.JPEG',
                'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/0F/ChMkJlnJyEKIaQO_AM-mbhQo89QAAgyrABQofAAz6aG651.jpg'
            ],
            images: [
                'http://assets.bittyos.com/images/swiper/01.jpg',
                'http://assets.bittyos.com/images/swiper/02.jpg',
                'http://assets.bittyos.com/images/swiper/03.jpg',
                'http://assets.bittyos.com/images/swiper/04.jpg',
                'http://assets.bittyos.com/images/swiper/05.jpg'
            ],
            active: 0,
            options: {
                speed: 500
            }
        }
    },
    mounted() {
        this.fetchList();
    },
    methods: {
        slideClick (x) {
            console.log('当前滑块点击事件', x)
        },
        onChange (x) {
            console.log('激活的滑块已变化', x)
        },
        onTransitionend (x) {
            console.log('滑块停止滑动', x)
        },
        fetchList() {
            this.list = [0, 1, 2, 3, 4, 5];
        },
        transitionend(x) {
            this.currentSlide = x
        },
        previous() {
            this.$refs.swiper.previous();
        },
        next() {
            this.$refs.swiper.next();
        },
        slideTo() {
            this.$refs.swiper.slideTo(3);
        }
    }
}
</script>
