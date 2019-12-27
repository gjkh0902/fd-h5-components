## 微信SDK库
***
>基于微信1.3.2版本SDK常用方法进行封装；

> ### JSSDK使用步骤
> #### 步骤一：绑定域名
>> 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
> #### 步骤二：引入JS文件
>> https://res.wx.qq.com/open/js/jweixin-1.3.2.js；
> #### 步骤三：通过wxConfig接口注入权限验证配置
>> 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,
> #### 步骤四：通过wxReady接口处理成功验证
>> config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

### wxConfig
>注入权限验证配置
```js
//示例
const param = {
    debug: true,
    appId: 'xxxx',
    timestamp: 1825575,
    nonceStr: 'xxxxx',
    signature: 'xxxxx',
    jsApiList: ['chooseWXPay']
}
wxConfig(param)
```
#### @param { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
debug     |Boolean |否     | 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
appId     |String  |是    |公众号的唯一标识
timestamp |Number  |是    |生成签名的时间戳
nonceStr  |String  |是    |生成签名的随机串
signature |String  |是    |签名
jsApiList |Array   |是    |需要使用的JS接口列表；默认：['checkJsApi'|'hideOptionMenu'|'showOptionMenu','onMenuShareTimeline'|'onMenuShareAppMessage'|'chooseWXPay']
---

### wxReady
> config信息验证后会执行ready方法
```
//示例：
cosnt callback = function() {
    //do something...
}
wxReady(callback);
```
#### @callback { Function }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
callback  |Function |是     |config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
---

### checkJsApi
> 判断当前客户端版本是否支持指定JS接口
```js
//示例：
const params = {
    jsApiList: ['chooseWXPay'],
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {}
}
checkJsApi(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
jsApiList  |Array |是     |需要检测的JS接口列表
success    |Function |否  |调用成功后的回调方法
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxGetNetworkType
> 获取网络状态接口
```js
//示例：
const params = {
    success: function(res) {
        // 返回网络类型2g，3g，4g，wifi
        var networkType = res.networkType;
    },
    fail: function(res) {},
    complete: function(res) {}
}
wxGetNetworkType(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
success    |Function |否  |调用成功后的回调方法，// 返回网络类型res.networkType 2g，3g，4g，wifi
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxChooseImage
> 拍照或从手机相册中选图接口
```js
//示例：
const params = {
    count: 1,
    sizeType: ['original', 'compressed'], 
    sourceType: ['album', 'camera'], 
    success: function(res) {
        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        var localIds = res.localIds;
    },
    cancel: function(res) {},
    fail: function(res) {},
    complete: function(res) {}
}
wxChooseImage(params);
```
#### @params { Object }
> 选相册配置参数对象
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
count  |Number |否     |图片数量，默认9
sizeType  |Array |否     |可以指定是原图还是压缩图，默认二者都有['original', 'compressed']
sourceType |Array|否    |可以指定来源是相册还是相机，默认二者都有['album', 'camera']
success    |Function |否  |调用成功后的回调方法，// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
fail       |Function |否  |调用失败后的回调方法
cancel     |Function |否  |用户取消的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxUploadImage
> 微信上传图片接口
```js
//示例：
const params = {
    localId: 'xxxx',
    success: function (res) {
        // 返回图片的服务器端ID
        var serverId = res.serverId; 
    },
    fail: function(res) {},
    complete: function(res) {}
}
wxUploadImage(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
localId   |String  |是     |需要上传的图片的本地ID，由chooseImage接口获得
success    |Function |否  |调用成功后的回调方法，// 返回图片的服务器端ID
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxGetLocalImgData
> 获取本地图片接口
```js
//示例：
const params = {
    localId: 'xxxx',
    success: function (res) {
        // localData是图片的base64数据，可以用img标签显示
        var localData = res.localData;
    },
    fail: function(res) {},
    complete: function(res) {}
}
wxGetLocalImgData(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
localId   |String  |是     |需要上传的图片的本地ID，由chooseImage接口获得
success    |Function |否  |调用成功后的回调方法，// localData是图片的base64数据，可以用img标签显示
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxStartRecord
> 开始录音接口
```js
//示例：
wxStartRecord();
```
---
### wxStopRecord
> 停止录音
```js
//示例：
const params = {
    success: function (res) {
        // 返回录音本地id
        var localId = res.localId;
    },
    fail: function(res) {},
    complete: function(res) {}
}
wxStopRecord(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
success    |Function |否  |调用成功后的回调方法，//返回录音本地id
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxOnVoiceRecordEnd
> 监听录音自动停止接口；录音时间超过一分钟没有停止的时候会执行 complete 回调
```js
//示例：
const params = {
    success: function (res) {
        // 返回录音本地id
        var localId = res.localId;
    },
    fail: function(res) {},
    complete: function(res) {
        // 返回录音本地id
        var localId = res.localId;
    }
}
wxOnVoiceRecordEnd(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
success    |Function |否  |调用成功后的回调方法，//返回录音本地id
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxUploadVoice
> 上传语音接口
```js
//示例：
const params = {
    localId: 'xxxxx',
    isShowProgressTips: 0,
    success: function (res) {
        // 返回音频的服务器端ID
        var serverId = res.serverId;
    },
    fail: function(res) {},
    complete: function(res) {
        // 返回音频的服务器端ID
        var serverId = res.serverId;
    }
}
wxUploadVoice(params);
```
#### @params { Object }
---
参数       |类型    | 必填 |说明
|:---     |:--     |:--  |:---
localId   |String  |是     |需要上传的音频的本地ID，由stopRecord接口获得
isShowProgressTips|Boolen | 否 |默认为1，显示进度提示
success    |Function |否  |调用成功后的回调方法，//返回音频的服务器端ID
fail       |Function |否  |调用失败后的回调方法
complete   |Function |否  |调用完成后的回调方法 //返回音频的服务器端ID
---

### wxShare
> 微信分享
```js
//示例：
const params = {
    pyTitle: '琴童家长学习讲堂',
    pyDesc: '这里有一节很棒的课程推荐给你，帮助家长解决孩子学琴道路上的种种困惑',
    pyqTitle: '琴童家长学习讲堂',
    pyqDesc: '这里有一节很棒的课程推荐给你，帮助家长解决孩子学琴道路上的种种困惑',
    link: window.location.href,
    imgUrl: window.location.origin + '/images/icon_share@2x.png',
    success: function () {},
    cancel: function() {},
    fail: function() {},
    complete: function() {}
}
wxShare(params);
```
#### @params { Object }
> 微信分享配置参数对象
---
|参数       |类型    | 必填  |说明
|:---      |:--    |:--    |:---
pyTitle    |String |否     |微信好友：分享标题
pyDesc     |String |否     |微信好友：分享描述
pyqTitle   |String |否     |微信圈：分享标题
pyqDesc    |String |否     |微信圈：分享描述
link         |String |否    |分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
imgUrl       |String   |是    |分享图标地址
success    |Function |否  |调用成功后的回调方法
fail       |Function |否  |调用失败后的回调方法
cancel     |Function |否  |调用取消后的回调方法
complete   |Function |否  |调用完成后的回调方法
---

### wxPay
>微信SDK支付
```js
//示例
const param = {
    timeStamp: 1825575,
    nonceStr: 'xxxx',
    package: 'xxxx',
    signType: 'xxxxx',
    paySign: 'xxxxx',
    success: function () {},
    cancel: function() {},
    fail: function() {},
    complete: function() {}
}
wxPay(param)
```
#### @param { Object }
---
|参数         |类型      |必填   |说明
|:---        |:--       |:--   |:---
timestamp    |Number    |是    | 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
nonceStr     |String    |是    |支付签名随机串，不长于 32 位
package      |String    |是    |统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
signType     |String    |是    |签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
paySign      |String    |是    |支付签名
success    |Function |否  |调用成功后的回调方法
fail       |Function |否  |调用失败后的回调方法
cancel     |Function |否  |调用取消后的回调方法
complete   |Function |否  |调用完成后的回调方法
---