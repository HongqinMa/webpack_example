CommonJS 和 AMD 是用于 JavaScript 模块管理的两大规范，前者定义的是模块的同步加载，主要用于 NodeJS ；而后者则是异步加载，通过 RequireJS 等工具适用于前端。随着 npm 成为主流的 JavaScript 组件发布平台，越来越多的前端项目也依赖于 npm 上的项目，或者自身就会发布到 npm 平台。因此，让前端项目更方便的使用 npm 上的资源成为一大需求。

web 开发中常用到的静态资源主要有 JavaScript、CSS、图片、Jade 等文件，webpack 中将静态资源文件称之为模块。 webpack 是一个 module bundler (模块打包工具)，其可以兼容多种 js 书写规范，且可以处理模块间的依赖关系，具有更强大的 js 模块化的功能。Webpack 对它们进行统一的管理以及打包发布，其官方主页用下面这张图来说明 Webpack 的作用.

![webpack的作用](t13-webpack项目构建工具/webpack001.png)

## webpack 介绍

webpack 更 Gulp 的作用相同，是项目构建工具。

### webpack 和 Gulp 的区别

> Gulp 出现的比较早，更适合于做任务型的，可以处理任何的网站静态网站、SPA、Node.js 项目代码，Gulp 里面就是一堆的任务；
> Webpack 一般全部用来处理 SPA 应用，就 React、Vue.js、AngularJS 使用。

所以使用的场景不一样，因为内部的原理不同。

### webpack 官网文档

官网地址：http://webpack.github.io/docs/

### webpack 的优势

> 对 CommonJS 、 AMD 、ES6 的语法做了兼容
> 对 js、css、图片等资源文件都支持打包
> 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对 CoffeeScript、ES6的支持
> 有独立的配置文件 webpack.config.js
> 可以将代码切割成不同的 chunk，实现按需加载，降低了初始化时间
> 支持 SourceUrls 和 SourceMaps，易于调试
> 具有强大的 Plugin 接口，大多是内部插件，使用起来比较灵活
> webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快

## webpack 的使用

新建项目

在项目根目录下运行：

``` bash
    $ npm init -y
```

### 搭建基本的项目结构如下图：

![项目结构目录](t13-webpack项目构建工具/webpack002.png)

src 中的开发文件，dist 是打包后的文件

### 安装

``` bash
    $ npm install webpack -g
    $ npm install webpack -save-dev
    $ npm install react -save
```

### 配置文件

> webpack.develop.config.js

``` js
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
```

### 运行

``` bash
  $ webpack --config webpack.develop.config.js
```

![运行完之后生成 bundle.js 文件](t13-webpack项目构建工具/webpack003.png)

### 进行版本控制

``` bash
  $ git init
  $ git status
  $ git add -A
  $ git commit -m "项目目录结构及 webpack 初步配置"
```

## webpack 启动过程演进

把运行命令配置到 npm 的 script 中。  package.json

``` js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "develop": "webpack --config webpack.develop.config.js",
    "publish": "webpack --config webpack.publish.config.js"
}
```

执行 ：

``` bash
  $ npm run develop
```

### 更好的方式实现动启动

如果需要一直输入 npm run develop 确实是一件非常无聊的事情，我们可以把让他安静的运行，让我们设置 webpack-dev-server

除了提供模块打包功能，Webpack 还提供了一个基于 Node.js Express 框架的开发服务器，它是一个静态资源 Web 服务器，对于简单静态页面或者仅依赖于独立服务的前端页面，都可以直接使用这个开发服务器进行开 发。在开发过程中，开发服务器会监听每一个文件的变化，进行实时打包，并且可以推送通知前端页面代码发生了变化，从而可以实现页面的自动刷新。

更好的方式实现自动启动：webpack 官方提供的一个第三个的插件，自动监听代码变化，帮我们重新构建，把 webpack 和 express 封装了

``` bash
  $ npm install webpack-dev-server -save-dev
```

调整 npm 的 package.json scripts 部分中开发命令的配置

``` js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "develop": "webpack-dev-server --config webpack.develop.config.js --devtool eval --progress --colors --hot --content-base src",
    "publish": "webpack --config webpack.publish.config.js"
  }
```

> webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
> --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
> --progress - 显示合并代码进度
> --colors -- hot，命令行中显示颜色！
> --content-base  指向设置的输出目录//这点一定是我们的发布目录

在 src 下面，新建一个 index.html 文件，

``` html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>webpack 使用</title>
  </head>
  <body>
      <div id="app"></div>
  </body>
  <script src="bundle.js"></script>
  </html>
```

执行`npm run develop` ，结果如下图：

![执行 npm run develop](t13-webpack项目构建工具/webpack004.png)

执行 `npm run develop` 之后我们发现执行没有结束，启动着监听，并在 8080 端口开启了一个服务器。

在浏览器中打开结果如下：

![浏览器打开结果](t13-webpack项目构建工具/webpack005.png)

如果修改了 app.js 文件，会自动执行构建，刷新浏览器会发生变化。

**在 index.html 访问的时候，会访问  bundle.js 文件，为什么，因为 webpack-dev-server 生成的 bundle 在内存中，放到内存中构建快**

总的来说，当你运行 npm run develop 的时候，会启动一个 Web 服务器，然后监听文件修改，然后自动重新合并你的代码。真的非常简洁！

注意:

> 用 webpack-dev-server 生成 bundle.js 文件是在内存中的，并没有实际生成
> 如果引用的文件夹中已经有 bundle.js 就不会自动刷新了，你需要先把 bundle.js 文件手动删除
> 用 webstorm 需要注意，因为他是自动保存的，所以可能识别的比较慢，你需要手动的 ctrl+s 一下

### 浏览器自动刷新

修改 webpack.develop.config.js 的入口文件配置，修改 entry 部分如下：

``` js
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
        }
    };
```

修改了配置文件，重新启动，执行 `npm run develop` 结果如下图：

![浏览器打开结果](t13-webpack项目构建工具/webpack006.png)

此时的目录结构如下图：

![目录结构变化](t13-webpack项目构建工具/webpack007.png)
