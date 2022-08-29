const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync('./src/view/*/index.js');

  entryFiles.forEach((file) => {
    const match = file.match(/src\/view\/(.*)\/index.js/);
    const pageName = match && match[1];
    entry[pageName] = file;
    htmlWebpackPlugins.push(
      new HtmlPlugin({
        template: path.join(__dirname, `src/view/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName], //打包的页面使用那些chunk
        inject: true,
        minify: {
          html5: true, // html5压缩
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });
  console.log('entryFiles', entryFiles, entry);
  return { entry, htmlWebpackPlugins };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  //环境
  mode: 'development',
  devServer: {
    static: './dist',
    hot: true,
  },
  devtool: 'source-map',
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
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 2 version', '>1%', 'IOS 7'],
                  }),
                ],
              },
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
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
  plugins: [...htmlWebpackPlugins, new CleanWebpackPlugin()],
};
