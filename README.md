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
