const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
    entry: {
        // 需要提取的库文件
        vendor: ['vue', 'vue-router', 'vuex', 'axios', 'mint-ui']
    },
    output: {
        path: path.join(__dirname, dllPath),
        // vendor.dll.js中暴露出的全局变量名
        filename: '[name].dll.js',
        // 保持与 webpack.DllPlugin 中名称一致
        library: '[name]_[hash]'
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin(),
        // 设置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        // manifest.json 描述动态链接库包含了哪些内容
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            // 保持与 output.library 中名称一致
            name: '[name]_[hash]',
            context: process.cwd()
        })
    ]
}