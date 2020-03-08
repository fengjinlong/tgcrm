module.exports = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
    }
  },
  'postcss-loader',
  'sass-loader'
]
