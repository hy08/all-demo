const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: ['./src/app.js'],
  output: {
    filename: 'export.js',
    path: path.resolve(__dirname, 'export')
  },
  devServer: {
    contentBase: path.join(__dirname, "export"),
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react app',
      template: './document.ejs'
    }),
    new BundleAnalyzerPlugin()  // 使用默认配置
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-es2015']
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}
