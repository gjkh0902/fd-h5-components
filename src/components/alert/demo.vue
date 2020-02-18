<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <!-- Alert 组件 -->
            <alert v-model="alertMsg.show"
                :title="alertMsg.title"
                :text="alertMsg.text"
                :html="alertMsg.html"
                :ok="alertMsg.ok"
                :cancel="alertMsg.cancel"
                :callback="alertMsg.callback">
            </alert>
            <!-- 演示操作 -->
            <div class="functions">
                <button class="demo-btn" @click="showA">提示</button>
                <button class="demo-btn" @click="showB">确定+取消</button>
                <button class="demo-btn" @click="showC">很多内容</button>
                <button class="demo-btn" @click="showD">HTML标签内容</button>
                <hr />
                <div>{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Alert } from '.'
import AppHeader from '../appHeader'
export default {
    data() {
        return {
            alertMsg: {         // 弹窗提示内容
                show: false,    // 显示
                title: '',      // 提示标题
                text: '',       // 内容
                html: false,       // HTML 内容
                ok: '',     // 按钮名称
                cancel: '',     // 按钮名称
                callback: null  // 按钮回调
            }
        }
    },
    components: {
        'alert': Alert,
        AppHeader
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        showA() {
            this.alertMsg = {
                show: true,
                title: '提示',
                text: '没有取消按钮',
                ok: '确认',
                callback: (x) => {
                    this.msg = '提示按钮点击回调' + x
                }
            }
        },
        showB() {
            this.alertMsg = {
                show: true,
                title: '提示',
                text: '带取消按钮',
                ok: '确认',
                cancel: '取消',
                callback: (x) => {
                    console.log('按钮回调', x)
                    this.msg = '按钮回调' + x + '，点击了' + (x ? '确定' : '取消') + '按钮'
                }
            }
        },
        showC() {
            this.alertMsg = {
                show: true,
                title: '提示',
                text: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                ok: '确认',
                cancel: '取消',
                callback: (x) => {
                    console.log('按钮回调', x)
                    this.msg = '按钮回调' + x
                }
            }
        },
        showD() {
            this.alertMsg = {
                show: true,
                title: '提示',
                text: '<span class="red">大神</span>你好<br /><hr/><p>列表</p><ul><li>列表</li><li>列表</li></ul>',
                html: true,
                ok: '确认',
                callback: (x) => {
                    console.log('按钮回调', x)
                    this.msg = '按钮回调' + x
                }
            }
        },
    },
}
</script>

<style lang="less">
@import url('../../assets/css/mixin.less');
.red {
    color: #FD5E02;
}
</style>


