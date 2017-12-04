const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.item.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

const pluginArray = [
  new webpack.DefinePlugin({
    'process.env': config.dev.env,
    'process.env.rltx': JSON.stringify("http://gateway.rltx.xyz"),
  }),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  new FriendlyErrorsPlugin()
];

const getHandleArray = require('../config/pathConfig');
getHandleArray.forEach((element) => {
  pluginArray.push(
    new HtmlWebpackPlugin({
      filename: element.urlPath,
      template: element.templatePath,
      chunks: [element.chunks],
      inject: true
    })
  )
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  cache: true,
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  devtool: 'cheap',
  plugins: pluginArray
});
