const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.item.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
let filePath = '';
let gatewayUrl = '"http://gateway.rltx.xyz"';
if (process.argv[2] === 'dev') {
  filePath = '../dist/dev';
} else if (process.argv[2] === 'test') {
  filePath = '../dist/test';
  gatewayUrl = '"http://gateway.rltxtest.xyz"';
} else if (process.argv[2] === 'staging') {
  filePath = '../dist/staging';
  gatewayUrl = '"https://gateway.rltx.com"';
} else if (process.argv[2] === 'production') {
  filePath = '../dist/production';
  gatewayUrl = '"https://gateway.rltx.com"';
} else {
  filePath = '../dist/build';
}
// console.log('orgId：',config.build.orgId);
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;
console.log('Build', process.argv[2], 'environment');

// 获取相对应的编译数组
const proPluginArray = [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    'process.env.rltx': gatewayUrl,
    'process.env': env
  }),
  new ParallelUglifyPlugin({
    uglifyJS: {
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        beautify: false
      }
    },
    cacheDir: path.join(__dirname, '../.cache')
  }),
  // extract css into its own file
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  // new OptimizeCSSPlugin({
  //   cssProcessorOptions: {
  //     safe: true
  //   }
  // }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: function (module, count) {
  //     // any required modules inside node_modules are extracted to vendor
  //     return (
  //       module.resource &&
  //       /\.js$/.test(module.resource) &&
  //       module.resource.indexOf(
  //         path.join(__dirname, '../node_modules')
  //       ) === 0
  //     )
  //   }
  // }),
  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'manifest',
  //   chunks: ['vendor']
  // }),
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }
  ]),
  new webpack.DllReferencePlugin({
    context: __dirname,
    /**
     * 在这里引入 manifest 文件
     */
    manifest: require('./dist/vendor-manifest.json')
  }),
];

// 把需要遍历的页面push到plugin中
const getHandleArray = require('../config/pathConfig');
getHandleArray.forEach((element) => {
  proPluginArray.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, filePath + element.outputPath),
      template: element.templatePath,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: [element.chunks]
    })
  )
});
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // devtool: config.build.productionSourceMap ? '#source-map' : false,
  devtool: '#cheap',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: proPluginArray
});

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
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
