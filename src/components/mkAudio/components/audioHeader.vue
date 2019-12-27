<template>
    <div class="audio-header">
        <div class="hd-title">
            <h1>{{name}}</h1>
            <span>{{singer}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'audio-header',
    props: {
        // 歌曲名
        name: {
            type: String,
            required: !!1,
        },
        // 演唱者
        singer: {
            type: String,
            required: !!1,
        },
        
    },
    data() {
        return {}
    },
    components: {},
    mounted () {},
    methods:{},
    
    watch: {

    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/mixin.less';
.audio-header {
    position: absolute;
    top: 0;
    .fj(center);
    .wh(100%; 2rem;);
    // border-bottom: #999 solid .05rem;
    .hd-title {
        padding: 0 1rem;
        .wh();
        text-align: center;
        .px2rem(font-size, 28);
        
        color: #eee;
        h1 {
            line-height: 1.3rem;
            font-weight: 400;
            white-space: nowrap;
            .px2rem(font-size, 32);
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>