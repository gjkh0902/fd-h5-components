<!--
    音频播放器：唱片界面
 -->
<template>
    <div class="audio-player-info">
        <div 
            class="cover-box" 
            :style="rotateStyle" 
            :class="{reset: reset}" >
            <div class="cover">
                <div class="cover-inner">
                    <img class="cover-image" :src="cover" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eventBus from '@components/eventBus';

// 每秒旋转度数
const perDeg = 2;

export default {
    name: 'audio-info',
    props: {
        cover: {
            type: String,
        },
    },
    data() {
        return {
            playTimeId: '',                         // 播放循环计时器id
            stopTimeId: '',                         // 停止播放计时器id
            time: 0,
            // lastIndex: 0,
            isPlaying: !1,
            reset: !1,
            start: 0,
            center: 180,
            end: 360
        }
    },
    components: {},
    computed: {
        // 旋转角度
        rotateStyle () {
            let deg = Number(perDeg * this.time);
            return { 
                'transform': `rotate(${deg}deg)`,
            };
        },
    },
    mounted(){
        // 
        eventBus.$on('audio.playerInfoReset', this.playerInfoReset);
        eventBus.$on('audio.playerInfoRotate', this.playerInfoRotate);
        eventBus.$on('audio.playerInfoStop', this.playerInfoStop);
    },
    watch: {},
    methods: {

        playerInfoRotate () {
            this.isPlaying = !!1;
            if (this.reset) {
                this.time = 0;
            }
            const timer = () => {
                this.reset = !1;
                // this.time++;
                if (this.isPlaying) {
                    this.time++;
                } else {
                    return;
                }
            }
            if (!this.playTimeId) {
                this.playTimeId = setInterval( timer, 200 );
            } 
        },
        playerInfoStop () {
            this.isPlaying = !1;
            clearInterval(this.playTimeId);
            this.playTimeId = null;
        },
        playerInfoReset () {
            this.playerInfoStop();
            this.reset = !!1;
            this.time = 0;            
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin.less';

.audio-player-info {
    .wh();
    .fj(center);
    overflow: hidden;
}
.cover-box {
    .cover {
        padding: 1.6rem;
        .wh(9rem; 9rem;);
        border-radius: 50%;
        background-color: #222;
        background: -webkit-linear-gradient(top, #0a0a0a, #464646, #0a0a0a);
        // background: -moz-linear-gradient(top, #111, #3a3a3a, #111);
        // background: linear-gradient(top, #111, #3a3a3a, #111);
        border: #000 solid 1px;
        overflow: hidden;
        box-shadow: 0 0 .6rem rgba(0,0,0,.8);
    }
    .cover-inner {
        padding: .4rem;
        .wh(5.8rem; 5.8rem;);
        border-radius: 50%;
        background-color: #0a0a0a;
    }
    .cover-image {
        .wh(5rem; 5rem;);
        border-radius: 50%;
    }
}
.cover-box {
    // transition: 0.5s;
    transform-origin: 4.5rem 4.5rem;
    transition: .2s linear,
    // transition: transform 18s linear infinite;
    // transform: rotate(180deg);
    // animation: rotate 18s linear infinite;
}
.cover-box.reset {
    transition: none;
}
// @keyframes rotate{
//     0%{ transform: rotate(0); }
//     50%{ transform: rotate(180deg); }
//     100%{ transform: rotate(360deg); }
// }
</style>