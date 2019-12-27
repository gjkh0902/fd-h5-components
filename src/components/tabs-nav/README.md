# TabsNav导航栏

TabsNav 导航栏可以使当前选中项居中

| 参数           | 类型    | 默认值                    | 说明                                           |
| -------------- | ------- | ------------------------- | ---------------------------------------------- |
| list        | Array  | `[]`                     | 必要参数，Tab 导航列表数据 |
| currIndex    | String 或 Number | `0`                   | 是否显示圈内进度百分比                         |
| onChange           | Function | `null`           | 选中项变化后的回调函数                    |

##使用：

_导入_

```javascript
import { TabsNav } from 'components'
```

_引入标签_

```vue
<tabs-nav :list="navList" :curr-index="currIndex" :on-change="navChange">
    <template slot-scope="scope">
      <div>索引：{{scope.index}}</div>
      <div>{{scope.item.name}}</div>
    </template>
</tabs-nav>
```

_设置参数_

```javascript
data() {
    return {
        currIndex: 0,
        navList: [],
    }
},
methods: {
    navChange (x) {
        console.log('用户点击', x)
    }
}
```


