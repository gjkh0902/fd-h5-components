# MessageBox 对话框

移动端 H5 MessageBox 对话框组件

-   支持单/双按钮
-   自定义内容（支持插入 html 字符串）
-   按钮文案自定义
-   关闭后回调
-   支持灵活配置参数

[MessageBox 示例](http://fd.peilian.com/h5/message-box)

## 使用示例

```javascript
import { MessageBox } from 'fd-h5-components'
export default {
    ...,
    mounted():{
        MessageBox('test')
    },
    methods: {
        //标题文本+回调提示
		showTextDemo() {
			MessageBox({
				title: '提示',
				text: '确定+取消',
				ok: '确认',
				cancel: '取消',
				callback: x => {
					console.log('按钮回调', x)
					this.msg = '按钮回调' + x + '，点击了' + (x ? '确定' : '取消') + '按钮'
				}
			})
        },
        //插入html标签提示
		showHtmlDemo() {
			MessageBox({
				title: '提示',
				text: '<span class="red">大神</span>你好<br /><hr/><p>列表</p><ul><li>列表</li><li>列表</li></ul>',
				html: true,
				ok: '确认',
				callback: x => {
					console.log('按钮回调', x)
					this.msg = '按钮回调' + x
				}
			})
        },
        //纯文本提示(无回调)
		showTipsDemo() {
			MessageBox('纯提示')
		}
	}
}
```

## 基本参数：

| 参数     | 类型     | 默认值   | 说明                                                                |
| -------- | -------- | -------- | ------------------------------------------------------------------- |
| title    | String   | `"提示"` | 提示标题                                                            |
| text     | String   | `""`     | 必选项，提示内容，支持 HTML 标签                                    |
| html     | Boolean  | `false`  | 提示内容是 HTML，true 时支持插入 html 标签                          |
| ok       | String   | `"确定"` | 确定按钮文案，点击时关闭提示                                        |
| cancel   | String   | `""`     | 取消按钮文案，为空时不显示此按钮，点击时关闭提示                    |
| callback | Function | `null`   | 按钮点击之后的回调函数，点击确定时返回`true`，点击取消时返回`false` |
