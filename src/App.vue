<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
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
