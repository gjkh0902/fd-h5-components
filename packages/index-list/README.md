# IndexList 楼层导航

移动端 H5 楼层导航功能

-   模拟原生楼层导航功能
-   可以滚动，使用右侧快速导航
-   支持按右侧导航索引筛选信息
-   支持选中回调操作

[IndexList 示例](http://fd.peilian.com/h5/index-list)

<!-- ## 准备工作
:::tip 下载并安装
`npm install -D fd-h5-components` 或 `cnpm install -D fd-h5-components`
::: -->

## 使用示例

```vue
<!-- vue 模板 -->
<fd-index-list
	v-if="indexListConf.showList"
	v-model="indexListConf.showList"
	:selected="indexListConf.selected"
	:indexData="indexListConf.indexData"
	@onSelected="indexListSelected"
>
</fd-index-list>
```

```js
import Vue from 'vue'
import { IndexList } from "fd-h5-components";
Vue.use(IndexList);
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
                    },
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

## 组件参数

| 参数              | 类型     | 默认值  | 说明               |
| ----------------- | -------- | ------- | ------------------ |
| showList          | Boolean  | `false` | 默认隐藏组件       |
| selected          | Object   | `{}`    | 默认的选中的值     |
| indexData         | Array    | `[]`    | 必要参数，索引列表 |
| indexListSelected | Function | `null`  | 选中后的回调函数   |

## 数据结构

```js
let data = [
    {
        "type": "",                 // 数据分组别名
        "list": [                   // 数据本体
            {
                "name": "",         // 显示名
                "firstName": "",    // 分组别名
                "code": "",         // 内容
                "isHot": ""         // 是否常用
            },
            ...,
        ]
    },
    ...
]
```

| 参数      | 类型   | 默认值 | 说明             |
| --------- | ------ | ------ | ---------------- |
| type      | String | `""`   | 数据分组别名     |
| list      | Array  | `[]`   | 一个数据分组数据 |
| name      | String | `""`   | 显示名           |
| firstName | String | `""`   | 分组别名         |
| code      | String | `""`   | 内容             |
| isHot     | Number | `0`    | 是否常用         |
