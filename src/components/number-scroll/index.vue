<template>
    <div class="number-scroll">
        <div class="box-item">
            <li v-for="(item, index) in domNum" :key="index"
                :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item)}">
                <span v-if="!isNaN(item)">
                    <i ref="numberItem">0123456789</i>
                </span>
                <span class="comma" v-else>{{item}}</span>
            </li>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        num: { // 数字
            required: true,
            Type: Number,
            default: 0
        },
        auto: { // 自动翻转
            Type: Boolean,
            default: false
        },
        delay: { // 自动翻转延迟时间，毫秒
            Type: Number,
            default: 1000
        }
    },
    data() {
        return {
            newNumber: 0, // 数字
            domNum: [0], // 数字元素
            digit: 0, // 数字位数，左边不够位数的添加"0"补位
            readay: false
        }
    },
    created() {
        this.newNumber = this.num
        this.initDigit(this.newNumber)
    },
    mounted() {
        if (this.auto) {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.transform()
                }, this.delay)
                this.readay = true
            })
        } else {
            this.readay = true
        }
    },
    watch: {
        'num' (val) { // 占位
            if (this.readay) {
                this.newNumber = val
                this.setDigit(val)
            }
        },
        'domNum' (val) { // 滚动
            if (this.readay) {
                this.$nextTick(() => {
                    this.transform()
                })
            }
        }
    },
    methods: {
        change (x) {
            // 赋值
            this.newNumber = x
            // 占位
            this.setDigit(x)
            // 滚动
            this.transform()
        },
        initDigit (x) {
            // console.log('初始化数字0占位')
            if (x) {
                x = String(x)
                this.domNum = x.split('')
            } else {
                this.domNum = [0]
            }
        },
        setDigit (x) { // 设置数字占位
            x = String(x)
            if (this.digit) {
                if (x.length < this.digit) {
                    x = "0" + x // 未满位数的添加"0"补位
                    this.setDigit(x) // 递归添加"0"补位
                } else {
                    this.domNum = x.split('') // 将其便变成数据，渲染至滚动数组
                }
            } else {
                this.domNum = x.split('') // 直接分组
            }
            // return
            // // 限制位数
            // if (x.length < 8) {
            //     x = "0" + x; // 如未满八位数，添加"0"补位
            //     this.setDigit(x); // 递归添加"0"补位
            // } else if (x.length === 8) {
            //     // 可选项：加入逗号
            //     // x =
            //     //     x.slice(0, 2) +
            //     //     "," +
            //     //     x.slice(2, 5) +
            //     //     "," +
            //     //     x.slice(5, 8);
            //     this.domNum = x.split(""); // 将其便变成数据，渲染至滚动数组
            // }
        },
        transform() { // 设置文字滚动
            // console.log("transform", '设置文字滚动')
            let scroll = this.$refs.numberItem; // 卷轴数字
            let item = this.domNum.filter(item => !isNaN(item))
            // 对数字字符进行滚动
            for (let index = 0; index < scroll.length; index++) {
                const elem = scroll[index]
                elem.style.transform = `translate(-50%, -${item[index] * 10}%)`
            }
        }
    }
};
</script>

<style scoped lang="less">
.box-item {
    position: relative;
    height: 66px;
    font-size: 54px;
    line-height: 41px;
    text-align: center;
    list-style: none;
    color: #2d7cff;
    writing-mode: vertical-lr;
    text-orientation: upright;
    /*文字禁止编辑*/
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    /* overflow: hidden; */
}
/* 默认逗号设置 */
.mark-item {
    width: 10px;
    height: 66px;
    margin-right: 5px;
    line-height: 10px;
    font-size: 48px;
    position: relative;
    & > span {
        position: absolute;
        width: 100%;
        bottom: 0;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }
}
/*滚动数字设置*/
.number-item {
    width: 41px;
    height: 66px;
    list-style: none;
    border-radius: 4px;
    background-color: #fafafa;
    border: 1px solid rgba(221, 221, 221, 1);
    & > span {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        writing-mode: vertical-rl;
        text-orientation: upright;
        overflow: hidden;
        & > i {
            font-style: normal;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            transition: transform 1s ease-in-out;
            letter-spacing: 10px;
        }
    }

    &+.number-item {
        margin-left: 5px;
    }
}
</style>
