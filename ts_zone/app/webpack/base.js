var path = require('path')
var config = require('./config/index')
var webpack = require("webpack")
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NODE_ENV = process.env.NODE_ENV
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve('script/build/main'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    modules: [
      '../../',
      "node_modules"
    ],
    alias: {
      'assets': resolve('assets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
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
      // //解析.css文件
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }]
        }),
      }
    ]
  },
  mode: NODE_ENV !== 'production' ? 'development' : 'production',
  plugins: [
    new ExtractTextPlugin({
      filename: NODE_ENV !== 'production' ? 'style.css' : utils.assetsPath('css/style.css'),
      allChunks: true,
      disable: NODE_ENV !== 'production'
    })
  ],
  externals: {
    "yao-m-ui": 'YAO_M_UI'
  }
}
