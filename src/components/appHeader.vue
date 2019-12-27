<template>
    <header class="fixed-header">
        <ul>
            <li class="back">
                <router-link to="/">
                    <i class="iconfont icon-xiangzuo"></i>
                </router-link>
            </li>
            <li class="title">{{title}}</li>
            <li class="more"></li>
        </ul>
    </header>
</template>

<script>
    import Vue from "vue";
    import {
        Header
    } from "mint-ui";
    Vue.component(Header.name, Header);
    export default {
        data() {
            return {
                title: this.$route.meta.title
            };
        },
        methods: {
            //关闭微信窗口
            closeWxWindow() {
                wx.closeWindow();
            }
        },
        mounted() {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .demo-container {
        .iconfont {
            font-size: .9rem;
        }
    }
</style>