var path = require('path')
var webpack = require('webpack')
var config = require('./config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./base')
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//var ExtractTextPlugin = require('extract-text-webpack-plugin')
var htmlTplPath = path.join(__dirname, '../')
var env = 'production';
//return false;
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    
  },
  //devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[id].js',
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
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