<template>
    <div class="vue-audio-container">
        <div :class="['di', 'main-wrap', {'ss': audio.waiting}]">
            <audio ref="audio" class="audio-tag-box"
                :src="url"
                :preload="audio.preload"
                @play="onPlayFun"
                @error="onErrorFun"
                @waiting="onWaiting"
                @pause="onPauseFun"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
            ></audio>
            <div>
                <span @click="startPlayOrPause">{{audio.playing | transPlayPause}}</span>
                <span v-show="!audio_controls.noSpeed" class="speeds" @click="changeSpeed">{{audio.speed | transSpeed}}</span>
                <span>{{ audio.currentTime | formatSecond}}</span>
                <!-- <input type="range" class="slider"
                    @change="changeCurrentTime"
                    :value="sliderTime"
                    v-model="sliderTime"
                    v-show="!audio_controls.noProcess"
                > -->
                <!-- <el-slider v-show="!audio_controls.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider> -->
                <mt-range v-show="!audio_controls.noProcess" v-model="sliderTime" :bar-height="5" @change="changeCurrentTime"></mt-range>
                <span>{{ audio.maxTime | formatSecond }}</span>
                <span v-if="false" v-show="!audio_controls.noMuted" type="text" @click="startMutedOrNot">{{audio.muted | transMutedOrNot}}</span>
                <mt-range v-show="!audio_controls.noVolume" v-model="audio_volume" :bar-height="5" @change="changeVolume"></mt-range>
                <!-- <el-slider v-show="!audio_controls.noVolume" v-model="audio_volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume" class="slider"></el-slider> -->
                <a :href="audio_url" v-show="!audio_controls.noDownload" target="_black" class="download el-icon-download" download>下载</a>
            </div>
        </div>
        <!-- <div v-show="audio.waiting">无效的音频文件</div> -->
        <!-- <div v-loading.fullscreen.lock="aduLoading"></div> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import { Range } from 'mint-ui'

    const realFormatSecond = (second) => {
        let secondType = typeof second
        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)
            let hours = Math.floor(second / 3600)
            second = second - hours * 3600
            let mimute = Math.floor(second / 60)
            second = second - mimute * 60
            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }
    export default {
        name: 'VueAudio',
        props: {
            url: { // 音频URI
                type: String,
                required: true
            },
            speeds: { // 默认速率：只能是1、1.5、2
                type: Number,
                default: 1
            },
            controls: { // 控制器
                type: String,
                default: ''
            },
            autoplay: { // 自动播放
                type: Boolean,
                default: false
            },
            volume: {
                type: [String, Number],
                default: 100
            },
            onError: { // 错误回调函数
                type: Function,
                default: null
            },
            onPlay: { // 播放时回调函数
                type: Function,
                default: null
            }
        },
        components: {
            'mt-range': Range
        },
        data() {
            return {
                aduLoading: false,
                audio_url: '', // 本地音频URL
                audio_speeds: [1, 1.5, 2], // 本地音频播放速度,
                audio_volume: 100,
                audio_controls: {
                    noDownload: false, // 不显示下载
                    noMuted: false, // 不显示静音
                    noVolume: false, // 不显示音量条
                    noProcess: false, // 不显示进度条
                    onlyOnePlaying: false, // 只能播放一个
                    noSpeed: false // 不要快进按钮
                },
                audio: {
                    currentTime: 0,
                    maxTime: 0,
                    playing: false,
                    muted: false,
                    speed: 1,
                    waiting: true,
                    preload: 'auto',
                    error: true
                },
                sliderTime: 0,
                inputCurrentTimeValue: 0
            }
        },
        created() {
            this.audio_volume = this.volume
            this.audio_url = this.url
            // this.audio_speeds = this.speeds
            this.setControls()
        },
        mounted() {},
        methods: {
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata (res) {
                console.log('音频元数据加载完成', res)
                this.audio.waiting = false
                this.audio.playing = false
                this.audio.speed = 1
                this.audio.maxTime = parseInt(res.target.duration)
                // 初始化
                if (this.autoplay) {
                    this.audioPlay()
                }
            },
            // 下载文件
            downloads (data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'mp3.mp3')

                document.body.appendChild(link)
                link.click()
            },
            dows(url) {
                const _this = this
                // _this.aduLoading = true
                return false
                //funDownload('音频文件', url);
                let baseURL = 'https://crmapi-qa.peilian.com'
                axios({
                    url: baseURL + '/qimo/record-uri?uri='+url,
                    method: 'get',
                    //withCredentials: true,
                    //crossDomain: true,
                    header:{
                      'Accept': 'application/vnd.ms-excel',
                    },
                    responseType: 'blob',
                }).then(function(response) {
                    let disposition = response.headers['content-disposition'];
                    let filename = decodeURI(disposition.match(/filename=(.*)/)[1]);
                    // _this.aduLoading = false
                    // download(response.data,filename);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            setControls () {
                let cl = this.controls.split(' ')
                cl.forEach((item) => {
                    if (this.audio_controls[item] !== undefined) {
                        this.audio_controls[item] = true
                    }
                })
            },
            changeSpeed() {
                let index = this.audio_speeds.indexOf(this.audio.speed) + 1
                this.audio.speed = this.audio_speeds[index % this.audio_speeds.length]
                this.$refs.audio.playbackRate = this.audio.speed
            },
            startMutedOrNot() {
                this.$refs.audio.muted = !this.$refs.audio.muted
                this.audio.muted = this.$refs.audio.muted
            },
            // 音量条toolTip
            formatVolumeToolTip(index) {
                return '音量条: ' + index
            },
            // 进度条toolTip
            formatProcessToolTip (index = 0) {
                index = parseInt(this.audio.maxTime / 100 * index)
                return '进度条: ' + realFormatSecond(index)
            },
            // 音量改变
            changeVolume (index = 0) {
                this.$refs.audio.volume = index / 100
                this.audio_volume = index
            },
            // 播放跳转
            changeCurrentTime (x) {
                console.log('拖拽变更进度条', x)
                this.$refs.audio.currentTime = parseInt(x / 100 * this.audio.maxTime)
            },
            startPlayOrPause() {
                console.log('播放状态', this.audio.playing)
                return this.audio.playing ? this.audioPause() : this.audioPlay()
            },
            // 开始播放
            audioPlay () {
                this.$refs.audio.play()
            },
            // 暂停
            audioPause () {
                this.$refs.audio.pause()
            },
            // 停止
            audioStop() {
                this.$refs.audio.pause()
                this.$refs.audio.currentTime = 0
            },
            // 当音频暂停
            onPauseFun () {
                this.audio.playing = false
            },
            // 当发生错误, 就出现loading状态
            onErrorFun () {
                const _this = this
                //this.audio.error = false
                console.log('当发生错误')
                console.log('音频数据转码中，请稍后试听')
                this.audio.waiting = true
                this.audio.error = false
                if (this.onError) {
                    this.onError(false)
                }
            },
            // 当音频开始等待
            onWaiting (res) {
                console.log('音频开始等待')
            },
            // 当音频开始播放
            onPlayFun (res) {
                this.audio.playing = true
                this.audio.loading = false
                if (!this.audio_controls.onlyOnePlaying) {
                    return
                }
                let target = res.target
                let audios = document.getElementsByTagName('audio');
                [...audios].forEach((item) => {
                    if(item !== target){
                        item.pause()
                    }
                })
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                // console.log('timeupdate')
                this.audio.currentTime = res.target.currentTime
                let sliderTimes = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
                this.sliderTime = sliderTimes
                //this.sliderTime = sliderTimes<=6?sliderTimes+5:sliderTimes
            }
        },
        watch: {
            'url' (val) {
                let status = this.audio.playing // 当前状态
                this.audioStop() // 停止
                this.audio_url = val
                if (status) {
                    // 切换之前正在播放的，则继续播放
                    this.audioPlay()
                }
            },
            // 'speeds' (val) {
            //     this.audio_speeds = val
            // },
            'volume' (val) {
                this.audio_volume = val
            },
            'audio.playing' (val) {
                console.info(val + ' audio.playing')
            }
        },
        filters: {
            formatSecond (second = 0) {
                return realFormatSecond(second)
            },
            transPlayPause(value) {
                return value ? '暂停' : '播放'
            },
            transMutedOrNot(value) {
                return value ? '放音' : '静音'
            },
            transSpeed(value) {
                return '快进: x' + value
            }
        }
      }
</script>

<style lang="less">
    .vue-audio-container {
        position: relative;
    }
    .audio-tag-box {
        display: none;
    }
    .main-wrap {
        padding: 10px 15px;
        display: inline-block;
    }
    .main-wrap .el-loading-mask{
        height: auto;
    }
    .main-wrap span {
        padding: 0 6px;
    }
    .main-wrap .button--text.speeds{
        width: 66px;
    }
    .slider {
        display: inline-block;
        width: 100px;
        position: relative;
        top: 14px;
    }
    .download {
        color: #409EFF;
    }
    .el-tag--info{
        background: none;
        border:0;
    }
    .el-slider__button-wrapper{
        display: none;
    }
    .el-slider__bar:after1{
        content: "";
        height: 36px;
        width: 36px;
        position: absolute;
        z-index: 1001;
        top: -15px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-color: transparent;
        text-align: center;
        -webkit-user-select: none;
        user-select: none;
        line-height: normal;
        border: 2px solid #409EFF;
        background-color: #fff;
        border-radius: 50%;
        -webkit-transition: .2s;
        transition: .2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .el-slider__bar{
        border-radius:3px;
    }
</style>