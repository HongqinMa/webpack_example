// webpack 的开发配置文件
// 编写配置文件，要有最基本的文件入口和输出文件配置信息等
// 里面还可以加loader和各种插件配置使用
var path = require('path');

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
    }
};
