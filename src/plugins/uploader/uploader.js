/**
 * 七牛云上传插件
 * v1.0.0
 *
 * Copyright 2018, miaoke
 *
 * Auther：wangweijia
 * Date: 2018-05-19
 * LastUpdate: 2019-12-16
 */
import Qiniu from './qiniu';

/**
 * 是否为函数
 * @param  {Func}  func 预期传入函数
 * @return {Boolean}      返回判断值
 */
const isFunc = func => typeof func === 'function';
/**
 * 是否为字符串
 * @param  {Func}  func 预期传入函数
 * @return {Boolean}      返回判断值
 */
const isString = str => typeof str === 'string';

// 默认校验文件类型
const typeReg = {
    image: /(\.(jpeg|jpg|png|gif))$/,
    base64: /(\.(jpeg|jpg|png))$/,
    excel: /(\.xls[x]?)$/,
    doc: /(\.doc[x]?)$/,
    video: /(\.(MP4|mp4|OGG|ogg))$/,
    audio: /(\.(MP3|mp3|OGG|ogg))$/,
    mov: /(\.(MOV|mov))$/,
    avi: /(\.(AVI|avi))$/,
}
// 文件体积
const mb = 1024;
/**
 * @desc 七牛上传地址基本配置
 * @prop    {String}    runtimes            上传模式，依次退化   (默认设置即可，无需改动)
 * @prop    {String}    browse_button       上传选择的点选按钮  （必填，元素id或者元素本身）
 * @prop    {Boolean}   get_new_uptoken     上传时是否每次都重新获取新uptoken    (默认true,选填)
 */
const qiniuConf = {
    runtimes: 'html5,flash,html4',              // 上传模式，依次退化
    browse_button: 'upload',                    // 上传选择的点选按钮，必需
    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
    // uptoken: '',                                                     // uptoken是上传凭证，由其他程序生成
    // uptoken_url: 'http://192.168.40.234:8080/idss/qiniu',            // Ajax请求uptoken的Url，会自动触发，
    uptoken_func: () => '',                                         // 留给开发者自定义
    get_new_uptoken: true,                                          // 设置上传文件的时候是否每次都重新获取新的uptoken
    // downtoken_url: '/downtoken',
    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
    unique_names: false,            // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
    save_key: false,                // 默认false。若在服务端生成uptoken的上传策略中指定了save_key，则开启，SDK在前端将不对key进行任何处理
    domain: '',                     // bucket域名，下载资源时用到，必需
    // container: '',               // 上传区域DOM ID，默认是browser_button的父元素
    max_file_size: '5mb',           // 最大文件体积限制
    // flash_swf_url: './Moxie.swf',     //引入flash，相对路径
    max_retries: 0,                     // 上传失败最大重试次数
    dragdrop: true,                     // 开启可拖曳上传
    // drop_element: '',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: '5mb',                  // 分块上传时，每块的体积
    auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传（此处默认关闭自动上传）
    multi_selection: false,              // 是否允许多文件上传

    // 自定义配置
    file_type: 'image',                 //  默认上传文件类型为image, 字符串，多个用逗号分隔
    key_func: () => '',             // 获取自定义文件名方法（优先读取key，如key不存在时再使用此方法）
    type_reg: typeReg,                       // 文件类型校验配置
    max_files: 10,                      // 最大上传文件数

    queue_mode: !1,                      // 是否支持队列模式
}

/**
 * @desc 七牛上传工具方法
 * @param {Object} [options={}] 上传配置参数
 * @prop
 */
const Uploader = (options = {}) => {
    let max_file_size = parseFloat(options.max_file_size);
    // 当处理后的值为非数字及非正数时，用默认值代替
    max_file_size = isNaN(max_file_size) || max_file_size <= 0 ? qiniuConf.max_file_size : `${max_file_size}mb`;
    let conf = {
        ...qiniuConf,
        ...options,
        // 此处禁用插件自带的自动上传
        uptoken_url: '',
        // 合并文件尺寸配置
        max_file_size,
        // 对配置的方法先做类型校验
        key_func: (isFunc(options.key_func) ? options.key_func : qiniuConf.key_func),
        // 合并文件类型校验
        type_reg: {...qiniuConf.type_reg, ...options.type_reg}
    };                                      // 局部配置对象，每个上传实例一份
    // let errorList = [];                         // 错误信息集合
    // 如未配置下载资源域名，直接跳出并返回null；
    if ( !conf.domain.trim() ) {
        console.warn('缺少bucket域名！')
        return null;
    }
    // uploader为一个plupload对象，继承了所有plupload的方法
    // 每次生成一个上传实例
    const uploader = Qiniu.uploader({
        ...conf,
        init: {
            /**
             * @desc  初始化事件
             * @param  {Object} up  上传对象
             */
            'Init': function (up) {
                // 如果最大上传文件数小于等于0，则禁止使用上传
                // 如果上传对象为base64相关数据，则禁止打开浏览器菜单
                if (conf.max_files <= 0 || conf.file_type === 'base64') {
                    up.disableBrowse(!0);
                }
            },
            /**
             * @desc    打开文件夹事件
             */
            'Browse': function (up) {
                // state 为2表示上传未结束，禁止选文件功能
                if (up.state === 2) {
                    up.disableBrowse(!0);
                    return;
                }
                up.splice(0);
                up.setOption( { uptoken_func: () => ''} );
                // let queueMode = up.getOption('queue_mode');
                // if (!queueMode) {
                //     up.splice(0);
                //     up.setOption( { uptoken_func: () => ''} );
                // }
                // up.disableBrowse(!0);
                
            },
            /**
             * @desc    当文件添加到上传队列前事件
             * @param  {Object} up   当前上传实例
             * @param  {Object} file 当前待上传的文件
             */
            'FileFiltered': function ( up, file ) {
                let oriFile = {...file}
                file.oriName = oriFile.name;
                let errorList = [];
                let file_type = conf.file_type.split(',');
                // 文件类型校验
                let isType = file_type.some((type, i) => {
                    const extCheck = conf.type_reg[type.trim()];
                    const fileName = file.name;
                    const extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                    return isFunc(extCheck) ? extCheck(extension) : extCheck.test(extension);
                });
                if (!isType) {
                    errorList.push({ msg: `文件'${file.name}'格式不符，请重新上传` });
                    console.warn(`文件'${file.name}'格式不符，请重新上传`);
                }
                // let maxFileSize = parseInt(parseFloat(up.getOption('max_file_size'))*mb*mb);
                // let fileSize = file.size;

                file.canUpload = isType;
                isFunc(conf.fileFiltered) && conf.fileFiltered(up, file, errorList.pop());
            },

            /**
             * @desc 每次在文件加入后获取上传token认证
             * @param   {Object}    up      当前上传实例
             * @param   {Array}     files   已添加的文件数组
             */
            'FilesAdded': function ( up, files ) {
                let errorList = [];
                let maxFiles = up.getOption('max_files');
                if (maxFiles <= 0) {
                    errorList.push({ msg: `无法上传，最大上传文件数量为0` });
                    console.warn(`无法上传，最大上传文件数量为0`);
                } else if (files.length) {
                    // 清空多余的文件
                    let fileList = files.reduce((prev = [], f, i) => {
                        if (!f.canUpload) {
                            up.removeFile(f);
                        } else {
                            prev.push(f);
                            if (prev.length > maxFiles) {
                                up.removeFile(f);
                            }
                        }
                        return prev;
                    }, []);

                    // 只要有文件可上传就上传该文件，如所有文件都不能上传，则退出上传流程
                    if ( fileList.length > 0 ) {
                        if (fileList.length > maxFiles) {
                            errorList.push({ msg: `文件过多，一次最多上传${maxFiles}个文件` });
                            console.warn(`文件过多，一次只能上传${maxFiles}个文件`);
                        }
                        if ( isString(conf.uptoken) && conf.uptoken.trim() ) {
                            // 如提供token，则直接走下一步；
                            up.start();
                        } else if ( isFunc(conf.fetch_upload_token) ) {
                            // 如提供了请求方法，则调用该方法获取token
                            conf.fetch_upload_token(up, (function (up, files) {
                                return function (token = '', key = '') {
                                    // 返回成功更新key和token，并调用upload自身方法（此处是处理七牛的业务逻辑，必要）
                                    if (typeof token === 'string' && token) {
                                        // 此处如服务端生成key，则优先使用服务端的key(前提是满足save_key及unique_names策略)
                                        let save_key = up.getOption('save_key');
                                        let unique_names = up.getOption('unique_names');
                                        if (!save_key && !unique_names && typeof key === 'string' && key) {
                                            up.setOption( { key_func: () => key } );
                                        }
                                        up.setOption( { uptoken_func: () => token } );
                                        up.start();
                                    }
                                }
                            })(up, files));
                        }
                    }
                    // else if (fileList.length === 0) {
                    //     errorList.push({ msg: `没有可上传的文件` });
                    //     console.warn(`没有可上传的文件`);
                    // }
                }
                // 用户自定义的回调
                isFunc(conf.filesAdded) && conf.filesAdded(up, files, errorList.pop());
            },
            /**
             * @desc 上传前对上传流程做最后校验
             * @param  {Object} up   当前上传实例
             * @param  {Object} file 当前待上传的文件
             */
            'BeforeUpload': function(up, file) {
                let errorList = [];
                isFunc(conf.beforeUpload) && conf.beforeUpload(up, file, errorList.pop());
            },
            /**
             * @description 上传中...
             */
            'UploadProgress': function(up, file) {
                isFunc(conf.uploadProgress) && conf.uploadProgress(up, file);
            },
            /**
             * @desc    上传成功
             * @param  {Object} up   上传对象
             * @param  {Object} file 上传文件
             * @param  {Object} info 返回数据
             */
            'FileUploaded': function(up, file, info) {
                try {
                    const { response, status } = info;
                    (status === 200 && isFunc(conf.fileUploaded)) && conf.fileUploaded(up, file, JSON.parse(response));
                } catch (e) {
                    console.warn(e);
                }

            },
            // 上传过程报错
            'Error': function(up, err, errTip) {
                let error = { ...err, msg: errTip };
                up.stop();
                isFunc(conf.uploadFail) && conf.uploadFail(up, error);
            },
            // 上传结束
            'UploadComplete': function(up) {
                up.stop();
                if (up.state === 1) {
                    let maxFiles = up.getOption('max_files');
                    let fileType = up.getOption('file_type');
                    maxFiles <= 0 || fileType === 'base64' ? up.disableBrowse(!0) : up.disableBrowse(!1);
                }
                isFunc(conf.uploadComplete) && conf.uploadComplete(up);
            },
            // 自定义文件名设置
            'Key': function(up, file) {
                // 如提供则直接使用
                let key_func = up.getOption().key_func;
                let key = isFunc(key_func) && key_func(file);
                // let key = isFunc(conf.key_func) && conf.key_func(file);
                // let fileName = file.name;
                if ( !(isString(key) && key.trim()) ) {
                    key = file.oriName;
                }
                // else {
                //     const extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
                //     key = `${key}${extension}`;
                // }
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在unique_names: false，save_key: false时才生效
                return key;
            },

            OptionChanged: function(up, name, value, oldValue) {},

            StateChanged: function(up) {},

            Destroy: function(up) {}
        },
    });
    /**
     * @desc    上传base64图片
     * @param {String} base64Data  base64数据
     */
    uploader.uploadBase64 = base64Data => {
        const moxieFile = Qiniu.plupload.moxie.file.File;
        let file = new moxieFile(null, base64Data);
        if (file && file.size > 0) {
            uploader.addFile(file);
        } else {
            isFunc(conf.uploadFail) && conf.uploadFail(uploader, {msg: '不能上传空数据'});
        }
    }
    
    return uploader;
};

export default Uploader;
