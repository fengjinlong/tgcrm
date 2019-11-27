const webpack = require('webpack')
const merge = require('webpack-merge')
const { join, resolve } = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _isDev = _mode == 'development'
const mergeConfig = require(`./config/webpack.${_mode}.js`)
const env = require('./config/env.js')[_mode]
const cssLoaders = require('./config/cssLoaders.js')

const baseCssLoaders = _isDev ? ['style-loader'] : [MiniCssExtractPlugin.loader]

const imageloaders = [
  {
    loader: 'url-loader',
    options: {
      limit: 10 * 1024,
      name: _isDev ? 'images/[name].[ext]' : 'images/[name].[hash:5].[ext]',
      publicPath: env.publicPath        
    }
  }
]

if (!_isDev) imageloaders.push({
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true
  }
})
console.log(_mode)
const baseConfig = {
  mode: _mode,
  target: 'web',
  entry: {
    app: join(__dirname, './src/client/index.tsx')
  },
  output: {
    filename: _isDev ? 'scripts/[name].js' : 'scripts/[name].[contenthash:5].js',
    path: join(__dirname, './dist/assets'),
    publicPath: env.publicPath
  },
  resolve: {
    alias: {
      '@assets': resolve('src/client/assets'),
      '@components': resolve('src/client/components'),
      "@models": resolve('src/client/models'),
      '@stores': resolve('src/client/stores'),
      '@pages': resolve('src/client/pages'),
      '@utils': resolve('src/client/utils')
    },
    modules: ['node_modules', resolve('src')],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        use: {
          // loader:"awesome-typescript-loader"
          loader: 'babel-loader',
          options: {
            plugins: _isDev ? ['dynamic-import-node'] : []
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...baseCssLoaders,
          ...cssLoaders
        ]
      },
      {
        test: /.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        use: imageloaders
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: _isDev ? 'medias/[name].[ext]' : 'medias/[name].[hash:5].[ext]',
          publicPath: env.publicPath
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(_mode),
    }),
    new ProgressBarPlugin()
  ]
}

module.exports = merge(baseConfig, mergeConfig)
