# Webpack

## webpack 与构建发展历史

随着项目复杂度上升，对构建工具的要求追加显现和提高，webpack 应运而生，与这类似的构建工具还有很多，例如 rollup。

使用 webpack，需要 webpack 和 webpack-cli 依赖。目前 webpack 的大版本是 V5。

npm 下载的依赖如果有软链接，会保存在`./node_modules/.bin`文件夹中。可以直接通过路径运行 webpack，推荐的方式是在`package.json`的 scripts 中创建相关的脚本指令，默认读取项目根目录下的`webpack.config.js`,当然可以通过运行参数修改目录和文件名称。  
例如`"build" : "webpack"`，运行`npm run build`就会执行 webpack 的软链接。达到和上述一样的效果。

## 基础

### entry

打包入口配置

1. 单页面应用，entry 是一个字符串，设置入口文件
2. 多页面打包，entry 使用 object 配置

```js
// 单页
module.exports = {
  entry: './src/index.js',
};
// 多页
module.exports = {
  entry: {
    app: './src/index.js',
    search: './src/search.js',
  },
};
```

### output

指定打包的输出到磁盘的路径。  
对于单页应用或者多页应用，output 配置都是一样的，如果需要输出不同的文件，可以使用占位符来设置。

```js
module.exports = {
  output: {
    filename: '[name].js', //[name], 占位符，指定使用文件名称作为输出文件名称
    path: __dirname + '/dist',
  },
};
```

### loaders

webpack 原生只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持其他文件类型并且把他们转化成有效的模块，然后添加到依赖图中。

loader 本身是一个函数，接受源文件作为参数，返回转换的结果。

通常使用的 loader 列表：

1. babel-loader：转换 ES6、ES7 等 JS 行特性语法
2. css-loader：支持.css 文件的加载和解析
3. less-loader：将 less 文件转换成 css
4. ts-loader：将 TS 转换成 js
5. file-loader：进行图片、字体等打包
6. raw-loader：将文件以字符串形式导入
7. thread-loader: 多进程打包 JS 和 CSS

```js
module.exports = {
  module: {
    // rules是loader集合，每一个loader中，test指定匹配规则，use指定使用的loader名称，记得loader需要安装的
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

### plugins

插件用于打包输出的优化，资源管理和环境变量的注入，作用于整个构建过程。
常用的 plugins 列表详见官方文档。

```js
module.exports = {
  //每个plugin放在plugins数组中
  plugins: [new HtmlWEbpackPlugin({ template: './src/index.html' })],
};
```

### mode

指定当前的构建环境：production、development、none。

不同的构建环境，webpack 内置不同的处理。例如 production 环境默认开启代码压缩，development 环境会开启热更新，none 不开启任何优化。

可以在构建代码中访问 process.env.NODE_ENV 获取当前环境。

```js
module.exports = {
  mode: 'production',
};
```

### 解析 ES6 和 React JSX

#### 解析 ES6

为了更好的兼容性，ES6 由第三放库 babel 负责解析成 ES5。需要安装依赖`@babel/core @babel/preset-env babel-loader`，然后在 webpack 配置文件中新增 loader。

```js
 module: {
    rules: [
      {
        test: /.\js$/,
        use: 'babel-loader', // 解析ES6，babel-loader依赖babel,也就是@babel/core，所以两个都要安装
      },
    ],
  },
```

babel 也有自己的配置文件`.babelrc`，需要新增配置解析 ES6 的规则集合。

```js
{
  // 一个preset是babel规则的集合
  "presets": ["@babel/preset-env"]
}
```

#### 解析 React JSX

在 React 项目中，需要解析 React 特殊的语法 JSX。这个语法的解析也是由 babel 负责，所以只需要在`.babelrc`中追加一个规则集合即可。

```js
{
  // 一个preset是babel规则的集合
  "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

### 解析 CSS、Less 和 Sass

1. css-loader，用于加载和解析 CSS
2. style-loader，用于将 CSS 输出到`<style>`标签中插到`<head>`中。
   注意，对于样式的解析是链式调用，类似 redux 中的中间件调用模式：`style-loader(css-loader)`
3. less-loader，用于解析 less 文件，处理后交付 css-loader 负责后续处理。安装依赖的时候需要同时安装 less 依赖。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};
```

### 解析图片和字体

依赖 file-loader 或者 url-loader,url-loader 内部也是使用的 file-loader。

url-loader 优势是可以将文件较小的资源处理成 base64 格式的字符串内联到对应模块中，减少打包的文件数量，减少 http 请求次数。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.(png|jgp|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
    ],
  },
};
```

### 文件监听

当源码发生变化时，自动重新构建出新的输出文件。

开启监听模式：

1. 启动 webpack 命令时，带上 --watch 参数（需要手动刷新浏览器，没有热更新）
2. webpack.config.js 配置 watch: true

原理：webpack 轮询判断文件最后的编辑时间是否变化，如果文件发生变化，并不会告知监听者，而是先缓存，等到 aggregateTimeout 时间再去重新打包。

```js
// package.json
{
  "scripts":{
    "watch":"webpack --watch"
  }
}
//webpack.config.json
module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
  },
};
```

### 热更新及原理分析

热更新主要用在 development 环境，需要修改 mode 配置。

热更新：webpack-dev-server，以下简称 WDS

源码发生改变，自动重新打包，并且自动刷新浏览器，感觉就是文件监听的升级版。

WDS 不刷新浏览器，不输出文件，而是放在内存中。使用 HotModuleReplacementPlugin 插件去刷新浏览器,配置如下。

```js
//1. 安装webpack-dev-server依赖
//2. package.json
{
  "scripts":{
    "dev":"webpack-dev-server --open" //--open 自动打开浏览器
  }
}
//3. webpack.config.js
module.exports={
  devServer:{
    static:'./dist',
    hot:true, //自动启用HotModuleReplacementPlugin
  }
}
```

原理分析：
![webpack-dev-server](https://kityminder-img.gz.bcebos.com/7eeac623a8e384b38dde316b5e1f5127b37725ef)

1. 启动阶段
   1->2->A->B
2. 更新阶段
   1->2->3->4->5

### 文件指纹：chunkhash、contenthash、hash

目的：针对浏览器资源缓存策略做的处理。

1. Hash：和整个项目构建有关，只要项目文件修改，整个项目构建的 hash 值就会更改(基本不用)
2. ChunkHash：和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值（适合 JS 资源）
3. Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变（适合 CSS 资源）

```js
// webpack.prod.js
//npm安装mini-css-extract-plugin依赖，这个插件用于将css抽离成单独的样式文件。
//style-loader用于将css文件插入到<style>标签内，二者互斥，可以将style-loader替换成MiniCssExtractPlugin.loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /.(png|jgp|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]', //这个hash就是文件内容的hash
          },
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]', //这个hash就是文件内容的hash
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ],
};
```

### 文件压缩

目的：减小文件体积，加快 http 传输速度，优化性能。

webpack，production 环境默认 js 文件压缩。因此不需要处理

```js
//安装相关依赖
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    //html模板插件
    new HtmlPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'], //打包的页面使用那些chunk
      inject: true,
      //配置html页面压缩
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
  //webpack默认支持js压缩，但是如果覆盖optionmization中的minimizer配置，则需要手动配置js压缩
  optimization: {
    minimizer: [
      //配置js压缩
      new TerserPlugin({
        extractComments: false,
      }),
      //配置css压缩
      new CssMinimizerPlugin(),
    ],
  },
};
```