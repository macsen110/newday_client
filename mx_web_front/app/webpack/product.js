var path = require('path')
var webpack = require('webpack')
var config = require('./config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./base')
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var htmlTplPath = path.join(__dirname, '../')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// var sass = require('node-sass'),
// importOnce = require('node-sass-import-once');
// console.log(111)
// console.log(path.join(__dirname, '../src/styles/_tools.scss'))
// sass.render({
// file: path.join(__dirname, '../src/styles/_tools.scss'),
// importer: importOnce,
// importOnce: {
// index: false,
// css: false,
// bower: false
// }
// });
//return false;
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    
  },
  //devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
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


    new webpack.optimize.OccurrenceOrderPlugin(),
    /**尽管vue-loader extractCSS: true可以压缩css,
     * 此配置为了剔除相同的css,
     * 加上浏览器前缀
     */

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/
    })

  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      //asset: '[path].gz[query]',
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
