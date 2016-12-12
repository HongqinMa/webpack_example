// webpack 的开发配置文件
// 编写配置文件，要有最基本的文件入口和输出文件配置信息等
// 里面还可以加loader和各种插件配置使用
var path = require('path');

module.exports = {
    // 单页面 SPA 的入口文件
    entry:path.resolve(__dirname,'src/js/app.js'),
    // 构建之后的文件输出位置配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
