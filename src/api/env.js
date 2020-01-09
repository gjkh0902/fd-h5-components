/*
 * 全局环境配置
 * @api  后台api地址
 * @link 全局链接地址
 */
const CONFIG = {
    // 本地环境
    LOCAL: {
        //easymock
        api: "https://www.easy-mock.com/mock/5a9ea76e659f3528054b1598",
        link: {}
    },
    // DEV环境
    DEV: {
        api: "http://apitree.dev.pnlyy.com/v1",
        link: {}
    },
    // PRE环境
    PRE: {
        api: "http://apitree.pre.pnlyy.com/v1",
        link: {}
    },
    // PRD环境
    PRD: {
        api: "http://apitree.pnlyy.com/v1",
        link: {}
    }
}

//检测环境
let nowHost = window.location.host
if (nowHost.includes("webtree.dev.pnlyy.com")) {
    global.APIMSG = CONFIG.DEV
} else if (nowHost.includes("webtree.pre.pnlyy.com")) {
    global.APIMSG = CONFIG.PRE
} else if (nowHost.includes("webtree.pnlyy.com")) {
    global.APIMSG = CONFIG.PRD
} else {
    global.APIMSG = CONFIG.LOCAL
}

export default global.APIMSG