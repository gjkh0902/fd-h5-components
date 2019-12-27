<template>
    <div id="app">
        <keep-alive>
            <router-view v-wechat-title="$route.meta.title || '首页'"></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
    @import './assets/css/reset.css';
    @import './assets/css/common.css';
</style>
