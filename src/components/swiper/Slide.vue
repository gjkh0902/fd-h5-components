
<template>
    <div class="swiper-slide" @click="clickHandler">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'Slide',
        methods: {
            clickHandler () {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="less">
    .swiper-slide {
        height: 100%;
        width: 100%;
        flex-shrink: 0;
        text-align: center;
        overflow: hidden;
        img {
            -webkit-user-drag: none; // 阻止图片的默认拖动效果
        }
    }
</style>