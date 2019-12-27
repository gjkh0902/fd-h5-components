# 进度圈

圆形的进度条，可以自定义百分比，自定义动画时间长度

| 参数           | 类型    | 默认值                    | 说明                                           |
| -------------- | ------- | ------------------------- | ---------------------------------------------- |
| percent        | Number  | `0`                       | 要显示的百分数，比如百分之五十，则设置为数字50 |
| showPercent    | Boolean | `false`                   | 是否显示圈内进度百分比                         |
| size           | Number  | `160`                     | 圈大小，单位像素                               |
| outWidth       | Number  | `30`                      | 外圈宽度，单位像素                             |
| time           | Number  | `1500`                    | 进度自增结束所用时长, 单位毫秒                 |
| autoPlay       | Boolean | `false`                   | 是否默认运行动画                               |
| reloadOnClick  | Boolean | `false`                   | 点击圈时重新播放，连续多次点击会有bug          |
| reloadOnChange | Boolean | `false`                   | 百分比变化时重新播放                           |
| inFontColor    | String  | `#ffffff`                 | 内圈百分比字体颜色                             |
| outFrontColor  | String  | `#ffffff`                 | 外圈前景色                                     |
| outBackColor   | String  | `rgba(252, 79, 23, 0.65)` | 外圈背景色                                     |


##使用：

_导入_

```javascript
import { ProcessCircle } from 'components'
```

_引入标签_

```vue
<process-circle ref="CircleProcess"
    v-if="isShow"
    :showPercent="showPercent"
    :size="size"
    :autoPlay="true"
    :percent="percent"
    :reload-on-click="reloadOnClick"
    :reload-on-change="reloadOnChange"
    :outWidth="outWidth"
    :outBackColor="outBackColor"
    :outFrontColor="outFrontColor"
    :inFontColor="inFontColor"
    :time="time"
></process-circle>
```

_设置参数_

```javascript
data() {
    return {
        isShow: true, // 显示圈进度
        showPercent: true, // 显示进度百分比
        percent: 57, // 百分数
        time: 1000, // 转圈时间
        size: 260, // 大小
        reloadOnClick: false, // 点击时重新加载
        reloadOnChange: false, // 变化时重新加载
        inFontColor: '#fff', // 内部字颜色
        outWidth: 30, // 外圈宽度
        outFrontColor: '#fff', // 外圈颜色
        outBackColor: 'rgba(252, 79, 23, 0.65)' // 外圈底色
    }
}
```

_函数调用_

```javascript
// 重新播放
this.$refs.CircleProcess.reload()
```
