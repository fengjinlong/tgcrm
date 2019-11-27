const { join, resolve } = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Jarvis = require('webpack-jarvis')

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    compress: true,
    port: '3000',
    contentBase: join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    },
    disableHostCheck: true,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },
  plugins: [
    new Jarvis({ port: 1337 }),
    new HtmlWebpackPlugin({
      title: '京程一灯CRM',
      filename: 'index.html',
      template: resolve(__dirname, '../src/client/template.html')
    }),
    new WebpackBuildNotifierPlugin({
      title: '🌶 老袁的Webpack Build',
      logo: join(__dirname, '../favicon.png'),
      suppressSuccess: true
    }),
    new FriendlyErrorsPlugin()
  ]
}