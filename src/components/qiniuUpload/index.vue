<!--
    七牛上传demo
    @auther wangweijia
 -->
<template>
    <div class="outer">
        <div class="inner">
            <main class="main">
                <nav class="nav-bar">
                    <ul>
                        <li :class="{active: currentView === 'UploadImage'}" @click="tabChange('UploadImage')">图片</li>
                        <li :class="{active: currentView === 'UploadMixin'}" @click="tabChange('UploadMixin')">混合文件</li>
                        <li :class="{active: currentView === 'UploadMedia'}" @click="tabChange('UploadMedia')">音视频</li>
                        <!-- <li :class="{active: currentView === 'UploadDrop'}" @click="tabChange('UploadDrop')">拖曳上传</li> -->
                        <li :class="{active: currentView === 'UploadBase64'}" @click="tabChange('UploadBase64')">base64图片</li>
                    </ul>
                </nav>
                <keep-alive><component :is="currentView"></component></keep-alive>
            </main>
        </div>
    </div>
</template>
<script>
import UploadImage from './children/uploadImage';
import UploadMixin from './children/uploadMixin';
import UploadMedia from './children/uploadMedia';
// import UploadDrop from './children/uploadDrop';
import UploadBase64 from './children/uploadBase64';
import Env from '@api/env';

export default {
    name: 'QNUploader',
    props: [],
    data () {
        return {
            uploading: !1,                      // 上传状态，true表示正在上传
            currentView: 'UploadImage',
        }
    },
    components:{
        UploadImage,
        UploadMixin,
        UploadMedia,
        // UploadDrop,
        UploadBase64,
    },

    computed: {},
    // mixins: [mixins],
    created () {},
    mounted () {
        
    },
    methods:{
        tabChange(componentView) {
            this.currentView = componentView;
        }
    },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/mixin.less';
.outer {
    position: relative;
    .wh(100%, 100vh);
    background-color: #f6f6f6;
}
.inner {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // margin: auto;
    .fj();
    .flex-align(flex-start);
    padding: 0.2667rem;
    margin: auto;
    .wh(100%, 100%);
    .main {
        // .box-flex(1);
        // height: 100%;
        .wh();
    }
}
.nav-bar {
    padding: .2133rem .2667rem;
    height: 1.2667rem;
    line-height: .8rem;
    // border-left: #ccc solid 1px;
    // border-bottom: #ccc solid 1px;
    background-color:#fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    ul {
        .fj();
        li {
            margin: 0 .16rem 0 0;
            padding: 0 .2133rem;
            height: .8rem;
            border-radius: .10667rem;
            background-color: #4D5469;
            // border-top: #ccc solid 1px;
            // border-right: #ccc solid 1px;
            cursor: pointer;
            color: #eee;
        }
        li.active {
            background-color: #06A873;
            color: #fff;
        }
    }
}

</style>
