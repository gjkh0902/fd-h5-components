## 星级评分使用文档
### 1.描述：
星级评分 支持配置icon的个数、选中状态、样式等
### 2.引入：
``` js
import MkGrade from './index.vue';
```
### 3.调用：
``` vue
<mk-grade 
	v-model="selectNum"
	:size="size"
	:spacing="spacing"
	:color="color"
	:count="count"
	:viewBox="viewBox"
	:iconPath="iconPath"
	:voidIconPath="voidIconPath"
	:halfMode="halfMode"
/>
tip： 监听selectNum的值可以进行回调操作
```
### 4.参数说明：
| 参数名 | 类型 | 默认值 | 描述 |
| ----- | --- | ----- | --- |
| value | Number | / | 选中的icon个数，父组件通过v-model绑定 |
| readonly | Boolean | / | 设置为只读，不可进行操作 |
| size | Number | 50 | icon大小 |
| spacing | Number | 8 | icon右间距 |
| color | String | #FFBC00 | icon背景颜色 |
| count | Number | 5 | icon个数 |
| viewBox | String | "0 0 42 42" |svg viewBox 更换icon必传 |
| iconPath | String | "M20.3695378,31....." | 选中高亮 svg path 更换icon必传 |
| voidIconPath | String | "M20.3695378,31....." | 未选中高亮 svg path 更换icon必传 |
| halfMode | Boolean | false | half模式 每次选中50% |