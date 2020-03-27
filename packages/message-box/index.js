const TITLE_TEXT = '提示'
const OK_TEXT = '确定'
const ERROR_TEXT = 'sorry,暂不支持此类型参数，请传字符串或对象～'

const defaults = {
    isShow: false, //隐藏
    title: TITLE_TEXT, // 提示标题
    text: '', // 内容
    html: false, // HTML 内容
    ok: OK_TEXT, // 确定按钮名称
    cancel: '', // 取消按钮名称
    callback: null // 按钮回调
}

import Vue from 'vue'
import MessageBoxVue from './src/index.vue'

//合并工具
let merge = function(target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
        var source = arguments[i]
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                var value = source[prop]
                if (value !== undefined) {
                    target[prop] = value
                }
            }
        }
    }

    return target
}

let MessageBoxConstructor = Vue.extend(MessageBoxVue)

let currentMsg, instance
let msgQueue = []

//初始化
let initInstance = function() {
    instance = new MessageBoxConstructor({
        el: document.createElement('div')
    })
}

//控制信息输出
let showNextMsg = function() {
    if (!instance) {
        initInstance()
    }

    //console.log(msgQueue)
    if (msgQueue.length > 0) {
        currentMsg = msgQueue.shift()

        let options = currentMsg.options
        for (let prop in options) {
            if (options.hasOwnProperty(prop)) {
                instance[prop] = options[prop]
            }
        }
        if (options.callback === undefined) {
            instance.callback = null
        }
        document.body.appendChild(instance.$el)

        //console.log('instance', instance)
        Vue.nextTick(() => {
            instance.isShow = true
        })
    }
}

//类型返回
let callTypeCheck = function(params) {
    let thisType = Object.prototype.toString.call(params)
    if (thisType === '[object Object]' || thisType === '[object String]') {
        return true
    }
}

//MessageBox入口
let MessageBox = function(options) {
    if (options && callTypeCheck(options)) {
        if (typeof options === 'string') {
            options = {
                title: options
            }
        }
    } else {
        //参数类型错误
        options = {
            title: ERROR_TEXT
        }
    }
    msgQueue.push({
        options: merge({}, defaults, MessageBox.defaults || {}, options)
    })
    showNextMsg()
}

//关闭MessageBox
MessageBox.close = function() {
    if (!instance) return
    instance.isShow = false
    msgQueue = []
    currentMsg = null
}

export default MessageBox
export { MessageBox }