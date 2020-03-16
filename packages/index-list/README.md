# 国家地区选择组件

用于选择国家地图区号，可以滚动，可以使用右侧快速导航

##基本参数：

| 参数              | 类型     | 默认值  | 说明                |
| ----------------- | -------- | ------- | ------------------- |
| showList          | Boolean  | `false` | 默认隐藏组件        |
| selected          | Object   | `{}`    | 默认的选中的值,如下 |
| indexData         | Array    | `[]`    | 必要参数，索引列表  |
| indexListSelected | Function | `null`  | 选中后的回调函数    |
|                   |

##使用：

_导入_

```javascript
import { IndexList } from 'fd-h5-components'
```

_引入标签_

```vue
<fd-index-list
	v-if="indexListConf.showList"
	v-model="indexListConf.showList"
	:selected="indexListConf.selected"
	:indexData="indexListConf.indexData"
	@onSelected="indexListSelected"
>
</fd-index-list>
```

_自定义参数_

```javascript
// 组件中使用示例
export default {
    ...,
    data() {
        return {
			//初始化IndexList数据
			indexListConf: {
				showList: false, // 控制组件显隐
				selected: { // 默认选中的区号信息
					'name': '中国',
					'firstName': 'Z',
					'code': '+86',
					'isHot': '1'
				},
				indexData: [
					{
						"type": "常用",
						"list": [
							{
								"name": "美国",
								"firstName": "M",
								"code": "+1",
								"isHot": "1"
							},
						]
					},
					{
						"type": "B",
						"list": [
							{
								"name": "比利时",
								"firstName": "B",
								"code": "+32",
								"isHot": "0"
							}
						]
					}
				]
			}
		}
    },
    methods: {
        indexListSelected (val) {
            // 选中后的回调处理
        }
    }
}
```
