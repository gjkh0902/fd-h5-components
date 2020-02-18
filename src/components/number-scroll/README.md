# 数字卷轴

数字滚动翻转效果，支持N位数字，支持初始化时自动滚动，和手动滚动

## 基本参数：

| 参数 | 类型 | 默认值  | 说明 |
| -------- | ------------------ | ------- | -------------------------------- |
| num | Number | `0` | 必选项，滚动的数字 |
| auto | Boolean | `false`  | 是否初始化时自动翻转 |
| delay | Number | `1000` | 自动翻转延迟时间，毫秒 |


## 使用：

_导入_

```javascript
import { NumberScroll } from 'components'
```

_引入标签_

```vue
<number-scroll :num="num" :auto="auto" :delay="delay" ref="NumberScroll"></number-scroll>
```

_设置参数_

```javascript
<script>
    export default {
        data() {
            return {
                num: 0, // 数字
                auto: false // 初始化时不自动翻转
            }
        }
    }
</script>
```
