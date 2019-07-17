var path = require('path')
var config = require('./config/index')
var utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var NODE_ENV = process.env.NODE_ENV
const devMode = NODE_ENV !== 'production';
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: devMode,
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          'css-loader',
        ],
            
      }
    ]
  },
  mode: NODE_ENV !== 'production' ? 'development' : 'production',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? '[name].css' : utils.assetsPath('css/[name].[chunkhash].css'),
      chunkFilename: devMode ? '[name].css' : utils.assetsPath('css/[name].[chunkhash].css'),
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  externals: {
    "yao-m-ui": 'YAO_M_UI'
  }
}
