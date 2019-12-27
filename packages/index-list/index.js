import IndexList from "./src/index.vue"

IndexList.install = function(Vue) {
	Vue.component(IndexList.name, IndexList)
}

export default IndexList
