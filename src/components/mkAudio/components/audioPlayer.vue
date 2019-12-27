<!--
    音频播放器
    @auther wangweijia
 -->
<template>
    <div class="audio-player-wrap">
        <div class="audio-player">
            <audio-header
                :name="currentMedia.name"
                :singer="currentMedia.singer" />
            <audio-info
                    :cover="currentMedia.cover"
                    :isPlaying="isPlaying" />
            <div class="controller-bar">
                <audio 
                    ref="$audio" 
                    :src="currentMedia.url" 
                    @ended="onEnded" 
                    @play="onPlay" 
                    @loadstart="loadstart"
                    @timeupdate="onTimeUpdate" 
                    @loadedmetadata="onLoaded"
                    @canplay="canplay"
                    @progress="progress"></audio>
                <audio-progress
                    :currentTime="currentTime"
                    :totalTime="totalTime"
                    :canPlay="canPlay"
                    :platform="platform" />
                <audio-controller
                    :currentTime="currentTime"
                    :totalTime="totalTime"
                    :play="playOrPause"
                    :pause="playOrPause"
                    :isPlaying="isPlaying"
                    :canPlay="canPlay"
                    :platform="platform"
                    :mode="mode" />
            </div>
        </div>
        <div class="audio-player-background" :style="playerBackStyle"></div>
    </div>
</template>
<script>
import eventBus from '@components/eventBus';
import AudioHeader from './audioHeader';
import AudioProgress from './audioProgress';
import AudioController from './audioController';
import AudioInfo from './audioInfo';

const ua = navigator.userAgent.toLowerCase();
// 是否为移动端，处理事件兼容及苹果被动播放问题
const isMobile = () => {
    const isIpad = ua.match(/ipad/i) == "ipad";
    const isIphoneOs = ua.match(/iphone os/i) == "iphone os";
    const isUc = ua.match(/ucweb/i) == "ucweb";
    const isAndroid = ua.match(/android/i) == "android";
    const isCE = ua.match(/windows ce/i) == "windows ce";
    const isWM = ua.match(/windows mobile/i) == "windows mobile";
    return isIpad || isIphoneOs || isUc || isAndroid || isCE || isWM;
}
// safari浏览器需要手动触发播放事件
const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
/**
* @param {Array} array The array to shuffle.
* @returns {Array} Returns the new shuffled array.
* @example
*
* shuffle([1, 2, 3, 4])
* // => [4, 1, 3, 2]
*/
const shuffle = array => {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    let index = -1;
    const lastIndex = length - 1;
    const result = array.map(a => a);
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
        const value = result[rand];
        result[rand] = result[index];
        result[index] = value;
    }
    return result;
}

// 获取默认音频数据格式
const getDefaultMedia = () => ({
    url: '',        // 资源地址
    name: '',       // 资源名称
    singer: '',     // 演唱者
    cover: '',      // 封面图
});


export default {
    name: 'audio-player',
    props: {
        resource: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            audio: null,
            mode: 1,                            // 播放模式：1-随机；2-循环；3-单曲循环
            // resource,                          // 资源列表
            currentIndex: 0,                    // 当前播放序列号
            // currentMedia: {},                   // 当前播放音频数据
            // url: '',                            // 当前播放音频地址
            // cover: '',                          // 当前播放音频封面
            // name: '',                           // 当前播放音频名字
            // singer: '',                         // 当前播放音频歌手
            lastIndex: 0,                       // 上一首比方序号
            totalTime: 0,
            currentTime: 0,                     // 当前播放时间
            isPlaying: !1,                     // 是否播放中
            isDragged: !1,                      // 是否被拖拽
            canPlay: !1,                        // 是否能播放
            readyToPlay: !1,                    // 初始化完成准备播放
        }
    },
    components: {
        AudioProgress,
        AudioController,
        AudioHeader,
        AudioInfo,
    },
    computed: {
        // canPlay () {
        //     return !!this.audio;
        // },
        platform () {
            return isMobile() ? 'mobile' : 'pc';
        },
        percent () {
            return this.totalTime ? this.currentTime / this.totalTime : 0;
        },
        // 当前音频
        currentMedia () {
            let media = this.resource[this.currentIndex];
            return media ? media : getDefaultMedia();
        },
        // 当前音频的封面图
        currentMediaCover () {
            return this.currentMedia.cover;
        },
        // 
        playerBackStyle () {
            return { 
                'backgroundImage': `url(${this.currentMediaCover})`,
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'center',
                'backgroundSize': 'cover',
            }
        }
    },
    mounted(){
        this.audio = this.$refs.$audio;
        eventBus.$on('audio.updateTime', this.updateTime);
        eventBus.$on('audio.updatePlay', this.updatePlay);
        eventBus.$on('audio.prevOrNext', this.prevOrNext);
        eventBus.$on('audio.load', this.load);
        eventBus.$on('audio.playMode', this.playMode);
        // 如实pc端则直接加载
        this.platform === 'pc' && this.audio.load();                                                       
    },
    methods:{
        loadstart () {},
        onTimeUpdate (res) {
            if (!this.isDragged) {
                this.currentTime = res.target.currentTime;
                eventBus.$emit('audio.updateProgress', this.percent);
            }
        },
        progress () {},
        onLoaded (res) {
            this.totalTime = parseInt(res.target.duration);
            // 如果前后两首曲子序号不一致，则自动播放
            if (this.lastIndex !== this.currentIndex || this.mode === 3 ) {
                this.play();
            }
        },
        onLoadedData () {
            this.canPlay = !!1;
            this.readyToPlay && this.play();
        },
        canplay () {
            this.canPlay = !!1;
            this.readyToPlay && this.play();
        },
        // 当音频开始播放
        onPlay (res) {},
        // 音频播放完
        onEnded(){
            this.isPlaying = !1;
            switch (this.mode) {
                case 1: 
                    this.prevOrNext();
                    break;
                case 2:
                    this.prevOrNext(1);
                    break;
                case 3:
                    this.prevOrNext();
                    break;
            }
        },
        // 加载资源
        load () {
            this.audio.load();
            this.readyToPlay = !!1;
        },
        // 播放
        play () {
            this.audio.play();
            this.isPlaying = !!1;
            eventBus.$emit('audio.playerInfoRotate');
        },
        // 暂停
        pause () {
            this.audio.pause();
            this.isPlaying = !1;
            eventBus.$emit('audio.playerInfoStop');
        },
        // 播放或暂停
        playOrPause () {
            if (this.platform === 'mobile' && !this.readyToPlay && !this.canPlay) {
                this.load();
            }
            if (this.canPlay) {
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
            } 
        },
        /**
         * @desc    播放前后曲目
         * @param   {Number}    direction   1或者-1
         */
        prevOrNext (direction) {
            direction = direction || 0;
            let index = this.currentIndex;
            const list = this.resource;
            if (this.platform === 'mobile' || isSafari) {
                this.readyToPlay = !1;
            } else {
                this.readyToPlay = !!1;
            }
            // 随机模式
            if (this.mode === 1) {
                this.currentIndex = shuffle(list).findIndex(item => list[index] === item );
            } else {
                this.lastIndex = index;     // 缓存上一首序号
                index = index + direction;
                const max = list.length - 1;
                this.currentIndex = index > max ? 0 : index < 0 ? max : index;
            }
            this.audio.currentTime = this.currentTime = 0;
            
            // this.pause();
            eventBus.$emit('audio.playerInfoReset');
            // 移动端需要手动调用加载
            if (this.platform === 'mobile' || isSafari && !this.readyToPlay) {
                this.load();
            }
        },

        // 根据进度百分比更新播放时间
        updateTime (percent) {
            if (this.canPlay) {
                this.isDragged = !!1;
                this.currentTime = parseInt( percent * this.totalTime);
            }
        },
        // 更新播放
        updatePlay () {
            if (this.canPlay) {
                this.audio.pause();
                this.isPlaying = !1;
                this.audio.currentTime = this.currentTime;
                this.isDragged = !1;
                this.play();
            }
        },
        
        /**
         * @desc    切换播放形式
         */
        playMode () {
            let mode = this.mode;
            mode += 1;
            this.mode = mode = mode > 3 ? 1 : mode;
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin.less';
.audio-player-wrap {
    position: relative;
    .wh();
    background-color: transparent;
    overflow: hidden;
}
.audio-player {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    margin: 0 auto;
    padding: 2rem 0 3rem;
    .wh();
    // background-color: #666;
    background-color: rgba(0,0,0,.5);
}
.controller-bar {
    position: absolute;
    bottom: 0;
    padding: 0 .5rem;
    .wh(100%; auto;);
    // border-top: #666 solid 1px;
    // background-color: #767676;
}
.audio-player-background {
    .wh();
    background-color: rgba(0,0,0, .66);
}
</style>