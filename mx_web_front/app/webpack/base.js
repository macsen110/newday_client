var path = require('path')
var config = require('./config/index')
var webpack = require("webpack")
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve('src/main')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      '../../',
      "node_modules"
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  module: {
    rules: [ 
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },     
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      //解析.css文件
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", 'css')
      },
      //解析.vue文件
      {
          test: /\.vue$/,
          loader: 'vue'
      }, 
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
}
