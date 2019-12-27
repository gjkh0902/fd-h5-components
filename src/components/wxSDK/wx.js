/**
 * @desc 注入权限验证配置
 * @param { Object } params
 * @jsApiList{ Array } 
 * 默认 :
 * 'checkJsApi'：检测支持微信接口,
 * 'hideOptionMenu'：隐藏分享菜单,
 * 'showOptionMenu'：显示分享菜单,
 * 'onMenuShareTimeline'：分享到朋友圈,
 * 'onMenuShareAppMessage'：分享给朋友,
 * 'chooseWXPay'：微信支付
 */
export function wxConfig(params) {
    wx.config({
        debug: params.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: params.appId, // 必填，公众号的唯一标识
        timestamp: params.timestamp, // 必填，生成签名的时间戳
        nonceStr: params.nonceStr, // 必填，生成签名的随机串
        signature: params.signature, // 必填，签名
        jsApiList: params.jsApiList || ['checkJsApi', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'] // 必填，需要使用的JS接口列表
    });
}

/**
 * @desc config信息验证后会执行ready方法
 * @param {Function} resolve 回调方法
 */
export function wxReady(resolve = f => f) {
    //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
    //config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
    //对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.ready(resolve());
}

/**
 * 判断当前客户端版本是否支持指定JS接口
 * @param {Array}    jsApiList  需要检测的JS接口列表
 * @param {Function} success    调用成功后的回调方法
 * @param {Function} fail       调用失败后的回调方法
 * @param {Function} complete   调用完成后的回调方法
 */
export function checkJsApi(params) {
    wx.checkJsApi({
        jsApiList: params.jsApiList,      // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        complete: function(res) {
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/**
 * @desc 获取网络状态接口
 * @param {Function} success    调用成功后的回调方法
 * @param {Function} fail       调用失败后的回调方法
 * @param {Function} complete   调用完成后的回调方法
 */
export function wxGetNetworkType(params) {
    wx.getNetworkType({
        success: function (res) {
            // var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        complete: function(res) {
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/*************** 上传图片API开始 ***************/

/**
 * @desc 拍照或从手机相册中选图接口
 * @param {Object} params 选相册配置参数对象
 * @param {Function} success    调用成功后的回调方法
 * @param {Function} fail       调用失败后的回调方法
 * @param {Function} cancel     调用用户取消的回调方法
 * @param {Function} complete   调用完成后的回调方法
 */
export function wxChooseImage(params={}) {
    wx.chooseImage({
        count: params.count || 9, // 默认9
        sizeType: params.sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: params.sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            // var localIds = res.localIds;
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        cancel: function(res) {
            if(params.cancel) {
                params.cancel(res);
            }
        },
        complete: function(res) {
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/**
 * @desc 微信上传图片接口
 * @param {String} localId 需要上传的图片的本地ID
 * @param {Function} success    调用成功后的回调方法
 * @param {Function} fail       调用失败后的回调方法
 * @param {Function} complete   调用完成后的回调方法
 */
export function wxUploadImage(params) {
    wx.uploadImage({
        localId: params.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            // 返回图片的服务器端ID
            // var serverId = res.serverId; 
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        complete: function(res) {
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/*************** 上传图片API结束 ***************/

/**
 * @desc 开始录音接口
 */
export function wxStartRecord() {
    wx.startRecord();
}

/**
 * @desc 停止录音
 * @param {Function} success    调用成功后的回调方法
 * @param {Function} fail       调用失败后的回调方法
 * @param {Function} complete   调用完成后的回调方法
 */
export function wxStopRecord(params) {
    wx.stopRecord({
        success: function (res) {
            // var localId = res.localId;
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        complete: function(res) {
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/**
 * @desc 监听录音自动停止接口
 * @param {Function} success    调用成功后的回调方法
 * @param {Function} fail       调用失败后的回调方法
 * @param {Function} complete   调用完成后的回调方法
 */
export function wxOnVoiceRecordEnd(params) {
    wx.onVoiceRecordEnd({
        success: function (res) {
            // var localId = res.localId;
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function(res) {
            // var localId = res.localId;
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/**
 * @desc 上传语音接口
 * @param  localId 必传；需要上传的音频的本地ID，由stopRecord接口获得
 * @param {Number} isShowProgressTips isShowProgressTips 非必传 显示进度提示
 * @param {Function} success    上传语音成功后的回调方法
 * @param {Function} fail       上传语音失败后的回调方法
 * @param {Function} complete   上传语音完成后的回调方法
 */
export function wxUploadVoice(params={}) {
    wx.uploadVoice({
        localId: params.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: params.isShowProgressTips || 1, // 默认为1，显示进度提示
        success: function (res) {
            // 返回音频的服务器端ID
            // var serverId = res.serverId; 
            if(params.success) {
                params.success(res);
            }
        },
        fail: function(res) {
            if(params.fail) {
                params.fail(res);
            }
        },
        complete: function(res) {
            if(params.complete) {
                params.complete(res);
            }
        }
    });
}

/**
 * @desc 微信分享
 * @param {String}   pyTitle   微信好友 分享标题
 * @param {String}   pyDesc    微信好友 分享描述
 * @param {String}   pyqTitle  微信朋友圈 分享标题
 * @param {String}   pyqDesc   微信朋友圈 分享描述
 * @param {String}   link      分享链接 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 * @param {String}   imgUrl    分享图标
 * @param {Boolen}   hideShare 是否隐藏功能按钮
 * @param {Function} success   分享成功回调
 * @param {Function} cancel    分享取消回调
 */
export function wxShare(shareConfig) {
    // 分享微信好友
    const shareParams = {
        title: shareConfig.pyTitle || '',                  // 分享标题
        desc: shareConfig.pyDesc || '',                    // 分享描述
        link: shareConfig.link || window.location.href,   // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareConfig.imgUrl,                       // 分享图标
        success: function () {
            if(shareConfig.success) {
                shareConfig.success();
            }
        },
        cancel: function() {
            if(shareConfig.cancel) {
                shareConfig.cancel();
            }
        },
        fail: function() {
            if(shareConfig.fail) {
                shareConfig.fail();
            }
        },
        complete: function() {
            if(shareConfig.complete) {
                shareConfig.complete();
            }
        }
    }
    // 分享微信朋友圈
    const sharePyqParams = {
        title: shareConfig.pyqTitle,      // 分享标题
        desc: shareConfig.pyqDesc,        // 分享描述
        link: shareConfig.link,           // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareConfig.imgUrl,       // 分享图标
        success: function () {
            if(shareConfig.success) {
                shareConfig.success();
            }
        },
        cancel: function() {
            if(shareConfig.cancel) {
                shareConfig.cancel();
            }
        },
        fail: function() {
            if(shareConfig.fail) {
                shareConfig.fail();
            }
        },
        complete: function() {
            if(shareConfig.complete) {
                shareConfig.complete();
            }
        }
    }
    if(shareConfig && shareConfig.hideShare) {
        wx.hideOptionMenu();                     //隐藏功能按钮接口
    } else {
        wx.onMenuShareAppMessage(shareParams);
        wx.onMenuShareTimeline(sharePyqParams);
        wx.showOptionMenu();                      //显示功能按钮接口
    }
}

/**
 * @desc 微信支付
 * @param {Number} timeStamp    支付签名时间戳
 * @param {String} nonceStr     支付签名随机串，不长于 32 位
 * @param {String} package      统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
 * @param {String} signType     签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
 * @param {String} signType     支付签名
 * @param {Function} success    支付成功后的回调方法
 * @param {Function} fail       支付失败后的回调方法
 * @param {Function} cancel     支付取消的回调方法
 * @param {Function} complete   支付完成后的回调方法
 */
export function wxPay(payConfig) {
    const wxPayConfig = {
        timestamp: payConfig.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payConfig.nonceStr, // 支付签名随机串，不长于 32 位
        package: payConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: payConfig.signType || 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payConfig.paySign,            // 支付签名
        success: function (res) {
            if(payConfig.success) {
                payConfig.success(res);
            }
        },
        fail: function(res) {
            if(payConfig.fail) {
                payConfig.fail(res);
            }
        },
        cancel: function(res) {
            if(payConfig.cancel) {
                payConfig.cancel(res);
            }
        },
        complete: function(res) {
            if(payConfig.complete) {
                payConfig.complete(res);
            }
        }
    };
    wx.chooseWXPay(wxPayConfig);
}