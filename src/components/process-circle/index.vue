<template>
    <div class="process-circle-container" :style="styleContainer">
        <canvas class="process-circle-canvas"
            ref="canvasCircle"
            :width="c_size"
            :height="c_size"
            :style="styleCanvas">
        </canvas>
        <slot name="default"
            :current="current">
        </slot>
    </div>
</template>

<script>
export default {
    name: 'process-circle',
    props: {
        showPercent: { // 是否显示圈内百分数
            type: Boolean,
            default: true
        },
        percent: { // 要显示的百分数，比如百分之五十，则设置为数字50
            required: true,
            type: Number,
            default: 0
        },
        size: { // 整体宽高尺寸
            type: Number,
            default: 160
        },
        time: { // 进度自增结束所用时长, 单位毫秒
            type: Number,
            default: 1500
        },
        autoPlay: { // 是否默认运行动画
            type: Boolean,
            default: false
        },
        reloadOnClick: { // 点击圈时重新播放
            type: Boolean,
            default: false
        },
        reloadOnChange: { // 百分比变化时重新播放
            type: Boolean,
            default: false
        },
        inFontColor: { // 圈内字体颜色
            type: String,
            defatult: '#ffffff'
        },
        outWidth: { // 跑圈宽度
            type: Number,
            default: 30
        },
        outBackColor: { // 外圈背景色
            type: String,
            defatult: 'rgba(252, 79, 23, 0.65)'
        },
        outFrontColor: { // 外圈前景色
            type: String,
            defatult: '#ffffff'
        }
    },
    data () {
        return {
            canvas: '', // Canvas 对象
            context: '', // Canvas 画布
            cirX: '', // Canvas 中心坐标X
            cirY: '', // Canvas 中心坐标Y
            rad: '',
            current: 0, // 当前的百分数
            i_radius: 80, // 内圈半径
            o_radius: 80, // 外圈半径
            out_width: 30, // 外圈线宽度
            in_width: 30, // 内圈线宽度
            c_size:'160',
            styleCanvas: {
                'width': '80px',
                'height': '80px'
            },
            styleContainer: {},
            toFixed: 0 // 百分数小数点后位数
        }
    },
    // beforeMount () {},
    mounted () {
        this.canvas = this.$refs.canvasCircle
        this.canvas.width = this.size * 2
        this.canvas.height= this.size * 2
        this.context = this.canvas.getContext('2d')
        this.context.scale(2, 2)
        this.cirX = this.size / 2 // 直径的一半
        this.cirY = this.size / 2 // 直径的一半
        this.rad = Math.PI * 2 / 100
        if (this.autoPlay) {
            // 自动运行
            this.rotateCircle()
        }
        if (this.reloadOnClick) {
            this.canvas.onclick = () => {
                this.reload()
            }
        }
    },
    // beforeCreate () {},
    computed: {},
    created () {
        // console.log('this.size', this.size)
        this.setFixed()
        this.initStyle()
    },
    methods: {
        setFixed () {
            console.log('setFixed')
            let tmp = this.percent.toString().split('.') // 99.4 ['99', '4']
            if (tmp.length == 2) {
                console.log('tmp.length', tmp.length)
                console.log('tmp[1].length', tmp[1].length)
                this.toFixed = tmp[1].length
            } else {
                this.toFixed = 0
            }
        },
        initStyle () {
            this.c_size = this.size * 2
            this.in_width = this.outWidth
            this.out_width = this.outWidth
            this.i_radius = (this.size - this.out_width) / 2
            this.o_radius = (this.size - this.in_width) / 2
            this.styleCanvas.width = this.size + 'px'
            this.styleCanvas.height = this.size + 'px'
            this.styleContainer.width = this.size + 'px'
            this.styleContainer.height = this.size + 'px'
            this.styleContainer.marginLeft = 'auto'
            this.styleContainer.marginRight = 'auto'
        },
        writeCircleIn(context) {
            // 绘制底圈
            context.save() // save和restore可以保证样式属性只运用于该段canvas元素
            context.beginPath() // 开始路径
            context.strokeStyle = this.outBackColor || 'rgba(252, 79, 23, 0.65)' // 设置底圈和跑圈重合部分的颜色，即外圈的背景色
            context.lineWidth = this.out_width // 线宽度
            context.arc(this.cirX, this.cirY, this.i_radius, 0, Math.PI * 2, false) // 画一个圆的路径
            context.stroke() // 绘制边线
            context.closePath()
            // context.restore()
        },
        // 绘制文本
        writeText(context, n) {
            if (!this.showPercent) {
                return
            }
            context.save()
            context.font = '50px Arial'
            context.fillStyle = this.inFontColor || '#fff' //字体颜色
            context.fillText(n.toFixed(this.toFixed) + '%', this.cirX - 70, this.cirY + 10) // 绘制实心
            context.strokeStyle = '#FFFD6E00'
            // context.strokeText(n.toFixed(this.toFixed) + '%', this.cirX - 30, this.cirY + 10) //绘制空心
            context.stroke()
            context.restore()
        },
        writeCircleOut(context, n) {
            // 绘制外圈
            if (n && n > 0) {
                context.save()
                context.strokeStyle = this.outFrontColor || '#ffffff'
                context.lineWidth = this.in_width // 线宽度
                context.lineCap = 'round'
                context.beginPath()
                context.arc(this.cirX, this.cirY, this.o_radius, -Math.PI / 2, -Math.PI / 2 + this.rad * n, false)
                context.stroke()
                context.restore()
            }
        },
        rotateCircle() {
            // console.log(this.current)
            // console.log(new Date().getTime())
            // 清除所有，重新绘制
            this.context = this.canvas.getContext('2d')
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.writeCircleIn(this.context)
            this.writeText(this.context, this.current)
            this.writeCircleOut(this.context, this.current)
            // use requestAnimationFrame
            if (this.percent > 0) {
                if (this.current <= this.percent) {
                    if (this.current + 0.1 > this.percent) {
                        this.current = this.percent
                        return
                    } else {
                        this.current = this.current + this.percent * 17 / this.time
                    }
                    // console.log(new Date().getTime())
                } else if (this.current > this.percent) {
                    this.current = this.percent
                }
                 else {
                    return this.current = 0
                }
                requestAnimationFrame(this.rotateCircle)
            } else {
                this.current = 0
            }
        },
        run () {
            // 运行
            this.rotateCircle()
        },
        replay () {
            // 重新运行
            this.rotateCircle()
        },
        reload () {
            // console.log('重载')
            this.current = 0
            // this.context = this.canvas.getContext('2d')
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.writeText(this.context, this.current)
            this.writeCircleOut(this.context, this.current)
            this.$forceUpdate()
            this.rotateCircle()
        }
    },
    watch: {
        percent () {
            // 百分比变化重新加载
            this.setFixed()
            if (this.reloadOnChange) {
                this.reload()
            }
        },
        reloadOnClick (val) {
            if (val) {
                this.canvas.onclick = () => {
                    this.reload()
                }
            } else {
                this.canvas.onclick = null
            }
        }
        // outWidth () {
        //     // 外圈宽度变化，需要重新渲染组件
        //     this.reload()
        // }
    }
}
</script>

<style lang="less">
    .process-circle-container {
        border-radius: 50%;
        .process-circle-canvas {
            border-radius: 50%;
            background-color:#fd7e13;
            box-shadow: 0px 0px 73px 0px rgba(255,64,0,0.71);
        }
    }
</style>
