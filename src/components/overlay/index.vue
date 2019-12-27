<template>
    <div class="overlay" v-if="isShow" @click="inClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        value: { // v-model 绑定 是否展示
            type: Boolean,
            default: false
        },
        opacity: {
            type: Number,
            default: 0.35
        },
        onClick: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    created() {
        this.isShow = this.value
    },
    watch: {
        value (newVal, oldVal) {
            this.isShow = newVal
        }
    },
    methods: {
        inClick () {
            this.close()
            if (this.onClick) {
                this.onClick()
            }
        },
        close () {
            console.log('close')
            this.isShow = false
            this.$emit('input', this.isShow)
        }
    },
}
</script>
<style scoped>
    .overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.35;
        z-index: 9999;
    }
</style>
