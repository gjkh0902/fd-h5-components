/**
 * @desc http请求方法
 * @external axios                  http请求库
 * @func httpRequest                http请求方法
 * @exports httpRequest             导出http请求方法
 */

import router from '../router';
import axios from './httpConfig';
import { Toast } from 'mint-ui';

/**
 * @desc 请求模块
 * @param  {String} type                请求方式，选填，默认值get
 * @param  {String} url                 这里传入的是接口路径, 必填
 * @param  {Object} data                请求主体被发送的数据，选填
 * @param  {Object} params              url请求参数，选填
 * @param  {Object} options             包含其他参数属性的对象，选填
 * @prop   {Object} options.header      请求头设置，选填，会覆盖默认配置
 * @return {Object} Promise
 */
const httpRequest = ({
    type = 'get',
    url = '',
    data = {},
    params = {},
    ...options
}) => {
    return new Promise((resolve, reject) => {
        axios.request({ type, url, data, params, ...options })
            .then(res => {

                // 判断请求的是json数据还是文件数据
                // 如果是文件数据则返回整个response
                if ( options.responseType === 'blob' ) {
                    resolve(res);
                } else {
                    if (res.data.code === 200) {
                        resolve(res.data);
                    } else if (res.data.code === 500) {
                        Toast({ message: '服务器异常' });
                        reject();
                    } else {
                        resolve(res.data);
                    }
                }
            })
            .catch(error => {
                if (error.response) {
                    // 如果未认证（401），删除本地token并跳转到登录页
                    if (error.response.status === 401) {
                        Toast({ message: '登录失败，帐号或密码错误' });
                        reject(error);
                    } else if (error.response.status === 403) {
                        Toast({ message: '该账号无权限访问' });
                        reject(error);
                        let tid = setTimeout(() => {
                            router.replace({ path: '/' });
                            clearTimeout(tid);
                        }, 300);
                    } else {
                        reject(error);
                    }
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.warn(error.request);
                  Toast({ message: '请求失败，服务未响应' });
                  reject(error);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.warn('Error', error.message);
                  reject(error);
                }
            })
    });
}

export default httpRequest;
