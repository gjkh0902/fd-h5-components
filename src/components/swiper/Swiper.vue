
<template>
    <div class="swiper-container" @touchmove="fn">
        <div class="swiper-wrapper" :class="swiperWrapperCSSClass" ref="swiperWrapper"
            @transitionend="transitionend"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend">
            <slot/>
        </div>
        <!-- 指示器 -->
        <slot name="indicator">
            <div class="swiper-indicator" v-if="isShowIndicator">
                <div v-for="(item, index) in reallySlidesNumber" :key="index"
                    @click="indicatorClick(index)" :class="['swiper-indicator-bullet', {'swiper-indicator-bullet-active' : currentSlide == index}]">
                </div>
            </div>
        </slot>
        <!-- 左右切换 -->
        <slot name="arrowLeft">
            <div v-if="isShowArrow" class="swiper-arrow swiper-arrow-left" @click="previous"></div>
        </slot>
        <slot name="arrowRight">
            <div v-if="isShowArrow" class="swiper-arrow swiper-arrow-right" @click="next"></div>
        </slot>
        <!-- 底部插槽 -->
        <slot name="swiper-footer"/>
    </div>
</template>
<script>
    function toArray(arraylike) {
        return Array.prototype.slice.call(arraylike);
    }
    export default {
        name: 'Swiper',
        props: {
            duration: { // 一次滑动的默认时间
                type: Number,
                default: 500
            },
            interval: { // 两次滑动的间隔时间
                type: Number,
                default: 2500
            },
            autoplay: { // 是否自动播放
                type: Boolean,
                default: false
            },
            therehold: { // 用户滑动多少距离, 翻页
                type: Number,
                default: 110
            },
            defaultSlide: { // 默认选中
                type: Number,
                default: 0
            },
            indicator: { // 是否显示指示器
                type: Boolean,
                default: true // [true: 显示, false: 不显示]
            },
            scrollX: { // 有时候全屏滚动, 的确想要禁用垂直方向的滚动的时候
                type: Boolean,
                default: true // [true: 允许, false: 禁止]
            },
            arrow: { // 是否显示左右切换图标
                type: Boolean,
                default: false // [true: 显示, false: 不显示]
            },
            indicatorCanClick: { // 指示器是否可点击
                type: Boolean,
                default: true // [true: 可以, false: 不可以]
            },
            onTransitionend: { // 滑动结束时触发
                type: Function,
                default: null
            },
            onChange: { // 当前激活的滑块变化后触发
                type: Function,
                default: null
            }
        },
        data () {
            return {
                swiper: null,
                swiperWidth: 0,
                slides: null,
                slidesNumber: 0,
                reallySlidesNumber: 0,
                currentSlide: 0, // 当前滑块
                timer: null,
                userDuration: 200,
                pos: {
                    startX: 0,
                    moveX: 0,
                    endX: 0,
                    local: 0,
                    distance: 0
                },
                moving: false,
                unlock: false,
                activeId: '',
                mousedown: false,
                swiperWrapperCSSClass: '',
                isOnly: false, // 只有一个元素
                isShowIndicator: false, // 指示器
                isShowArrow: false
            }
        },
        created() {
            this.isShowIndicator = this.indicator
            this.isShowArrow = this.arrow
        },
        mounted () {
            this.swiperWrapperCSSClass = 'swiper-wrapper-' + Math.random().toFixed(2) * 1000
            setTimeout(() => {
                // 初始化的时候, 拿到所有的 DOM 元素以及相关属性
                this.initElement()
                if (this.isOnly) {
                    return
                }
                // 克隆两个节点, 用来实现 loop 效果
                this.cloneSlide()
                /*克隆结束之后, 需要设置默认显示的slide*/
                this.setDefaultSlide()
                /*
                    ## start
                    设置默认slide之后, 就需要开始设置定时器, 自动轮播
                */
                // 自动轮播
                if (this.autoplay) {
                    this.play()
                }
            }, 100)
        },
        methods: {
            /*阻止容器的上下滚动, 并且只有在水平方向上面滚动超过 10px 才可以阻止 */
            fn (e) {
                if (!this.scrollX || Math.abs(this.pos.startX - this.pos.moveX) > 10) {
                    e.preventDefault()
                }
            },
            slideTo (index) {
                // 滑动到指定的页面
                if (!this.moving) {
                    let currentSlide = Math.round(Math.abs(this.left()) / this.swiperWidth)
                    /* 如果索引值不合法 或者和目前的值相等 */
                    if (index > this.slidesNumber - 2 - 1 || index < 0 || currentSlide == index + 1) {
                        return
                    }
                    this.moving = true;
                    clearTimeout(this.timer)
                    /*
                        说明要往右边滑动
                        注意这里不管需要滑动多少个, duration 都是 300, 这个如果需要, 可以
                        自己根据起点/终点计算出一个合适的值.
                    */
                    this.transitionDuration(300)

                    this.translateX(-this.swiperWidth * (index + 1))
                }
            },
            next () {
                // 下一个
                if (!this.moving) {
                    clearTimeout(this.timer)
                    this.moving = true
                    this.transitionDuration(this.userDuration)
                    this.translateX(this.left() - this.swiperWidth)
                }
            },
            previous () {
                // 上一个
                if (!this.moving) {
                    clearTimeout(this.timer)
                    this.moving = true
                    this.transitionDuration(this.userDuration)
                    this.translateX(this.left() + this.swiperWidth)
                }
            },
            initElement () {
                /* 因为传递过来的是个字符串, 所以要手动加点 */
                // this.swiper = document.querySelector('.' + this.swiperWrapperCSSClass)
                this.swiper = this.$refs.swiperWrapper
                this.swiperWidth = this.swiper.clientWidth;
                this.slides = toArray(this.swiper.children);
                this.slidesNumber = this.slides.length;
                /*实际的 slide 个数, 因为 slidesNumber 会在后面重新赋值*/
                this.reallySlidesNumber = this.slides.length
                /* 如果就仅仅只有一个 slide, 那么不克隆, 不绑定, 就纯展示就可以了 */
                if (this.reallySlidesNumber === 1) {
                    this.isOnly = true
                }
            },
            cloneSlide () {
                let head = this.slides[0].cloneNode(this.slides[0], true);
                let tail = this.slides[this.slidesNumber - 1].cloneNode(this.slides[this.slidesNumber-1], true);
                this.swiper.appendChild(head);
                this.swiper.insertBefore(tail, this.slides[0]);
                /*克隆节点之后, 需要重置一些属性*/
                this.slides = toArray(this.swiper.children);
                this.slidesNumber = this.slides.length;
            },
            /* 根据用户给定的 defaultSlide 设置 init slide 的值 */
            setDefaultSlide () {
                /*
                    一切用户给定的值, 都是从 0 - x 开始, 比如用户数据里面有 6个数据
                    那么给定的就是 0 - 5
                    但是我们内部运算的时候, 实际上我们的索引能到 0 - 7
                    0 是实际的 5 的拷贝, 7 实际上是实际的0的拷贝
                    所以当用户给定的 defaultSlide =0, 我们实际上是要让展示内部索引为 1 的元素
                */
                /* 如果用户设置了一个非法值, 直接抛出异常*/
                if (this.defaultSlide < 0 || this.defaultSlide > this.slidesNumber - 2 - 1) {
                    throw new Error('[swiper:Error]: You have set a wrong defaultSlide value with defaultSlide = ' + this.defaultSlide)
                }
                this.translateX(-this.swiperWidth * (this.defaultSlide + 1))
                this.currentSlide = this.defaultSlide
            },
            /*
                ## start
            */
            play () {
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.moving = true
                    this.unlock = false
                    this.transitionDuration(this.duration);
                    // console.log(this.swiperWidth)
                    // console.log(this.left())
                    this.translateX(- (this.swiperWidth + Math.abs(this.left())));
                }, this.interval);
            },
            transitionend () {
                this.transitionDuration(0)
                /*
                    一次滑动结束之后, 通过计算, 实际上我们可以拿到当前处于内部索引的第几个 slide
                    拿到这个 currentSlide 我们就知道当前是不是滚动到最后一个了
                */
                let currentSlide = Math.round(Math.abs(this.left()) / this.swiperWidth)
                this.currentSlide = currentSlide - 1
                /* 如果滚动到最后一个, 那么就要瞬间跳转一下, 到外部看起来的第一个, 内部的*/
                if (currentSlide == this.slidesNumber - 1) {
                    this.translateX(-this.swiperWidth)
                    this.currentSlide = 0
                }
                if (currentSlide == 0) {
                    this.translateX(-this.swiperWidth * (this.slidesNumber - 2))
                    this.currentSlide = this.slidesNumber - 3;
                }
                if (Object.prototype.toString.call(this.onTransitionend) === '[object Function]') {
                    this.onTransitionend(this.currentSlide)
                }
                /*
                    防止极限操作, 用户在滑动结束之后事件还没发送出去又滑动导致计算
                    结果错误, 所以等事件发出去之后再解开
                */
                this.moving = false;
                /*
                    ##start
                */
                if (this.autoplay) {
                    this.play();
                }
            },
            /*toushstart handler*/
            touchstart (e) {
                if (this.isOnly) {
                    return
                }
                if (e.type === 'mousedown' && !this.moving) {
                    this.mousedown = true;
                    this.pos.startX = e.pageX;
                    this.pos.local = this.left();
                    clearTimeout(this.timer);
                    this.transitionDuration(0);
                } else {
                    this.activeId = toArray(e.changedTouches)[0].identifier;
                    if (!this.moving) {
                        let active = e.touches.length - 1;
                        clearTimeout(this.timer);
                        this.transitionDuration(0);
                        this.unlock = true;
                        this.pos.startX = e.touches[active].clientX;
                        /* 一次 touch 的 起始local 点, 是固定的 */
                        this.pos.local = this.left();
                    }
                }
            },
            /*toushmove handler*/
            touchmove (e) {
                if (this.isOnly) {
                    return
                }
                if (e.type === 'mousemove' && this.mousedown && !this.moving) {
                    this.pos.moveX = e.pageX;
                    this.pos.distance = this.pos.moveX - this.pos.startX;
                    this.translateX(this.pos.local + this.pos.distance);
                } else if (!this.moving && this.unlock) {
                    let active = e.touches.length - 1;
                    this.pos.moveX = e.touches[active].clientX;
                    this.pos.distance = this.pos.moveX - this.pos.startX;
                    this.translateX(this.pos.local + this.pos.distance);
                }
            },
            /*toushend handler*/
            touchend (e) {
                if (this.isOnly) {
                    return
                }
                if (e.type === 'mouseup' && this.mousedown && !this.moving) {
                    this.mousedown = false;
                    this.pos.endX = e.pageX;
                    this.pos.distance = this.pos.endX - this.pos.startX;
                    this.recover();
                } else {
                    let curId = toArray(e.changedTouches)[0].identifier;
                    if (!this.moving && this.unlock && (curId == this.activeId)) {
                        this.unlock = false;
                        this.pos.endX = e.changedTouches[0].clientX;
                        this.pos.distance = this.pos.endX - this.pos.startX;
                        this.recover()
                    }
                }
            },
            /*响应用户滚动行为*/
            recover () {
                this.transitionDuration(this.userDuration);
                let distance = Math.abs(this.left()) % this.swiperWidth;
                let point = [];
                let direction = ''
                /*
                    主要是为了拿到当前状态下面, swiper 距离正常状态的, 左右移动的距离分别是多少.
                */
                if (this.left() > 0) {
                    point = [distance, this.swiperWidth - distance];
                } else {
                    point = [this.swiperWidth - distance, distance];
                }
                if (this.pos.distance > 0) {
                    direction = 'to-right';
                } else if (this.pos.distance < 0){
                    direction = 'to-left';
                } else {
                    direction = 'none';
                }
                if (direction == 'none') {
                    if (this.autoplay) {
                        this.play();
                    }
                }
                if (direction === 'to-right') {
                    this.moving = true;
                    /*说明需要向右边移动*/
                    if (point[0] > this.therehold) {
                        this.translateX(this.left() + point[1]);
                        let next = (this.left() + point[1]) / this.swiperWidth;
                        if (Math.abs(next) === 0) {
                            this.unlock = false;
                        }
                    } else {
                        this.translateX(this.left() - point[0]);
                    }
                }
                if (direction === 'to-left') {
                    this.moving = true;
                    if (point[1] > this.therehold) {
                        this.translateX(this.left() - point[0]);
                        let next = (this.left() - point[0]) / this.swiperWidth;
                        if (Math.abs(next) === this.slidesNumber - 1) {
                            this.unlock = false;
                        }
                    } else {
                        this.translateX(this.left() + point[1]);
                    }
                }
            },
            translateX (value) {
                this.swiper.style.transform = 'translate3d(' + value + 'px, 0, 0)';
            },
            transitionDuration (ms) {
                this.swiper.style.transitionDuration = ms + 'ms'
            },
            left () {
                return this.swiper.getBoundingClientRect().left
            },
            indicatorClick (x) {
                if (!x || !this.indicatorCanClick) {
                    return
                }
                this.slideTo(x)
            }
        },
        watch: {
            currentSlide (val) {
                if (Object.prototype.toString.call(this.onChange) === '[object Function]') {
                    this.onChange(val)
                }
            }
        }
    }
</script>
<style lang="less">
    .swiper-container {
        position: relative;
        width: 100%;
        overflow: hidden;

        .swiper-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
        }
        .swiper-arrow {
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            // background-color: #333;
            // border-radius: 50%;
            top: 50%;
            margin-top: -20px;
            cursor: pointer;
            &.swiper-arrow-left {
                left: 10px;
                border-top: 3px solid #c3c8d6;
                border-right: 3px solid #c3c8d6;
                transform: rotate(-135deg);
                margin-right: 10px;
            }
            &.swiper-arrow-right {
                right: 10px;
                border-top: 3px solid #c3c8d6;
                border-right: 3px solid #c3c8d6;
                transform: rotate(45deg);
            }
        }
        // 分页
        .swiper-indicator {
            position: absolute;
            bottom: 32px;
            height: 18px;
            width: 100%;
            background: transparent;
            display: flex;
            align-items:center;
            justify-content: center;
            .swiper-indicator-bullet {
                height: 8px;
                width: 8px;
                background-color: #FFE4E4;
                margin-top: 0;
                margin-bottom: 0;
                margin-right: 0;
                border-radius: 50%;
                &+.swiper-indicator-bullet {
                    margin-left: 5px;
                }
                &.swiper-indicator-bullet-active {
                    opacity: 1;
                    background-color: #FF4949;
                }
            }
        }
    }
</style>