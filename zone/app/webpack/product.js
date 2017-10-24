var path = require('path')
var webpack = require('webpack')
var config = require('./config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./base')
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//var ExtractTextPlugin = require('extract-text-webpack-plugin')
var htmlTplPath = path.join(__dirname, '../template/pro/')
var env = 'production';

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/dsd/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/dsd/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: htmlTplPath + 'index.html',
      inject: true,
    }),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
