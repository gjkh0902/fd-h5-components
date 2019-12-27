/**/
import httpRequest from '@api/http';

/**
 * @desc 获取上传所需的token
 * @return {Promise}
 */
 export const fetchUploadToken = () => httpRequest({
    method: 'get',
    //  url: 'http://guarder-v1-qa.peilian.com/guarder/v1/login/getQiNiuToken',
    url: 'http://cms-api-dev.peilian.com/qiniu/token',
    timeout: 10000,          // 请求超过10秒就失败
 });

