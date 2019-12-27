## 微信方法示例代码
> demo所涉及接口都是基于crm接口定义
### 首先引入所需功能方法
```js
// 引入所需要的功能方法
import { wxConfig, wxReady, wxGetNetworkType } from 'util/wx';
```
### 第二步注入方法权限
```js
// 根据自己业务自行进行 api请求方法封装
import wxHttp from 'service/wxService';
/**
 * @desc jsApiList参数对照
 * wxGetNetworkType       获取微信的网络状态
 * hideOptionMenu         隐藏配置功能菜单
 * showOptionMenu         显示配置功能菜单
 * onMenuShareTimeline    自定义分享内容接口：分享到朋友圈
 * onMenuShareAppMessage  自定义分享内容接口：分享到微信好友
 * chooseWXPay            发起一个微信支付请求
 * chooseImage            拍照或从手机相册中选图接口
 * uploadImage            上传图片接口
 * startRecord            开始录音接口
 * stopRecord             停止录音接口
 * onVoiceRecordEnd       监听录音自动停止接口
 * uploadVoice            上传语音接口
 */
// 首先调用wxConfig将使用方法权限注入
initConfig() {
    const params = {
        share_url: window.location.href
    }
    // 调用接口接口获取微信公众号的appId、timestamp、nonceStr、signature相关参数
    wxHttp.getWechat(params).then(res=>{
        if(res.code===200) {
            let params = {
                ...res.data,
                jsApiList:['wxGetNetworkType','hideOptionMenu','showOptionMenu','onMenuShareTimeline','onMenuShareAppMessage','chooseWXPay','chooseImage','uploadImage']
            }
            wxConfig(params);
        } else {
            this.Toast(res.msg);
        }
    }).catch(error=>{
        // do something
    })
}
```
### 微信分享设置
```js
// 设置分享内容
function setShare() {
    const config = {
        pyTitle: '停止无用功，高效练琴精品课，一起来抢！',
        pyDesc: '大咖老师云集，全方位讲解练琴干货，快速解决孩子学琴的种种困惑',
        pyqTitle: '停止无用功，高效练琴精品课，一起来抢！',
        pyqDesc: '大咖老师云集，全方位讲解练琴干货，快速解决孩子学琴的种种困惑',
        link: window.location.href,
        imgUrl: window.location.origin + '/images/icon_share@2x.png',
        success: function () {},
        cancel: function() {},
        fail: function() {},
        complete: function() {}
    }
    wxShare(config)
}
// 如果分享需要页面加载中设置的、这需要将设置方法在wxReady方法的回调中调用
// 如果用户触发的方法则不需要放在wxReady中
wxReady(setShare())
```
### 获取网络状态
```js
// 获取微信的网络状态
getNetworkType() {
    const params = {
        success: function(res) {
            // { detailtype: "4g", simtype: 2, errMsg: "getNetworkType:ok", networkType: "3g+" } 
            // { simtype: 2, errMsg: "getNetworkType:ok", networkType: "wifi" }
            console.log('success',res)
        },
        fail: function(res) {
            // { simtype: 2, errMsg: "getNetworkType:fail" }
            console.log('fail',res)
        },
        complete: function(res) {
            console.log('complete',res)
        }
    }
    wxGetNetworkType(params);
},
```
### 微信上传图片
```js
// 上传图片
function chooseImage() {
    const _this = this;
    const params = {
        count: 1,
        success: function(res) {
            // { localIds: ["wxLocalResource://598778356738332"], sourceType: "album", errMsg: "chooseImage:ok" }
            console.log('success',res);
            uploadImages(res.localIds[0]);
        },
        cancel: function(res) {
            console.log('cancel',res);
        },
        fail: function(res) {
            console.log('fail',res)
        },
        complete: function(res) {
            console.log('complete',res)
        }
    }
    wxChooseImage(params)
},
// 上传
function uploadImages(localId) {
    const params = {
        localId: localId,
        success: function(res) {
            // { localId: "wxLocalResource://598778356738332", serverId: "8zz5pQwCkqRDt7sIGhELFlST8H468qkpmaSSLl29CBcxAx3IrzfcIvz0NmVKXaRf", errMsg: "uploadImage:ok" }
            console.log('uploadImagessuccess',res);
            // do something
        },
        fail: function(res) {
            console.log('uploadImagesfail',res)
        },
        complete: function(res) {
            console.log('uploadImagescomplete',res)
        }
    }
    wxUploadImage(params);
},
// 调用选择图片
chooseImage();
```
### 微信SDK支付
```js
// 根据自己业务自行进行 api请求方法封装
import wxHttp from 'service/wxService';

function payOrder() {
    // 首先请求公众号支付签名
    wxHttp.payOrder(order_number).then(res => {
        const {code, data, msg} = res;
        if (code === 200) {
            const wxConfig = {
                appId: data.appId,
                nonceStr: data.nonceStr,
                package: data.package,
                paySign: data.paySign,
                signType: data.signType,
                timeStamp: data.timeStamp,
                success: function (res) {
                    // do something
                },
                fail: function(res) {
                    // do something
                },
                cancel: function(res) {
                    // do something
                },
            };
            wxPay(wxConfig);
        } else {
            // do something
        }
    }).catch(error => {
        // this.Toast('支付失败,请尝试重新支付');
    })
}
```
## 前端微信授权demo
>crm授权修改为前端直接授权，用微信code通过接口换取jwt-token存放本地；
>由于crm换取用户身份token的接口分开两个，所以这里判断区分了静默非静默授权的区分请求不同的接口；可根据业务自行修改
```js
// 配置文件配置公众号appid
import env from 'api/env';
// 根据自己业务自行进行 api请求方法封装
import wxHttp from 'service/wxService';
/**
 * @desc 存储localStorage
 * @param 	{String}	name	键名
 * @param	{String}	content	内容
 */
const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}
/**
 * @desc 获取localStorage
 * @param {String}	name 	键名
 * @return	{String}	返回值
 */
const getStore = name => typeof name === 'string' && window.localStorage.getItem(name);
/**
 * 获取url参数object
 * @return {Object} 返回query参数对象
 */
export const getParams = ()=> {
    let url = location.search; //获取url中"?"符后的字串
    let queryObj = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1),
            strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            queryObj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return queryObj;
}
/**
 * @desc 重新拼接url参数添加或减少参数
 * @param {*} type add新增、minus去掉某些参数
 * @param {*} obj 增删的key、value
 */
const newQueryString = (type,obj) => {
    let queryObj = Object.assign(getParams(),obj),
        searchArr = [],
        searString = '';
    for (const key in queryObj) {
        if (queryObj.hasOwnProperty(key)) {
            if(type=='add') {
                const keyString = key + '=' + queryObj[key];
                searchArr.push(keyString);
            } else if(type=='minus') {
                if(!obj.hasOwnProperty(key)) {
                    const keyString = key + '=' + queryObj[key];
                    searchArr.push(keyString);
                }
                console.log(obj.hasOwnProperty(key),80808)
            }
        }
    }
    if(searchArr.length>0) {
        searString = '?' + searchArr.join('&');
    }
    return searString;
}
/**
 * @wxLogin 活动类登录授权
 * @param {*} silent 是否静默授权
 * @param {*} resolve 如果不需要授权执行的回调
 */
const wxLogin = (silent = true, resolve = f => f)=> {
    //获取url参数转化为对象: ?a=xxx&b=xxx => {a:xxx,b=xxx}
    const queryObj = getParams();
    // 获取本地存放jwt-token
    const token = getStore('activityToken') || '';
    // 静默授权本地有token的时候，直接执行回调不进行授权；非静默授权不关心本地是否有token
    // 如果queryObj中包含了code及scopeType参数则认为是授权回来微信回跳回来，这需要将code换取jwt-token
    if(token === '' || silent === false) {
        toAuthorized(silent,queryObj);
    } else if(queryObj.code && queryObj.scopeType) {
        toAuthorized(silent,queryObj);
    } else {
        resolve();
    }
}
/**
 * @toAuthorized 调用微信授权，然后去请求接口返回用户身份信息token
 * @param {*} silent 是否静默授权
 * appId 公众号appid，通过配置
 * queryObj 当前地址的url上面的参数转化的对象 ?a=xxx&b=xxx => {a:xxx,b=xxx}
 * scope 授权类型
 * search 微信会跳地址重新拼接的 search
 */
const toAuthorized = (silent = true,queryObj)=> {
    // 前端授权微信，微信跳转回来query中会携带参数code，以此判断是否是微信授权回来的链接
    if(!queryObj.code){
        let scope = '',                   //授权类型
            url = '',                     //授权回跳地址
            appId = env.appId,            //公众号appid
            search = '';                  //回调地址QueryString
        const host = window.location.host;
        // 根据授权类型去添加scopeType参数用以授权回来后通过scopeType的值来判断区分授权类型（静默授权、非静默授权），调用不同的参数
        if(silent) {
            scope = 'snsapi_base';
            search = newQueryString('add',{scopeType: 'base'});
        } else {
            scope = 'snsapi_userinfo';
            search = newQueryString('add',{scopeType: 'info'});
        }
        url = window.location.origin + window.location.pathname + search;
        // 跳转微信接口授权
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect'
    }else{
        // 授权code换取jwt-token的参数
        let params = {
            code: queryObj.code
        };
        // title记录当前页面title
        let title = document.title,
            pathname = window.location.pathname
        // 授权回来，获取参数scopeType判断授权类型，然后给接口换取用户身份token；
        // 由于crm换取用户身份token的接口分开两个，所以这里判断区分了静默非静默授权的区分请求不同的接口；可根据业务自行修改
        if(queryObj.scopeType === 'base') {
            params.from = 'activity';
            // 静默授权换取token
            wxHttp.login(params).then(res => {
                const { code,data } = res;
                if(code === 200) {
                    // 请求成功后将token存在本地
                    setStore('activityToken',data.token || null);
                    // 去掉url地址中的code，以及scopeType，防止刷新页面后重复使用code
                    const reUrl = window.location.origin + pathname + newQueryString('minus',{code:'',scopeType:'',state:''});
                    window.history.replaceState({},title,reUrl);
                    window.location.href = reUrl;
                } else {
                    console.log(222)
                }
            }).catch(error => {
                console.log('静默授权换取token，error', error);
            })
        } else if(queryObj.scopeType === 'info') {
            // 非静默授权换取token
            wxHttp.setAuthorize(params).then(res => {
                const { code,data } = res;
                if(code === 200) {
                    // 请求成功后将token存在本地
                    setStore('activityToken',data.token || null);
                    // 去掉url地址中的code，以及scopeType，防止刷新页面后重复使用code
                    const reUrl = window.location.origin + pathname + newQueryString('minus',{code:'',scopeType:'',state:''});
                    window.history.replaceState({},title,reUrl);
                    window.location.href = reUrl;
                } else {
                    console.log(222)
                }
            }).catch(error => {
                console.log('非静默授权换取token，error', error);
            })
        }
    }
}
// 静默授权调用方式
wxLogin(true,function callback(){})
// 非静默授权调用方式
wxLogin(false);
```