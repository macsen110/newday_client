const path = require('path')
const webpack = require('webpack')
const config = require('./config/index')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlTplPath = path.join(__dirname, '../template/pro/')
const env = process.env.NODE_ENV;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const webpackConfig = merge(baseWebpackConfig, {
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
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: "vendors",
          name: 'vendors',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
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
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
