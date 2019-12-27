# 国家地区选择组件

用于选择国家地图区号，可以滚动，可以使用右侧快速导航

##基本参数：

| 参数            | 类型     | 默认值 | 说明               |
| --------------- | -------- | ------ | ------------------ |
| selected        | Object   | `""`   | 默认的选中的值     |
| indexData       | Array    | `[]`   | 必要参数，索引列表 |
| onSelected      | Function | `null` | 选中后的回调函数   |
| isShowIndicator | Boolean  | `true` | 显示快速索引提示   |

##使用：

_导入_

```javascript
import { countryAreaCode } from 'components'
```

_引入标签_

```vue
<country-area-code
    v-if="showCodeList"
    v-model="showCodeList"
    :selected="selected"
    :indexData="indexData"
    @onSelected="onSelected"
>
</country-area-code>
```

_自定义参数_

```javascript
data() {
    return {
        showCodeList: false, // 显示国家地区区号组件
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
                    {
                        "name": "香港 (中华人民共和国)",
                        "firstName": "X",
                        "code": "+852",
                        "isHot": "1"
                    },
                    {
                        "name": "澳门 (中华人民共和国)",
                        "firstName": "A",
                        "code": "+853",
                        "isHot": "1"
                    },
                    {
                        "name": "台湾 (中华人民共和国)",
                        "firstName": "T",
                        "code": "+886",
                        "isHot": "1"
                    },
                    {
                        "name": "中国",
                        "firstName": "Z",
                        "code": "+86",
                        "isHot": "1"
                    }
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
            {
                "type": "C",
                "list": [
                    {
                        "name": "查德",
                        "firstName": "C",
                        "code": "+235",
                        "isHot": "0"
                    },
                    {
                        "name": "赤道几内亚",
                        "firstName": "C",
                        "code": "+240",
                        "isHot": "0"
                    }
                ]
            },
            {
                "type": "D",
                "list": [
                    {
                        "name": "丹麦",
                        "firstName": "D",
                        "code": "+45",
                        "isHot": "0"
                    },
                    {
                        "name": "德国",
                        "firstName": "D",
                        "code": "+49",
                        "isHot": "0"
                    }
                ]
            }
        ]
    }
}
```
