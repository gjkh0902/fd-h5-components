<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <vue-audio ref="Audio" :url="audio_url" :speeds="audio_speeds" :autoplay="autoplay" :volume="audio_volume" :onError="onError" controls="onlyOnePlaying">
            </vue-audio>
            <div class="functions">
                <button class="demo-btn" @click="play">播放</button>
                <button class="demo-btn" @click="pause">暂停</button>
                <button class="demo-btn" @click="stop">停止</button>
                <button class="demo-btn" @click="changeMusic(0)">播放:蓝色土耳其</button>
                <button class="demo-btn" @click="changeMusic(1)">播放:风吹麦浪</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        VueAudio
    } from '.'
    import AppHeader from '../appHeader'
    export default {
        data() {
            return {
                autoplay: true, // 自动播放
                audio_url: '', // 音频URL
                audio_speeds: 1, // 设置播放速度
                audio_volume: 90, // 设置加载时的声音大小
                onlyOnePlaying: false, // 只能播放一个
                list: [{
                        name: '蓝色土耳其',
                        url: require('../../../static/audio/lansetuerqi.mp3')
                    },
                    {
                        name: '风吹麦浪',
                        url: require('../../../static/audio/fengchuimailang.mp3')
                    }
                ]
            }
        },
        created() {
            this.audio_url = this.list[0].url
        },
        mounted() {},
        components: {
            'vue-audio': VueAudio,
            AppHeader
        },
        methods: {
            changeMusic(x) {
                console.info('切换音乐', x, this.list[x])
                this.$refs.Audio.audioStop()
                this.audio_url = this.list[x].url
            },
            play(x) {
                this.$refs.Audio.audioPlay()
            },
            pause() {
                console.info('暂停')
                this.$refs.Audio.audioPause()
            },
            stop() {
                console.info('停止')
                this.$refs.Audio.audioStop()
            },
            onError(x) {
                console.info('错误回调', x)
                this.openIndex = new Date()
            }
        },
        watch: {}
    }
</script>

<style lang="less">
    .tell-record {
        .ly-span {
            color: #409EFF;
            cursor: pointer;
            font-size: 15px;
            font-weight: bold;
        }

        .el-loading-mask {
            height: 100vh;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }

        .el-form--inline .el-form-item {
            margin-bottom: 12px;
        }

        .el-dialog {
            width: 70%;
            height: 620px;
            margin-top: 0;

            .prive-imgs {
                width: 100%;
                height: 500px;
                overflow: scroll;
                text-align: center;
            }
        }

        .el-select-group .el-select-dropdown__item {
            padding-left: 30px;
        }

        display: block;
        height: 100%;

        .tell-record-table {
            border-radius: 4px;
        }

        .chat-hed {
            .bnt-right {
                float: right;
            }

            .el-button--primary.bnt-refresh {
                background: none;
                border: 0;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #667586;
                text-align: center;
                padding: 6px;
            }

            .el-icon-refresh:before {
                font-size: 16px;
                color: #85ce61;
                font-weight: bold;
            }
        }

        .el-table thead tr th {
            background: #F5F7FA;
            padding: 10px 0;
            color: #333;
        }

        .el-table td {
            padding: 6px 0;
            font-size: 12px;
        }

        footer .block {
            float: right;
            margin-top: 14px;
        }

        .aplayer-volume-wrap,
        .aplayer-icon.aplayer-icon-mode.inactive {
            display: none;
        }

        .aplayer-pic .aplayer-pause .aplayer-icon-pause {
            top: 0;
            left: 0;
        }

        .aplayer-pic .aplayer-play .aplayer-icon-play {
            top: 1px;
            left: 2px;
        }
    }

    ul,
    li {
        list-style: none;
    }

    .tell-nav {
        margin-top: 20px;

        .bnt-right {
            float: right;
        }

        .hed-input .el-input__inner {}

        .el-button--primary.bnt-refresh,
        .bnt-close.el-button--primary {
            background: none;
            border: 0;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #667586;
            text-align: center;
            padding: 6px;

            .el-icon-refresh:before {
                font-size: 16px;
                color: #85ce61;
                font-weight: bold;
            }

            .el-icon-close:before {
                font-size: 16px;
                color: #f56c6c;
                font-weight: bold;
            }
        }
    }

    .chat-audio {
        width: 28px;
        height: 28px;
        // background: url('../../assets/tell-stop.png') no-repeat;
        background-size: cover;
        cursor: pointer;
        margin: 0 auto;
    }

    .chat-audio.play-icon {
        // background: url('../../assets/tell-play.png') no-repeat;
        background-size: cover;
        -webkit-animation: rotating 1.2s linear infinite;
        -moz-animation: rotating 1.2s linear infinite;
        -o-animation: rotating 1.2s linear infinite;
        animation: rotating 1.2s linear infinite
    }

    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0)
        }

        to {
            -webkit-transform: rotate(360deg)
        }
    }

    @keyframes rotating {
        from {
            transform: rotate(0)
        }

        to {
            transform: rotate(360deg)
        }
    }

    @-moz-keyframes rotating {
        from {
            -moz-transform: rotate(0)
        }

        to {
            -moz-transform: rotate(360deg)
        }
    }
</style>