import IndexList from "./index-list"
import TabNav from "./tab-nav"

const components = [IndexList, TabNav]

const install = function(Vue) {
	if (install.installed) return
	components.map(component => Vue.component(component.name, component))
}

if (typeof window !== "undefined" && window.Vue) {
	install(window.Vue)
}
export { install, IndexList, TabNav }

export default { install, IndexList, TabNav }
