# Tab 标签页

移动端 H5Tab 切换功能

-   tab 切换，内容始终居中高亮展示
-   支持选中回调操作

[示例](http://fd.peilian.com/h5/tab-nav)

## 使用示例

```vue
<fd-tab-nav :list="tabNavConf.navList" :curr-index="tabNavConf.currIndex" :on-change="tabNavChange">
    <template slot-scope="scope">
        <!-- <div>索引：{{scope.index}}</div> -->
        <div>{{ scope.item.name }}</div>
    </template>
</fd-tab-nav>
```

```js
import Vue from 'vue'
import { TabNav } from "fd-h5-components";
Vue.use(TabNav);
// 组件中使用示例
export default {
    ...,
    data() {
        return {
			tabNavConf: {
                currIndex: 0,
                navList: [
                    { "id": 1, "name": "要闻" },
                    { "id": 2, "name": "视频" },
                    { "id": 3, "name": "推荐" },
                    { "id": 4, "name": "上海" },
                    { "id": 5, "name": "娱乐" },
                    { "id": 6, "name": "体育" },
                ]
            }
        }
    },
    methods: {
        tabNavChange (val) {
            console.log('用户点击', val)
        }
    }
}
```

## 组件参数

| 参数         | 类型             | 默认值 | 说明                       |
| ------------ | ---------------- | ------ | -------------------------- |
| navList      | Array            | `[]`   | 必要参数，Tab 导航列表数据 |
| currIndex    | String 或 Number | `0`    | 是否显示圈内进度百分比     |
| tabNavChange | Function         | `null` | 选中项变化后的回调函数     |
