# Swiper 轮播组件

> 轮播组件，支持自动播放、无限轮播，支持用户手动滑动

## Swiper 基本参数：

| 参数     | 类型               | 默认值  | 说明                             |
| -------- | ------------------ | ------- | -------------------------------- |
| defaultSlide | Number | `0`   | 初始化时，默认选中的序号  |
| interval | Number | `2500` | 两次滑动的间隔时间，单位毫秒 |
| duration | Number | `500` | 一次滑动的默认时间，单位毫秒 |
| autoplay | Boolean      | `false` | 自动切换 |
| therehold | Number | `110` | 用户滑动操作触发切换翻页至少需要达到的距离 |
| indicator | Boolean    | `true` | 显示索引指示器           |
| indicatorCanClick | Boolean | `true` | 指示器可点击，直接切换到所选项 |
| arrow | Boolean    | `false` | 显示翻页箭头图标 |
| scrollX | Boolean | `true` | 垂直方向可拖拽滚动：[true: 允许, false: 禁止] |
| onChange | Function | `null` | 当前激活的索引发生变化后触发的回调 |
| onTransitionend | Function | `null` | 当滑动结束时触发的回调，注意：此时激活的索引可能没有发生变化 |

## Slide 参数：

| 参数     | 类型               | 默认值  | 说明                             |
| ---- | ---- | ---- | ---- |
| @click | Function |  | 当前滑块点击事件 |

##使用：

_导入_

```javascript
import { Swiper, Slide } from 'components'
```

_引入标签_

```vue
<swiper ref="swiper"
    :defaultSlide="defaultSlide"
    :interval="interval"
    :arrow="arrow"
    :indicator="indicator">
    <slide v-for="(item, index) in textList" :key="index"">
        <div :style="{'height': '300px','line-height': '300px','background-color': item.bg}">{{item.text}}</div>
    </slide>
    <h2" slot="swiper-footer">底部文字</h2>
</swiper>
```

_设置参数_

```javascript
data() {
    return {
        {
            'defaultSlide': 3, // 默认选中的
            'interval': 1500, // 两次滑动的间隔时间
            'arrow': true, // 显示左右箭头切换图标
            'indicator': true, // 显示索引指示器
            'textList': [ // 切换数据
                {text: 'Hello World', bg: '#c5b9b9'},
                {text: '你好', bg: '#e66969'},
                {text: '你好', bg: '#d42222'},
                {text: '你好', bg: '#878cce'},
                {text: '你好', bg: '#ddd'}
            ]
        }
    }
}
```

_函数调用_

```javascript
// 切换到下一个
this.$refs.swiper.next()
// 切换到上一个
this.$refs.swiper.previous()
// 切换到指定序号
this.$refs.swiper.slideTo(3)
```
