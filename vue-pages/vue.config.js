// var path = require('path');
var glob = require('glob');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// 手动编译的releasePath 或者 debugPath 在这里加。
let releasePath = '', debugPath = '';

// releasePath = "src/pages/00-system-system1/*/main.js";
releasePath = "src/pages/00-system-system1/00-module-module1/main.js";

// debugPath = __dirname + "/src/pages/00-system-system1/00-module-module1/main.js";

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {}, tmp;

  glob.sync(globPath).forEach(function (entry) {
    console.log('entry', entry);
    tmp = entry.split('/').splice(-4);
    console.log('tmp', tmp);
    if (process.env.NODE_ENV === "production") {
      var system = tmp[tmp.length - 3].split('-')[2];
      var module = tmp[tmp.length - 2].split('-')[2];
      entries[`${system}/${module}/index`] = {
        entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2] + '/' + tmp[3],
        chunks: [`${system}/${module}/index`],
        filename: `${system}/${module}/index.html`
      };
      // htmls.push(new HtmlWebpackPlugin(conf))
    } else {
      entries['index'] = {
        entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2] + '/' + tmp[3],
        // chunks: ['index'],
        title: 'index',
        filename: 'index.html'
      };
    }
  });
  return entries;
}

let pages = {};
if (process.env.NODE_ENV === "production") {
  pages = getEntry(releasePath);
} else {
  pages = getEntry(debugPath);
}
console.log(pages)
//配置end

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? '../../' : '/',
  productionSourceMap: false,
  filenameHashing: false,
  pages,
  devServer: {
    index: 'index.html', //默认启动serve
    open: false,
    host: '',
    port: 8088,
  },
  chainWebpack: config => {
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => {
    //     // 修改它的选项...
    //     options.limit = 100
    //     return options
    //   })
    // Object.keys(pages).forEach(entryName => {
    //   config.plugins.delete(`prefetch-${entryName}`);
    // });
    // if (process.env.NODE_ENV === "production") {
    //   config.plugin("extract-css").tap(() => [{
    //     path: path.join(__dirname, "./dist"),
    //     filename: "css/[name].[contenthash:8].css"
    //   }]);
    // }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.output.filename = '[name].js';
      console.log('configureWebpack', config);
    }
  }
}