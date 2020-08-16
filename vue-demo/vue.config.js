const glob = require('glob');
// 手动编译的releasePath 或者 debugPath 在这里加。
let releasePath = '',
  debugPath = '';
const releasePublicPath = '../../',
  debugPublicPath = './';
var argv = require('yargs').argv;
console.log('argv.buildModule:', argv, argv.buildModule, argv.buildstart, argv.buildlength);
console.log(process.env.NODE_ENV, 'env');
var buildstart = 0,
  buildlength = 0;
if (!!argv.buildstart) {
  buildstart = parseInt(argv.buildstart);
}
if (!!argv.buildlength) {
  buildlength = parseInt(argv.buildlength);
}
if (argv.buildModule) {
  releasePath = 'src/pages/*' + argv.buildModule + '/*/index.ts';
  console.log(releasePath, 'releasePath');
} else {
  // releasePath = 'src/pages/*/*/index.ts';

  debugPath = __dirname + '/src/pages/00-system-demo/00-module-demo/index.ts';
}

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  const entries = {};
  const globPaths = glob.sync(globPath);
  console.log(globPaths.length, 'globPaths.length');
  console.log(globPaths, 'globPaths');
  for (let index = buildstart; index < globPaths.length; index++) {
    const entry = globPaths[index];
    if (process.env.NODE_ENV === 'production') {
      const system = /(?<=\d{2}-system-)\w{1,}/g.exec(entry)[0];
      const module = /(?<=\d{2}-module-)\w{1,}/g.exec(entry)[0];
      entries[`${system}/${module}/index`] = {
        entry,
        chunks: [`${system}/${module}/index`],
        filename: `${system}/${module}/index.html`,
      };
      if (system === 'inoutrecord' && module === 'prisonerPreview') {
        entries[`${system}/${module}/index`].template = `src/pages/05-system-inoutrecord/04-module-prisonerPreview/template.html`;
      }
      if (buildlength > 0 && Object.keys(entries).length >= buildlength) {
        break;
      }
    } else {
      entries['index'] = {
        entry,
        title: 'index',
        filename: 'index.html',
      };
    }
  }
  console.log('entries', entries);
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
  lintOnSave: 'warning', //这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  devServer: {
    index: 'index.html', //默认启动serve
    open: false,
    host: '0.0.0.0', //其他电脑也可访问
    port: 8088,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/chams': {
        target: 'http://172.16.231.87:19213/',
        logLevel: 'debug',
        changeOrigin: true,
      },
      '/upms': {
        target: 'http://172.16.231.87:19502/',
        logLevel: 'debug',
        changeOrigin: true,
      },
      '/udams': {
        target: 'http://172.16.231.87:19221/',
        logLevel: 'debug',
        changeOrigin: true,
      },
      '/dams': {
        target: 'http://172.16.231.87:19224/',
        logLevel: 'debug',
        changeOrigin: true,
      },
      '/fs': {
        target: 'http://172.16.231.87:19505/',
        logLevel: 'debug',
        changeOrigin: true,
      },
      '/inquestweb': {
        target: 'http://172.16.231.162',
        // target: 'https://ctsp.kedacom.com/rap2-backend/app/mock/311',
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
        javascriptEnabled: true, //避免ant-design-vue组件库编译报错
      },
    },
    requireModuleExtension: true,
  },
  chainWebpack: (config) => {
    let publicPath = process.env.NODE_ENV === 'production' ? releasePublicPath : debugPublicPath;
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = '[name].js'; //将js放到对应目录中
      config.output.chunkFilename = './common/async/[name].[chunkhash].js'; //懒加载路由chunk配置
      // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
      config.optimization.splitChunks({
        cacheGroups: {},
      });
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
          options.fallback.options.name = 'static/[name].[hash:8].[ext]'; //将图片打包到static中
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
      config.output.chunkFilename = './common/async/[name].[chunkhash].js'; //懒加载路由chunk配置
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
