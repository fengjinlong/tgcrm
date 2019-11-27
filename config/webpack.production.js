const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    mobx: 'mobx'
    // 'mobx-react-lite': 'mobx-react-lite' // 暂时未找到cdn资源
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons"
        },
        // 合并所有css
        // styles: {
        //   name: 'style',
        //   test: /\.(css|scss)$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   enforce: true
        // }
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    // 提取css
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:5].css',
      chunkFilename: 'styles/[name].[contenthash:5].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       drop_console: true
    //     },
    //     output: {
    //       comments: false
    //     }
    //   },
    //   parallel: true
    // }),
    new HtmlWebpackPlugin({
      title: '京程一灯CRM系统',
      filename: '../views/index.html',
      template: resolve(__dirname, '../src/client/index-prod.html'),
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
  ]
}