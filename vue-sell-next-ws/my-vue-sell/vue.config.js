const webpack = require('webpack');
const path = require('path');
const AppData = require('./data.json');
const seller = AppData.seller;
const goods = AppData.goods;
const ratings = AppData.ratings;

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before: function (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        });
      });
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        });
      });
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        });
      });
    }

  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'));
    config.plugin('context').use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/]);
  }
};
