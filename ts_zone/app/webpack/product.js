var path = require('path')
var webpack = require('webpack')
var config = require('./config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./base')
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//var ExtractTextPlugin = require('extract-text-webpack-plugin')
var htmlTplPath = path.join(__dirname, '../template/pro/')
var env = process.env.NODE_ENV;
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
var webpackConfig = merge(baseWebpackConfig, {
  module: {

  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  entry: {
    vendors: ["react", "react-dom", "react-router", "react-router-dom", "history"],
    app: resolve('script/build/main'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: "vendors",
          name: 'vendors',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env || 'development'),
      'perfixerURL': JSON.stringify('https://www.macsen318.com')
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
