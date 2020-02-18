<template>
    <transition name="fd-toast-trans">
        <div 
            class="fd-toast" 
            v-show="visible" 
            :class="customClass" 
            :style="{ 'padding': iconClass === '' && custom === '' ? '10px' : '20px', 'zIndex': zIndex }">

            <i class="fd-toast-icon iconfont" :class="iconClass" v-if="!custom"></i>
            <i class="fd-toast-icon" :class="iconClass" v-html="custom" v-else></i>
            <span 
                v-if="message"
                class="fd-toast-text" 
                :style="{ 'padding-top': iconClass === '' && custom === '' ? '0' : '10px' }">{{ message }}</span>
        </div>
    </transition>
</template>

<script type="text/babel">
export default {
    name: 'fd-toast',
    props: {
        message: String,
        className: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'middle'
        },
        iconClass: {
            type: String,
            default: ''
        },
        // 自定义图标
        custom: String,
        // Z轴深度
        zIndex: {
            type: Number,
            default: 1000,
        }
    },
    data () {
        return {
            visible: !1
        }
    },
    computed: {
        customClass() {
            let classes = [];
            switch (this.position) {
                case 'top':
                    classes.push('pos-top');
                    break;
                case 'bottom':
                    classes.push('pos-bottom');
                    break;
                default:
                    classes.push('pos-middle');
            }
            classes.push(this.className);

            return classes.join(' ');
        }
    },
}
</script>

<style lang="less" scoped>
    .fd-toast-trans-enter, 
    .fd-toast-trans-leave-active {
        opacity: 0
    }
    .fd-toast {
        position: fixed;
        max-width: 80%;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        z-index: 1000;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear
    }
    .fd-toast.pos-bottom {
        bottom: 1rem;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
                transform: translate(-50%, 0)
    }
    .fd-toast.pos-middle {
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%)
    }
    .fd-toast.pos-top {
        top: 1rem;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
                transform: translate(-50%, 0)
    }
    .fd-toast-icon {
        display: block;
        // max-width: 2rem;
        // max-height: 2rem;
        text-align: center;
        // font-size: 1rem
    }
    .fd-toast-text {
        font-size: 14px;
        display: block;
        text-align: center
    }
</style>