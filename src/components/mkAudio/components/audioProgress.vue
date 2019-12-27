<template>
    <div class="audio-player-progress">
        <div class="progress-wrap">
            <span class="current-time">{{curTime}}</span>
            <div 
                class="progress-bar" 
                ref="$progressBar"
                @mousedown.stop.prevent="mousedownOnProgress">
                <div 
                    class="progress" 
                    ref="$progress"
                    :style="progressStyle"></div>
                <button 
                    v-if="isMobile"
                    class="audio-ball" 
                    ref="$ball"
                    :style="ballStyle"
                    @touchstart.stop.prevent="progressTouchStart"
                    @touchend.stop.prevent="progressTouchStop"
                    @touchmove.stop.prevent="progressDrag"></button>
                <button 
                    v-else
                    class="audio-ball" 
                    ref="$ball"
                    :style="ballStyle"
                    @mousedown.stop.prevent="progressDragStart"
                    @mouseup.stop.prevent="progressDragStop"></button>
            </div>
            <span class="total-time">{{total}}</span>
        </div>
    </div>
</template>
<script>
import eventBus from '@components/eventBus';

const formatTime = second => {
    let secondType = typeof second;
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2);
    } else {
        return '0:00:00';
    }
}



export default {
    name: 'audio-player-progress',
    props: {
        canPlay: {
            type: Boolean,
            required: !!1,
        },
        // 当前时间
        currentTime: {
            type: [Number, String],
            required: !!1,
        },
        // 总时间
        totalTime: {
            type: [Number, String],
            required: !!1,
        },
        // 平台
        platform: {
            type: String,
            required: !!1,
            default: 'pc'
        }
    },
    data() {
        return {
            body: null,
            pointX: 0,                      // 滑竿横轴位移
            rect: {},                       // 进度条物理空间数据
        }
    },
    components: {
        
    },
    computed: {
        
        // 当前播放时间
        curTime () {
            return formatTime(this.currentTime);
        },
        // 当前资源总时长
        total () {
            return formatTime(this.totalTime);
        },
        playPercent () {
            return this.currentTime / this.totalTime;
        },
        dragPercent () {
            return this.pointX / this.rect.width;
        },
        progressStyle () {
            return { 'width': `${this.pointX}px` }
        },
        // 拖拽点的位移样式
        ballStyle () {
            return { 'transform': `translateX(${this.pointX}px)` }
        },
        isMobile () {
            return this.platform === 'mobile';
        }
    },
    mounted(){
        this.body = document.getElementsByTagName('body')[0];
        const progressPos = this.$refs.$progressBar.getBoundingClientRect();
        const pointWidth = this.$refs.$ball.offsetWidth;
        this.rect = {
            width: parseInt(progressPos.width),
            left: parseInt(progressPos.left),
            right: parseInt(progressPos.right),
            pointWidth,
        }
        eventBus.$on('audio.updateProgress', this.updateProgress);
    },
    methods:{
        // 计算横轴位移
        getOffsetX (posX) {
            const distance = parseInt(posX - this.rect.left );
            const progressWidth = this.rect.width;
            this.pointX = distance > 0 ? distance > progressWidth ? progressWidth : distance : 0;
        },
        // 点击进度条
        mousedownOnProgress (e) {
            if (this.canPlay) {
                const x = e.clientX;
                this.getOffsetX(x);
                eventBus.$emit('audio.updateTime', this.dragPercent);
                eventBus.$emit('audio.updatePlay');
            }            
        },
        // 
        mouseupOnProgress(e){
            this.isOnBall = false;
        },
        // 进度条拖拽开始
        progressDragStart (e) {
            if (!this.isOnBall && this.canPlay) {
                this.isOnBall = true;
                this.progressDragListener();
            }
        },
        // 进度条拖拽结束
        progressDragStop (e) {console.log('鼠标离开')
            if (this.canPlay) {
                const body = this.body;
                !this.isMobile && (
                    body.removeEventListener('mousemove', this.progressDrag),
                    body.removeEventListener('mouseup', this.progressDragStop)
                );
                
                this.dragToPlay();
            }
        },
        // 移动端拖拽开始
        progressTouchStart (e) {
            if (!this.isOnBall && this.canPlay) {
                this.isOnBall = true;
                const x = this.isMobile && e.touches[0].pageX;
                this.getOffsetX(x);
            }
        },
        progressTouchStop (e) {
            if (this.canPlay) {
                eventBus.$emit('audio.updateTime', this.dragPercent );
                this.dragToPlay();
            }
        },
        // 移动端拖拽
        // progressTouchMove (e) {
        //     if(this.isOnBall === true){
        //         const x = this.isMobile ? e.touches[0].pageX : e.clientX;
        //         this.getOffsetX(x);
        //         eventBus.$emit('audio.updateTime', this.dragPercent );
        //     }
        // },
        // 拖拽播放进度
        dragToPlay () {
            if (this.isOnBall) {
                this.isOnBall = false;
                eventBus.$emit('audio.updatePlay');
            }
            
        },

        // body元素的事件监听器
        progressDragListener () {
            if (this.isOnBall) {
                const body = this.body;
                !this.isMobile && (
                    body.addEventListener('mousemove', this.progressDrag),
                    body.addEventListener('mouseup', this.progressDragStop)
                );
            }
        },
        
        // 全局对mousemove事件监听函数
        progressDrag (e) {
            !this.isMobile && e.preventDefault();
            if(this.isOnBall === true){
                const x = this.isMobile ? e.touches[0].pageX : e.clientX;
                this.getOffsetX(x);
                eventBus.$emit('audio.updateTime', this.dragPercent );
            }
        },
        /**
         * @desc 根据播放时间同步进度条
         */
        updateProgress () {
            if (!this.isOnBall) {
                this.pointX = this.playPercent >= 1 ? this.rect.width : parseInt( this.playPercent * this.rect.width);
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin.less';

@progress: .1rem;
@ball: .4rem;
.audio-player-progress {
    
    // padding: .5rem 0;
    .wh(100%; auto;);
    .progress-wrap {
        .fj();
        .wh();
        margin: 0 0 .1rem;
    }
    .current-time {
        padding: 0 .3rem 0 0;
        color: #ccc;
        .px2rem(font-size, 24);
    }
    .total-time {
        padding: 0 0 0 .3rem;
        color: #ccc;
        .px2rem(font-size, 24);
    }
    .progress-bar {
        .box-flex(1);
        position: relative;
        .wh();
        background-color: #aaa;
        border-radius: .1rem;
        cursor: pointer;
    }
    .progress {
        .wh(0; .05rem;);
        background-color: #ED682D;
        border-radius: 2px;
    }
    .audio-ball {
        position: absolute;
        top: (@progress - @ball)/2;
        left: -(@ball/2);
        .wh(@ball; @ball;);
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    }
    .audio-ball:before {
        position: absolute;
        content: '';
        .center();
        .wh(@ball/4; @ball/4;);
        border-radius: 50%;
        background-color: #ff6600;
    }
}
</style>