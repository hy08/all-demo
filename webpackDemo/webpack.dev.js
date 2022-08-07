const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  //环境
  mode: 'development',
  //解析
  module: {
    rules: [
      {
        test: /.\js$/,
        use: 'babel-loader', // 解析ES6，babel-loader依赖babel，所以两个都要安装
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
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
  //扩展webpakc功能
  plugins: [new CleanWebpackPlugin()],
  devServer: {
    static: './dist',
    hot: true,
  },
};
