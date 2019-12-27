<template>
    <li class="index-section">
        <p class="index-section-index">{{ index }}</p>
        <ul>
            <slot></slot>
        </ul>
    </li>
</template>

<style lang="less" scoped>
    .index-section {
        padding: 0;
        margin: 0
    }

    .index-section-index {
        margin: 0;
        padding: 10px;
        background-color: #fafafa
    }

    .index-section-index+ul {
        padding: 0
    }
</style>

<script>
    export default {
        name: 'index-section',
        props: {
            index: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.$parent.sections.push(this)
        },
        beforeDestroy() {
            let index = this.$parent.sections.indexOf(this)
            if (index > -1) {
                this.$parent.sections.splice(index, 1)
            }
        }
    }
</script>