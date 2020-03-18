import Vue from 'vue'

import Axios from 'axios'
import Qs from 'qs'
// import { Message } from 'element-ui';

const config = {
    // 请求类型，默认get
    method: 'get',
    baseURL: process.env.VUE_APP_APIURL, //当前环境地址

    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    // FormData or Stream
    // You may modify the headers object.
    // transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    // return data;
    // }],

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    // transformResponse: [function (data) {
    // Do whatever you want to transform the data

    //     return data;
    // }],

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'Authorization': ''
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {},

    // `paramsSerializer` is an optional function in charge of serializing `params`
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
    },

    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
    data: {},

    timeout: 60000,

    withCredentials: true, // default

    // `adapter` allows custom handling of requests which makes testing easier.
    // Return a promise and supply a valid response (see lib/adapters/README.md).
    // adapter: function (config) {},

    // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
    // This will set an `Authorization` header, overwriting any existing
    // `Authorization` custom headers you have set using `headers`.
    // auth: null,

    responseType: 'json', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // `onUploadProgress` allows handling of progress events for uploads
    onUploadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    },

    // `onDownloadProgress` allows handling of progress events for downloads
    onDownloadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    },

    // `maxContentLength` defines the max size of the http response content allowed
    maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function(status) {
        return status >= 200 && status < 300 // default
    },

    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 5, // default

    // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
    // and https requests, respectively, in node.js. This allows options to be added like
    // `keepAlive` that are not enabled by default.
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),

    // 'proxy' defines the hostname and port of the proxy server
    // Use `false` to disable proxies, ignoring environment variables.
    // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
    // supplies credentials.
    // This will set an `Proxy-Authorization` header, overwriting any existing
    // `Proxy-Authorization` custom headers you have set using `headers`.
    proxy: false

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    // cancelToken: new CancelToken(function (cancel) {})
}

const axios = Axios.create(config)

// //code状态码200判断
// Axios.interceptors.response.use((res) => {
//     if (res.data.code !== 200) {
//        // Toast(res.data.msg);
//         return Promise.reject(res);
//     }
//     //Toast(res.data.msg);
//     return res;
// }, (error) => {
//    // Toast(Tips.request.errorNet);
//     return Promise.reject(error);
// });

// 请求拦截配置
axios.interceptors.request.use(
        config => {
            return config
        },
        error => {
            console.warn('request error', error)
            Toast(Tips.request.errorData)
                // 对请求错误做些什么
            return Promise.reject(error)
        }
    )
    // 返回拦截配置
axios.interceptors.response.use(
    res => {
        return res
            // if (res.data.code === 200) {
            //     return res;
            // } else {
            //     // Message(res.data.msg);
            //     return Promise.reject(res);
            // }
    },
    error => {
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        //
        //   // 此处对未登录用户的请求做统一处理，跳转到登录界面
        //   const { status } = error.response;
        //   if (status === 401) { console.log('401')
        //       const pathname = window.location.pathname;
        //       const href = window.location.href;
        //       if (href.lastIndexOf('/login') < 0) {
        //           Message('请先登录');
        //           setTimeout(() => {
        //               router.replace({
        //                   path: '/login',
        //                   query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
        //               })
        //           }, 1000);
        //       }
        //   } else { console.log('not 401')
        //       Message(Tips.request.errorNet);
        //   }
        //   return Promise.reject(error);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        //   Message('请求失败');
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log('Error', error.message);
        // }
        return Promise.reject(error)
    }
)
export default axios