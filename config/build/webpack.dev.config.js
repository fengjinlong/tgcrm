const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
// 构造出共享进程池，进程池中包含4个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const devConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=happybabel'],
        exclude: /node_modules/,
      },
      {
        // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
        test: /\.css$/,
        use: ['happypack/loader?id=happycss']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        use:[{
          loader: 'file-loader',
          options:{
            name:'images/[name].[hash:5].[ext]'
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        use: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    new HappyPack({
      id:"happybabel",
      loaders:['babel-loader?cacheDirectory'],
      threadPool:happyThreadPool,
      cache:true,
      verbose:true
    }),
    new HappyPack({
      id: 'happycss',
      // loaders: ['style-loader','css-loader','postcss-loader'],
      loaders: [
        {loader: 'style-loader'},
        {loader: 'css-loader',options:{minimize: false, importLoaders:1}},
        {loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
      ],
      threadPool: happyThreadPool,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../app/index.html'),
    }),
    //自动打开浏览器
    new OpenBrowserPlugin({
      url: `http://localhost:3001`,
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/'),
    port: '8899',
    watchContentBase: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    inline: true,
    //编译错误时，显示在网页上
    overlay: {
      errors: true
    },
    host: '0.0.0.0', // 解决ip方式无法访问
    disableHostCheck: true // 解决设置host之后link无法点击
  }
};

module.exports = merge(config, devConfig);