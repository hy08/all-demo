# Webpack

## webpack 与构建发展历史

随着项目复杂度上升，对构建工具的要求追加显现和提高，webpack 应运而生，与这类似的构建工具还有很多，例如 rollup。

使用 webpack，需要 webpack 和 webpack-cli 依赖。目前 webpack 的大版本是 V5。

npm 下载的依赖如果有软链接，会保存在`./node_modules/.bin`文件夹中。可以直接通过路径运行 webpack，推荐的方式是在`package.json`的 scripts 中创建相关的脚本指令，默认读取项目根目录下的`webpack.config.js`,当然可以通过运行参数修改目录和文件名称。  
例如`"build" : "webpack"`，运行`npm run build`就会执行 webpack 的软链接。达到和上述一样的效果。

## 基础

### entry

### output

### loaders

### plugins

### mode

### 解析 ES6 和 React JSX

### 解析 CSS、Less 和 Sass

### 解析图片和字体

### 文件监听

### 热更新及原理分析

### 文件指纹：chunkhash、contenthash、hash

## webpack 进阶用法
