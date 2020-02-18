# Alert 提示

支持单/双按钮、按钮文案自定义、关闭后回调

## 基本参数：

| 参数 | 类型 | 默认值  | 说明 |
| -------- | ------------------ | ------- | -------------------------------- |
| v-model | Boolean | `false` | 必选项，双向绑定值，控制组件打开与关闭 |
| title | String | `"提示"`  | 提示标题 |
| text | String | `""` | 必选项，提示内容，支持 HTML 标签 |
| html | Boolean | `false` | 提示内容是HTML |
| ok | String | `"确定"` | 确定按钮文案，点击时关闭提示 |
| cancel | String | `""` | 取消按钮文案，为空时不显示此按钮，点击时关闭提示 |
| callback | Function | `null` | 按钮点击之后的回调函数，点击确定时返回`true`，点击取消时返回`false` |

## 使用：

_导入_

```javascript
import { Alert } from 'components'
```

_引入标签_

```vue
<alert v-model="alertMsg.show"
    :title="alertMsg.title"
    :text="alertMsg.text"
    :ok="alertMsg.ok"
    :html="alertMsg.html"
    :cancel="alertMsg.cancel"
    :callback="alertMsg.callback">
</alert>
```

_设置参数_

```javascript
<script>
    export default {
        data() {
            return {
                alertMsg: { // 弹窗提示内容
                    show: false, // 显示
                    title: '', // 提示标题
                    text: '', // 内容
                    html: false, // HTML
                    ok: '', // 按钮名称
                    cancel: '', // 按钮名称
                    callback: null // 按钮回调
                }
            }
        }
    }
</script>
```

_函数调用_

```javascript
// 赋值开启alert提示
this.alertMsg.title = '系统提示'
this.alertMsg.text = '是否退出登录？'
this.alertMsg.ok = '确定退出'
this.alertMsg.show = true
// 设置回调函数
this.alertMst.callback = (x) => {
    console.log('关闭回调', x)
}
```
