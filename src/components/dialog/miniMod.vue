<template>
    <div class="recom-dialog" v-show="showMask">
        <div class="dialog-container" ref="dialogH" :style="dialogH" v-show="!tellShow">
            <div class="hed-top">
                <div class="dialog-title">{{title}}</div>
            </div>
            <div class="content" v-if="content" v-html="content"></div>
            <div class="btns" ref="bntH">
                <button v-if="cancelBnt=='cancel'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </button>
                <!--带复制-->
                <!-- <button v-show="dangerBnt=='danger'&&copyMsg"
                 v-clipboard:copy="copyMsg"
                 v-clipboard:success="onCopy"
                 v-clipboard:error="onError"
                 :class="cancelBnt!='cancel'?'max':''"
                 class="danger-btn">
                    {{dangerText}}
                </button> -->
                <button v-show="dangerBnt=='danger'&&!copyMsg"
                 @click="dangerBtn"
                 :class="cancelBnt!='cancel'?'max':''"
                 class="danger-btn">
                    {{dangerText}}
                </button>
            </div>
        </div>
        <!--拨打电话-->
        <div class="tells-box" v-show="tellShow">
            <a href="tel:4006060854" @click="closeBtn">
                呼叫<br />
                <span>4006060854</span>
            </a>
            <button @click="closeBtn">取 消</button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    // import VueClipboard from 'vue-clipboard2'
    // Vue.use(VueClipboard)
    // import {Indicator, Toast} from 'mint-ui';
    // import classPost from '../../service/classServer';
    export default {
        props: {
            value: {},
            copyMsg: {},
            // 类型包括 defalut 默认， danger 危险， confirm 确认，
            type: {
                type: String,
                default: 'default'
            },
            dangerBnt: {
                type: String,
                default: 'dangerBnt'
            },
            cancelBnt: {
                type: String,
                default: 'dangerBnt'
            },
            content: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            dangerText: {
                type: String,
                default: '删除'
            },
            confirmText: {
                type: String,
                default: '确认'
            }
        },
        data() {
            return {
                showMask: false,
                tellShow: false,
                dialogH:''
            }
        },
        methods: {
            closeMask() {
                this.showMask = false;
            },
            closeBtn() {
                this.$emit('cancel');
                this.closeMask();
                this.tellShow = false;
            },
            dangerBtn() {
                const _this = this;
                if(_this.type == "tell"){
                    let ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) != 'micromessenger') {
                        this.tellShow = true
                    }
                    return
                }
                this.$emit('danger');
                this.closeMask();
            },
            confirmBtn() {
                this.$emit('confirm');
                this.closeMask();
            },
            onCopy: function(e) {
                console.log('你刚刚复制: ' + e.text)
                Toast('已成功复制微信号');
                this.$emit('danger');
                this.closeMask();
            },
            onError: function(e) {
                console.log('无法复制文本！')
                Toast('抱歉，复制失败，您需手动选择VIPPNL复制');
            },
            wSize() {
                this.$nextTick(()=>{
                    let hval = this.$refs.dialogH.clientHeight/2
                    let wval = this.$refs.dialogH.offsetWidth/2
                    this.dialogH = `margin-left:-${wval}px;margin-top:-${hval}px`;
                });
            }
        },
        mounted() {
            this.showMask = this.value;
            const that = this;
            window.onresize = function(){  
                that.wSize()
            }
            that.wSize()
        },
        watch: {
            value(newVal, oldVal) {
                this.showMask = newVal;
            },
            showMask(val) {
                this.$emit('input', val);
            }
        },
    }
</script>
<style lang="less" scoped>
    .recom-dialog {
        button:active{ background-color:none;}
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9;
        .dialog-container {
            width: 76%;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 10px;
            .dialog-title {
                width: 100%;
                font-size: 16px;
                color: #4A4A4A;
                font-weight: bold;
                padding: 16px 20px 16px 20px;
                box-sizing: border-box;
                text-align: center;
            }
            .content {
                color: #4A4A4A;
                line-height: 1.4;
                padding: 0 20px;
                box-sizing: border-box;
                overflow-y: auto;
                padding-bottom: 20px;
                font-family: 'PingFangSC-Regular';
            }
            .inp {
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus {
                    border: 1px solid #509EE3;
                }
            }
            .btns {
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                background: #fff;
                border-radius: 0 0 25px 25px;
                border-top: 1px solid #E9E9E9;
                & > button {
                    display: inline-block;
                    height: 44px;
                    text-align: center;
                    cursor: pointer;
                    font-size: 16px;
                    font-family: 'PingFangSC-Semibold';
                    width: 49%;
                    background: none;
                }
                .default-btn {
                    color: #9B9B9B;
                    border-right: 1px solid #E9E9E9;
                }
                .danger-btn {
                    color: #FD5E02;
                }
                .danger-btn.max{
                    width: 100%;
                }
            }
        }
        .tells-box{
            position: absolute;
            bottom: 0;
            width: 100%;
            button,a{
                width: 100%;
                color: #4A4A4A;
                display: block;
                font-family: 'PingFangSC-Semibold';
                background: #fff;
                text-align: center;
                padding: 7px 0;
                span{
                    color: #9B9B9B;
                    font-size: 12px;
                }
            }
            button{
                border-top: 5px solid #F6F6F6;
                padding: 15px 0;
                color: #9B9B9B;
            }
        }
    }
</style>
