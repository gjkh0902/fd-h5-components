# 组件模块

一个目录一个组件

_文件描述_

> demo.vue，组件演示页
>
> index.vue，组件主入口
>
> index.js，组件模块导出

_demo.vue 演示页面模板结构_

```html
<template>
    <div class="demo-container">
        <h1>演示页面标题</h1>
        <component-name ref="Audio"
            :param-a="paramA"
            :param-b="paramB"
            :param-c="paramC">
        </component-name>
        <div>
          ......其他任何内容
        </div>
      </div>
        <div class="functions">
            <a class="demo-btn" href="/">返回首页</a>
            <button class="demo-btn" @click="play">功能一</button>
            <button class="demo-btn" @click="pause">功能二</button>
            <button class="demo-btn" @click="stop">功能三</button>
        </div>
    </div>
</template>
```

_index.js 导出模块_

```javascript
import componentName from './index.vue'
import componentNameA from './a.vue'
import componentNameB from './b.vue'

export {
    componentName,
    componentNameA,
    componentNameB
}
```

_如何引用_

```javascript
import ComponentName from '../components/component-folder/index.vue'
// 或者
import { componentNameA, componentNameB } from 'component-folder'
```

