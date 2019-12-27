<template>
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <overlay v-if="isShow" v-model="isShow" :on-click="onClick">
                <!-- <template slot-scope="scope">
                    <div>浮层浮层浮层浮层浮层浮层浮层浮层</div>
                </template> -->
            </overlay>
            <div class="functions">
                <button class="demo-btn" @click="isShow=true">打开</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { overlay } from '.'
    import AppHeader from '../appHeader'
    export default {
        data () {
            return {
                isShow: false
            }
        },
        components: {
            'overlay': overlay,
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
