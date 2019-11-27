const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin.js');
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin.cache.js');
const HappyPack = require('happypack');
const os = require('os');
// 构造出共享进程池，进程池中包含4个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const publicPath = 'http://10.10.8.35/synergy-app/';

const prodConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: publicPath,
    filename: 'scripts/[name].[chunkhash:5].js',
  },
  devtool: false,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=happycss'],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'file-loader',
            options:{
              name: 'images/[name].[hash:5].[ext]',
              publicPath: publicPath
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {bypassOnDebug: true}
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'axios': 'axios',
    'mobx': 'mobx',
    'mobx-react': 'mobxReact'
  },
  plugins: [
    // 每次打包前，先清空原来目录中的内容
    new CleanWebpackPlugin(
      ['dist'], { 
        root: path.join(__dirname, '..'),
        verbose: true,
        dry: false 
      }
    ),
    //开启Scope Hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HappyPack({
      id:"happybabel",
      loaders:['babel-loader?cacheDirectory'],
      threadPool:happyThreadPool,
      cache:true,
      verbose:true
    }),
    //抽离功能js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module){
          return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    // 用来给异步组件重命名
    new webpack.NamedChunksPlugin(),
    new HappyPack({
      id: 'happycss',
      // loaders: ['style-loader','css-loader','postcss-loader'],
      loaders: [
        {loader: 'css-loader',options:{minimize: true, importLoaders:1}},
        {loader: 'postcss-loader',options:{config: {path: path.resolve(__dirname, '../postcss.config.js')} }}
      ],
      threadPool: happyThreadPool,
    }),
    //抽离公共css
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash:5].css',
      allChunks: true
    }),
    //用ParallelUglifyPlugin开启多个子进程进行压缩
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      },
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../app/index_pro.html'),
        minify:{  //压缩HTML文件
          removeComments:true,  //移除HTML中的注释
          collapseWhitespace:true,  //删除空白符与换行符
          removeEmptyAttributes:true,
        },
        chunks: ['vendor', 'runtime', 'index'],
        inject: false
    }),
    new htmlAfterWebpackPlugin(),
    // 分析代码
    new BundleAnalyzerPlugin({ analyzerPort: 3011 })
  ]
};
module.exports = merge(config, prodConfig);