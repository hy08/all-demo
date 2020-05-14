const glob = require('glob');
// 手动编译的releasePath 或者 debugPath 在这里加。
let releasePath = '',
  debugPath = '';
const releasePublicPath = '../../',
  debugPublicPath = './';

releasePath = 'src/pages/*/*/index.ts';
// releasePath = "src/pages/00-system-system1/*/index.ts";
// releasePath = "src/pages/00-system-system1/00-module-module1/index.ts";

debugPath = __dirname + '/src/pages/00-system-demo/00-module-demo/index.ts';

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  const entries = {};

  glob.sync(globPath).forEach(function(entry) {
    if (process.env.NODE_ENV === 'production') {
      var system = /(?<=\d{2}-system-)\w{1,}/g.exec(entry)[0];
      var module = /(?<=\d{2}-module-)\w{1,}/g.exec(entry)[0];
      entries[`${system}/${module}/index`] = {
        entry,
        chunks: [`${system}/${module}/index`],
        filename: `${system}/${module}/index.html`,
      };
    } else {
      entries['index'] = {
        entry,
        title: 'index',
        filename: 'index.html',
      };
    }
  });
  return entries;
}

let pages = {};
if (process.env.NODE_ENV === 'production') {
  pages = getEntry(releasePath);
} else {
  pages = getEntry(debugPath);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? releasePublicPath : debugPublicPath,
  productionSourceMap: false,
  filenameHashing: false,
  pages,
  lintOnSave: 'error', //这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  devServer: {
    index: 'index.html', //默认启动serve
    open: false,
    host: '0.0.0.0', //其他电脑也可访问
    port: 8088,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `https://rap2.ctsp.kedacom.com/rap2-backend/app/mock/218`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },
  css: {
    extract: {
      filename: '[name].css', //将css放到对应目录中
    },
  },
  chainWebpack: (config) => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization.splitChunks({ cacheGroups: {} });
    //rules
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.fallback.options.name = 'static/[name].[hash:8].[ext]'; //将图片打包到static中
        return options;
      });
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.fallback.options.name = 'static/[name].[hash:8].[ext]'; //将图片打包到static中
        options.fallback.options.publicPath =
          process.env.NODE_ENV === 'production' ? releasePublicPath : debugPublicPath;
        return options;
      });
  },
  configureWebpack: (config) => {
    //output
    config.output.filename = '[name].js'; //将js放到对应目录中
    config.output.chunkFilename = './common/async/[name].[chunkhash].js'; //懒加载路由chunk配置
    // console.log('config', config.plugins[4].options);
  },
};
