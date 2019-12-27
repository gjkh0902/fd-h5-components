import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./util/rem"
import { Indicator, MessageBox, Toast } from "mint-ui"
import "mint-ui/lib/style.css"

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === "production" ? false : true

/*
 * minu-ui      全局注册常用事件
 * @Indicator   loading加载中
 * @MessageBox  弹出框
 * @Toast       提示信息
 */
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$Indicator = Indicator

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app")
