const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/*const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });*/
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 获取需要打包的文件，然后生成动态入口文件
const entryArray = require('../config/pathConfig');
const entryObj = {};

entryArray.forEach((element) => {
  entryObj[element.chunks] = element.filePath;
});

module.exports = {
  cache: true,
  entry: entryObj,
  output: {
    path: config.build.assetsRoot,
    filename: '[name][id][hash]/bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      './static': resolve('dist/static')
    },
    unsafeCache: true
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     cache: true
      //   }
      // },
      {
        test: /\.vue$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.cache')
            }
          },
          {
            loader: 'vue-loader',
            options: vueLoaderConfig
          }
        ]
      },
      {
        test: /\.(js|es6)$/,
        include: [resolve('src'), resolve('test'), resolve('api')],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.cache')
            }
          },
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: ["es2015", "stage-2"],
              plugins: ["transform-runtime","istanbul"]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "fast-sass-loader"
          },{
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.cache')
            }
          }],
          // 在开发环境使用 style-loader
          fallback: "style-loader"
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.cache')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /*new HappyPack({
      id: 'eslint',
      threadPool: happyThreadPool,
      loaders: [ 'eslint-loader' ]
    }),
    new HappyPack({
      id: 'vue',
      threadPool: happyThreadPool,
      loaders: [ 'vue-loader' ]
    }),
    new HappyPack({
      id: 'es6',
      threadPool: happyThreadPool,
      loaders: [ 'babel-loader' ]
    }),
    new HappyPack({
      id: 'url',
      threadPool: happyThreadPool,
      loaders: [ 'url-loader' ]
    }),
    new HappyPack({
      id: 'style',
      threadPool: happyThreadPool,
      loaders: [ 'style-loader','sass-loader', 'postcss-loader', 'css-loader' ]
    })*/
    extractSass
  ]
};
