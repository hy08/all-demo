const glob = require('glob');
// 手动编译的releasePath 或者 debugPath 在这里加。
let releasePath = '',
  debugPath = '';
const releasePublicPath = '../../',
  debugPublicPath = './';

// releasePath = 'src/pages/*/*/index.ts';
releasePath = 'src/pages/00-system-demo/02-module-jsx/index.js';

debugPath = __dirname + '/src/pages/00-system-demo/00-module-template/index.ts';
debugPath = __dirname + '/src/pages/00-system-demo/01-module-tsx/index.ts';
debugPath = __dirname + '/src/pages/00-system-demo/02-module-jsx/index.js';

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  const entries = {};
  const globPaths = glob.sync(globPath);
  for (let index = 0; index < globPaths.length; index++) {
    const entry = globPaths[index];
    if (process.env.NODE_ENV === 'production') {
      const system = /(?<=\d{2}-system-)\w{1,}/g.exec(entry)[0];
      const module = /(?<=\d{2}-module-)\w{1,}/g.exec(entry)[0];
      entries[`${system}/${module}/index`] = {
        entry,
        // chunks: [`${system}/${module}/index`],
        filename: `${system}/${module}/index.html`,
      };
    } else {
      entries['index'] = {
        entry,
        title: 'index',
        filename: 'index.html',
      };
    }
  }
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
  lintOnSave: 'warning',
  devServer: {
    index: 'index.html', //默认启动serve
    open: false,
    host: '0.0.0.0', //其他电脑也可访问
    port: 8089,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0/',
        logLevel: 'debug',
        changeOrigin: true,
      },
    },
  },
  css: {
    extract:
      process.env.NODE_ENV === 'production'
        ? {
            filename: '[name].css', //将css放到对应目录中
          }
        : false,
    loaderOptions: {
      less: {
        javascriptEnabled: true, //避免第三方组件库编译报错
      },
    },
    requireModuleExtension: true,
  },
  chainWebpack: (config) => {
    let publicPath = process.env.NODE_ENV === 'production' ? releasePublicPath : debugPublicPath;
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = '[name].js'; //将js放到对应目录中
      config.output.chunkFilename = './common/async/[name].[chunkhash].js'; //懒加载路由chunk配置

      //每个页面只对应一个单独的 JS / CSS (未进行代码性能优化，预计优化)
      config.optimization.splitChunks({
        cacheGroups: {},
      });
      config.optimization.minimize(false);
      //rules
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap((options) => {
          options.fallback.options.name = 'static/[name].[hash:8].[ext]'; //将图片打包到static中
          options.fallback.options.publicPath = releasePublicPath;
          return options;
        });
      config.module
        .rule('fonts')
        .use('url-loader')
        .loader('url-loader')
        .tap((options) => {
          options.fallback.options.name = 'static/[name].[hash:8].[ext]'; //将文本打包到static中
          options.fallback.options.publicPath = releasePublicPath;
          return options;
        });
    }
    //解决css module处理问题，src采用css module，第三方组件禁用
    config.module
      .rule('less')
      .oneOf('normal')
      .test(/src.+\.less/)
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .tap((args) => {
        return {
          ...args,
          modules: {
            localIdentName: '[name]-[local]-[hash:base64:5]',
          },
        };
      });

    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('less')
        .oneOf('lib-less')
        .test(/node_modules.+\.less/)
        .use('extract-css-loader')
        .loader(require('mini-css-extract-plugin').loader)
        .tap(() => ({
          hmr: false,
          publicPath: publicPath,
        }));
    } else {
      config.module
        .rule('less')
        .oneOf('lib-less')
        .use('vue-style-loader')
        .loader(require.resolve('vue-style-loader'))
        .tap(() => ({
          sourceMap: false,
          shadowMode: false,
        }));
    }

    config.module
      .rule('less')
      .oneOf('lib-less')
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .tap((args) => {
        return {
          ...args,
          sourceMap: false,
          importLoaders: 2,
          modules: false,
        };
      });
    config.module
      .rule('less')
      .oneOf('lib-less')
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .tap(() => ({
        sourceMap: false,
        plugins: [
          function() {
            /* omitted long function */
          },
        ],
      }));
    config.module
      .rule('less')
      .oneOf('lib-less')
      .use('less-loader')
      .loader(require.resolve('less-loader'))
      .tap(() => ({
        sourceMap: false,
        javascriptEnabled: true,
      }));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      //output
      config.output.filename = '[name].js'; //将js放到对应目录中
    } else {
      //源代码调试
      config.output.devtoolModuleFilenameTemplate = (info) => {
        const resPath = info.resourcePath;
        if ((/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) || /node_modules/.test(resPath)) {
          return `webpack:///${resPath}?${info.hash}`;
        }
        return `webpack:///${resPath.replace('./src', 'my-code/src')}`;
      };
    }
  },
};
