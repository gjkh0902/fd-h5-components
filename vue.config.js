const path = require("path")
const webpack = require("webpack")

function resolve(dir) {
    return path.join(__dirname, dir)
}

//环境变量
const ISPRO = process.env.VUE_APP_ISDEV ? false : true

module.exports = {
    // 基本路径
    publicPath: ISPRO ? "/h5" : "/",
    // 输出文件目录
    outputDir: "dist", // 默认dist
    // 用于嵌套生成的静态资产（js,css,img,fonts）目录
    // assetsDir: '',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    indexPath: "index.html", // Default: 'index.html'
    filenameHashing: true,
    // 构建多页时使用
    pages: undefined,
    // eslint-loader是否在保存的时候检查
    lintOnSave: "error", //default:true
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    transpileDependencies: [],
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    configureWebpack: {
        // resolve: {
        //     alias: {
        //         vue$: "vue/dist/vue.esm.js"
        //     }
        // },
        plugins: [
            //忽略已编译文件
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require("./public/vendor/vendor-manifest.json")
            })
        ]
    },
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@api", resolve("src/api"))
            .set("@components", resolve("src/components"))
            .set("@validator", resolve("src/validator"))
            .set("@directive", resolve("src/directive"))
            .set("@pages", resolve("src/pages"))
            .set("@util", resolve("src/util"))
            .set("@service", resolve("src/service"))
            .set("@plugins", resolve("src/plugins"))
            .set("@mixins", resolve("src/mixins"))
            .set("~", resolve("packages"))
            .set("&", resolve("lib"))
            // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
        config.resolve.symlinks(true)
    },
    // css相关配置
    css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: ISPRO,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {}
    },
    // webpack-dev-server 相关配置
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        https: false,
        open: true,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },
    // PWA 插件相关配置
    pwa: {},
    // 第三方插件配置
    pluginOptions: {}
}