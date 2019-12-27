<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <dialog-big v-model="isShow" v-if="isShow" 
                title="领取奖励需关注“VIP陪练”公众号"
                content="您尚未关注，快前往关注和绑定账号吧"
                :on-click="onClick">
                <div>浮层浮层浮层浮层浮层浮层浮层浮层</div>
            </dialog-big>
            <h1>弹出框</h1>
            <div class="functions">
                <button class="demo-btn" @click="isShow=true">打开大弹出框</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { DialogBig, DialogSmall } from '.'
    import AppHeader from '../appHeader'
    export default {
        data () {
            return {
                isShow: false
            }
        },
        components: {
            'dialog-big': DialogBig,
            // 'dialog-small': DialogSmall
            AppHeader
        },
        created () {},
        mounted () {
            // window.addEventListener('resize', this.handleScroll)
            // window.addEventListener('scroll', this.handleScroll, false)
        },
        methods: {
            onClick (x) {
                console.log('点击回调')
            }
        },
        watch: {}
    }
</script>
