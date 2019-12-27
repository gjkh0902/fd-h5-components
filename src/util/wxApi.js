import Vue from 'vue';
import { Toast } from 'mint-ui';
import Tips from '../api/tips';
import Env from '../api/env';
Vue.component(Toast.name, Toast);

/*
 * 微信支付
 * @appId 公众号名称id，由商户传入
 * @timeStamp 时间戳，自1970年以来的秒数
 * @nonceStr 随机串
 * @package package包
 * @signType 微信签名方式
 * @paySign 微信签名
*/
const wxPay = (params,success,fail,successLink) => {
  function onBridgeReady(){
     WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
             "appId": params.appId,//公众号名称，由商户传入
             "timeStamp": params.timeStamp, //时间戳，自1970年以来的秒数
             "nonceStr": params.nonceStr, //随机串
             "package": params.package,//package包
             "signType": params.signType, //微信签名方式
             "paySign": params.paySign //微信签名
         },
         function(res){
             // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
             if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              Toast(Tips.wxpay.success);
              setTimeout(function(){
                //this.$router.push(`/paySuccess/`);//跳转成功页面
                window.location.href = successLink?successLink:"/paySuccess/";
              },1000)
             }else {
               Toast(Tips.wxpay.error);
             }
         }
     );
  }
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
     }else if (document.attachEvent){
         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
     }
  }else{
     onBridgeReady();
  }
};

/*
 * 微信分享
 * @title 分享渠道
 * @desc 分享描述
 * @link 分享链接地址 (global.APIMSG.link.index+相对地址)
 * @imgUrl 分享图片链接地址 (global.APIMSG.link.index+相对地址)
 * @jsApiList 分享渠道
 * @Env.share 获取默认分享信息
*/
const wxShare = (params,shareParams,success,fail) => {
  //是否自定义分享
  if(!shareParams){
    const shareParams = {title : "",desc: "",link: "",imgUrl: "",jsApiList: ""};
  }
  wx.config({
    debug:false,
    appId:params.appId,
    timestamp:params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: shareParams.jsApiList||Env.share.defaultApi
  });
  wx.ready(function () {
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: shareParams.title||Env.share.defaultTitle,
        desc: shareParams.desc||Env.share.defaultDesc,
        link: shareParams.link||Env.share.defaultUrl,
        imgUrl: shareParams.imgUrl||Env.share.defaultImg,
        success: function () {
            //用户确认分享后执行的回调函数
        },
        cancel: function () {
            //用户取消分享后执行的回调函数
        }
    });
    //分享给朋友圈
    wx.onMenuShareTimeline({
        title: shareParams.title||Env.share.defaultTitle,
        desc: shareParams.desc||Env.share.defaultDesc,
        link: shareParams.link||Env.share.defaultUrl,
        imgUrl: shareParams.imgUrl||Env.share.defaultImg,
        success: function () {
            //用户确认分享后执行的回调函数
        },
        cancel: function () {
            //用户取消分享后执行的回调函数
        }
    });
  });
};

/*
 * 禁止微信分享
*/
const wxShareForbids = () => {
  function onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
  }

  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
};

/*
 * 微信图片上传配置
 * @appId 公众号名称id，由商户传入
 * @timeStamp 时间戳，自1970年以来的秒数
 * @nonceStr 随机串
 * @package package包
 * @signType 微信签名方式
 * @paySign 微信签名
 */
const wxUploadConfig = (params,success,fail) => {
  wx.config({
    debug: false,
    appId: params.appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: [
      'getNetworkType',
      'checkJsApi',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'showMenuItems',
      'downloadImage',
      'showAllNonBaseMenuItem',
      'closeWindow'
    ]
  });

  wx.ready(function () {
    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'checkJsApi',
        'previewImage',
        'uploadImage',
        'chooseImage',
        'showMenuItems',
        'downloadImage',
        'showAllNonBaseMenuItem',
        'closeWindow'
      ],
      success: function(res) {
        //Toast(JSON.stringify(res));
      }
    });
  })

  wx.error(function(res) {
    Toast(res.errMsg);
  });
};

export {
  wxPay,
  wxShare,
  wxShareForbids,
  wxUploadConfig
}
