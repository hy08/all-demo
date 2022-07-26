const path = require('path');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  //环境
  mode: 'production',
  //解析
  module: {
    rules: [
      {
        test: /.\js$/,
        use: 'babel-loader', // 解析ES6，babel-loader依赖babel，所以两个都要安装
      },
    ],
  },
  //扩展webpakc功能
  plugins: [],
};
