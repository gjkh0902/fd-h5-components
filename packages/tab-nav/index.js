import TabNav from "./src/index.vue"

TabNav.install = function(Vue) {
	Vue.component(TabNav.name, TabNav)
}

export default TabNav
