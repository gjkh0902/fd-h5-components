# Toast

移动端 H5 消息提示框

-   自定义样式
-   自定义内容（支持插入 html 字符串）
-   自定义持续时长
-   自定义显示位置

[Toast 示例](http://fd.peilian.com/h5/toast)

## 使用示例

```js
//demo js
import { Toast } from "fd-h5-components";
import icon from "../logo.png";//自定义图标
export default {
	...,
	methods: {
		defaultToast() {
			Toast("这是一个Toast, 这是一个Toast, 这是一个Toast")
		},
		defaultSuccessToast() {
			Toast({
				message: "这是一个成功信息，这是一个成功信息，这是一个成功信息",
				className: "custom",
				iconClass: "icon-success"
			})
		},
		defaultFailToast() {
			Toast({
				message: "这是一个错误信息",
				className: "custom",
				iconClass: "icon-error"
			})
		},
		defaultWarnToast() {
			Toast({
				message: "这是一个警告信息",
				className: "custom",
				iconClass: "icon-warn"
			})
		},
		customToast() {
			Toast({
				message: "hello world!",
				custom: `<img class="icon-custom" src="${icon}" />`,
				className: "custom"
			})
		}
	}
}
```

```css
/* demo css */
.custom {
	background-color: #f1f3f4 !important;
	.icon-success1 {
		font-size: 1.2rem;
		color: #62b587;
	}
	.icon-error {
		font-size: 1.2rem;
		color: #ff4d00;
	}
	.icon-warn {
		font-size: 1.2rem;
		color: #ff9900;
	}
	.fd-toast-text {
		color: #666;
		font-size: 0.4rem;
	}
}
.icon-custom {
	width: 1.5rem;
	height: 1.5rem;
}
```

## 组件参数

| 参数      | 类型   | 默认值   | 说明                        |
| --------- | ------ | -------- | --------------------------- |
| message   | String | `""`     | 消息值                      |
| duration  | Number | `3000`   | 持续时长                    |
| className | String | `""`     | 自定义样式名                |
| position  | String | `middle` | 显示位置                    |
| iconClass | String | `""`     | 自定义图标样式              |
| custom    | String | `""`     | 自定义内容，html 字符串形式 |
| zIndex    | Number | `1000`   | 自定义 Z 轴深度             |
