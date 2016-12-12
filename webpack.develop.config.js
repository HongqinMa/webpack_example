// webpack 的开发配置文件
// 编写配置文件，要有最基本的文件入口和输出文件配置信息等
// 里面还可以加loader和各种插件配置使用
var path = require('path');
// 自动打开浏览器插件
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    // 单页面 SPA 的入口文件
    entry:[
        // 实现浏览器自动刷新
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/js/app.js')
    ],
    // 构建之后的文件输出位置配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        // 不要轻易使用 noParse
        // noParse: [/moment-with-locales/],
        // preLoaders: [
        //     { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        // ],
        loaders: [
            // JXS 和 ES6 语法转换为 ES5
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // 可以在 js 中引用 css 的加载器
            {
                test: /\.css$/,
                loader: 'style!css' // 如果同时使用多个加载器，中间用 ! 连接，加载器的执行顺序是从右向左
            },
            // 可以在 js 中引用 sass 的加载器
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url?limit=25000'
            },
            // 处理字体
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url?limit=1000000'
            }
        ]
    },
    resolve: {
        //查找module的话从这里开始查找
        // root: '/pomy/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.sass', 'jsx'],

        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // AppStore : 'js/stores/AppStores.js', //后续直接 require('AppStore') 即可
            // ActionType : 'js/actions/ActionType.js',
            // AppAction : 'js/actions/AppAction.js'
        }
    },
    // 配置了这个属性之后 react 和 react-dom 这些第三方的包都不会被构建进 js 中，那么我们就需要通过 cdn 进行文件的引用了
    // 前边的这个名称是在项目中引用用的，相当于 import React from 'react1' 中的 react
    externals: {
        'react1': 'react',
        'react-dom1': 'react-dom',
        '$1': 'jQuery'
    },
    plugins: [
        new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'})
    ]
};
