// webpack 的发布配置文件

var path = require('path');
var webpack = require('webpack');
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取css文件的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 删除文件夹
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    // 单页面 SPA 的入口文件
    entry: {
        app: path.resolve(__dirname,'src/js/app.js'),
        // 当 react 作为一个 node  模块安装的时候，
        // 可以直接指向它，就比如 require('react');
        vendors: ['react', 'react-dom', 'react-router']
    },
    // 构建之后的文件输出位置配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // JXS 和 ES6 语法转换为 ES5
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react','stage-0','stage-1','stage-2','stage-3']
                }
            },
            // 可以在 js 中引用 css 的加载器
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") // 如果同时使用多个加载器，中间用 ! 连接，加载器的执行顺序是从右向左
            },
            // 可以在 js 中引用 sass 的加载器
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url?limit=25000&name=images/[name].[ext]'
            },
            // 处理字体
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url?limit=1000000&name=fonts/[name],[ext]'
            }
        ]
    },
    resolve: {
        //查找module的话从这里开始查找
        // root: '/pomy/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们 require 模块可以省略不写后缀名
        //注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.sass', 'jsx'],

        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        // alias: {
        //     AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        //         ActionType : 'js/actions/ActionType.js',
        //         AppAction : 'js/actions/AppAction.js'
        // }
    },
    plugins: [
        // 使用了该插件就不适用 gulp 了
        new CleanPlugin(['dist']),
        // 分离第三方应用插件,name属性会自动指向 entry 中 vendros 属性，filename 属性中的文件会自动构建到output中的path属性下面
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // 用webpack压缩代码，可以忽略代码中的警告
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 可以新建多个抽离样式的文件，这样就可以有多个css文件了。
        new ExtractTextPlugin("app.css"),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            // 压缩 html 文档
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // 优化第三方的包，减少代码量
        new webpack.DefinePlugin({
            //去掉react中的警告，react会自己判断
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};
