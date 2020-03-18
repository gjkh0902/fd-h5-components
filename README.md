# fd-h5-components

## Installation

```bash
# npm
npm install fd-h5-components -S

# yarn
yarn add fd-h5-components -S

```

## Usage

```javascript
import Vue from "vue"

// 全量引入
import Fdh5 from "fd-h5-components"
Vue.use(Fdh5)

// 按需加载
import { IndexList,TabNav,Toast,... } from "fd-h5-components"
Vue.use(IndexList)
Vue.use(TabNav)
Vue.use(Toast)
...
```