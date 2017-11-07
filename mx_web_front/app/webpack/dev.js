var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./base');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var htmlTplPath = path.join(__dirname, '../')
var entryScriptPath = path.join(__dirname, '../src/')
var NODE_ENV = process.env.NODE_ENV;
const DashboardPlugin = require('webpack-dashboard/plugin');
module.exports = merge(base, {
  resolve: {
    modules: [
      '../../',
      "node_modules"
    ]
  },
  entry: {
    app: [entryScriptPath+'main'], // Your appʼs entry point
  },
  output: {
    path: path.join(__dirname, '../src/'),
    publicPath: '',    
    filename: '[name].js'
  },
  devtool: NODE_ENV == 'development' ? 'inline-source-map' : 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: htmlTplPath + 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new DashboardPlugin(),
    
  ],
  module: {
    
  }
});