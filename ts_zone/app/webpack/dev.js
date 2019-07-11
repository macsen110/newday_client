var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var htmlTplPath = path.join(__dirname, '../template/dev/')
var entryScriptPath = path.join(__dirname, '../script/build/')
var base = require('./base');
module.exports = merge(base, {
  entry: {
    app: [entryScriptPath+'main'] // Your appʼs entry point
  },
  output: {
    path: path.join(__dirname, '../src/'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'perfixerURL': JSON.stringify('https://www.macsen318.com')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: htmlTplPath + 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
  ],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: ['react-hot-loader/webpack','babel-loader']}
    ]
  }
});