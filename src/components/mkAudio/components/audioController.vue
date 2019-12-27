<template>
    <div class="audio-controller-wrap">
        <div class="play-bar">
            <!-- <i class="icon-random" v-if="mode === 1" @click="playMode"></i> -->
            <button class="btn-play-mode" v-if="mode === 1" @click="playMode">
                <i class="iconfont icon-random"></i>
            </button>
            <button class="btn-play-mode" v-else-if="mode === 2" @click="playMode">
                <i class="iconfont icon-loop"></i>
            </button>
            <button class="btn-play-mode" v-else-if="mode === 3" @click="playMode">
                <i class="iconfont icon-danquxunhuan"></i>
                <!-- <svg class="icon-svg-one-loop">
                    <use xlink:href="#oneLoop"></use>
                </svg> -->
            </button>
            <button class="btn-prev" @click="prev">
                <i class="iconfont icon-skip_previous"></i>
                <!-- <svg class="icon-svg-prev">
                    <use xlink:href="#prev"></use>
                </svg> -->
            </button>
            <button class="btn-play" v-if="!isPlaying" @click="doPlay">
                <i class="iconfont icon-play_1"></i>
            </button>
            <button class="btn-pause" v-else @click="doPause">
                <i class="iconfont icon-pause"></i>
            </button>
            <button class="btn-next" @click="next">
                <i class="iconfont icon-skipnext"></i>
            </button>
            <button class="btn-play-menu" @click="playMenu">
                <i class="iconfont icon-menu"></i>
            </button>
        </div>
    </div>
</template>
<script>
import eventBus from '@components/eventBus';
export default {
    name: 'audio-controller',
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
        // 播放事件
        play: {
            type: Function,
            required: !!1,
        },
        // 暂停事件
        pause: {
            type: Function,
            required: !!1,
        },
        // 播放状态
        isPlaying: {
            type: Boolean,
            required: !!1,
        },
        // 平台
        platform: {
            type: String,
            required: !!1,
            default: 'pc'
        },
        // 播放方式
        mode: {
            type: Number,
            required: !!1,
        }
        
    },
    data() {
        return {}
    },
    components: {},
    mounted () {},
    methods:{
        // 开始播放
        doPlay () {
            this.play();
        },
        // 暂停播放
        doPause () {
            this.pause();
        },
        // 前一首
        prev () {
            eventBus.$emit('audio.prevOrNext', -1);
        },
        // 后一首
        next () {
            eventBus.$emit('audio.prevOrNext', 1);
        },
        // 播放模式：随机，循环，单曲循环
        playMode () {
            eventBus.$emit('audio.playMode');
        },
        playMenu () {

        }
    },
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin.less';

.play-bar {
    .fj(space-between);
    padding: .2rem 0;
    // .px2rem(height, 100);
    .wh(100%; 2rem);
    // .btn-play, .btn-pause {
    //     position: relative;
    //     margin: 0 2rem;
    //     // .center();
    //     .wh(.8rem; .8rem;);
    //     // background-color: #eee;
    //     background-color: transparent;
    //     border-radius: 50%;
    //     border: #eee solid .05rem;
    // }
    // .btn-play {
    //     .px2rem(width, 80);
    //     .px2rem(height, 80);
    //     border: #aaa solid 1px;
    //     border-radius: 50%;
    // }
    // .btn-pause:before {
    //     position: absolute;
    //     left: .56rem;
    //     top: .56rem;
    //     content: '';
    //     .wh(.8rem; .8rem;);
    //     border-style: double;
    //     border-width: 0px 0px 0px .8rem;
    //     border-color: #eee;
    // }
    .btn-play, 
    .btn-prev, 
    .btn-next, 
    .btn-pause,
    .btn-play-menu {
        .fj(center);
        // .wh(2rem; 2rem;);
        background-color: transparent;
        // border-radius: 50%;
        // border: #ED682D solid 1px;
    }
    // .icon-svg-next {
    //     .wh(1rem; 1rem;);
    //     fill: #eee;
    // }
    // .icon-svg-prev {
    //     .wh(1rem; 1rem;);
    //     fill: #eee;
    // }

    .btn-play-mode {
        // margin: 0 1rem 0 0;
        // .wh(1rem; .8rem;);
        background-color: transparent;
    }
    .icon-random,
    .icon-loop,
    .icon-danquxunhuan,
    .icon-menu {
        .px2rem(font-size, 36);
    }
    .icon-skip_previous,
    .icon-skipnext {
        .px2rem(font-size, 70);
    }
    .icon-play_1,
    .icon-pause {
        .px2rem(font-size, 90);
    }
    .icon-random:before,
    .icon-loop:before,
    .icon-danquxunhuan:before,
    .icon-skip_previous:before,
    .icon-play_1:before,
    .icon-pause:before,
    .icon-skipnext:before,
    .icon-menu:before {
        color: #ccc;
    }
}
</style>