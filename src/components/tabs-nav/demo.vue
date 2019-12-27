<template>
    <!-- header -->
    <div class="demo-container">
        <app-header></app-header>
        <div class="item-content">
            <tabs-nav :list="navList" :curr-index="currIndex" :on-change="navChange">
                <template slot-scope="scope">
                    <!-- <div>索引：{{scope.index}}</div> -->
                    <div>{{scope.item.name}}</div>
                </template>
            </tabs-nav>
            <br>
            <div class="functions">
                <button class="demo-btn" @click="navList=navList1">切换数据源：4个</button>
                <button class="demo-btn" @click="navList=navList2">切换数据源：8个</button>
                <button class="demo-btn" @click="currIndex=0">选中第一个</button>
                <button class="demo-btn" @click="currIndex=2">选中第三个</button>
                <button class="demo-btn" @click="currIndex=navList.length -1">选中第最后一个</button>
            </div>
        </div>
    </div>
</template>

<script>
    import TabsNav from './index.vue'
    import AppHeader from '../appHeader';
    export default {
        data () {
            return {
                currIndex: 0,
                navList: [],
                navList1: [
                    {
                        id: 1,
                        name: '首页'
                    },
                    {
                        id: 2,
                        name: '国内'
                    },
                    {
                        id: 3,
                        name: '国际'
                    },
                    {
                        id: 4,
                        name: '军事'
                    }
                ],
                navList2: [
                    {
                        id: 1,
                        name: '首页'
                    },
                    {
                        id: 2,
                        name: '国内'
                    },
                    {
                        id: 3,
                        name: '国际'
                    },
                    {
                        id: 4,
                        name: '军事'
                    },
                    {
                        id: 5,
                        name: '财经'
                    },
                    {
                        id: 6,
                        name: '娱乐'
                    },
                    {
                        id: 7,
                        name: '体育'
                    },
                    {
                        id: 8,
                        name: '互联网'
                    }
                ],
            }
        },
        components: {
            'tabs-nav': TabsNav,
            AppHeader
        },
        created () {
            this.navList = this.navList1
        },
        mounted () {
            // window.addEventListener('resize', this.handleScroll)
            // window.addEventListener('scroll', this.handleScroll, false)
        },
        methods: {
            navChange (x) {
                console.log('索引变化', x)
                this.currIndex = x
            }
        },
        watch: {}
    }
</script>
