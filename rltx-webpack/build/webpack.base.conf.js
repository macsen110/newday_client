const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
/*const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });*/
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    'partner/list':'./src/partner/list.js',
    'partner/add':'./src/partner/add',
    'route/list': './src/route/list/list.js',
    'route/add': './src/route/add/add.js',
    'rates/list': './src/rates/list/list.js',
    'rates/add': './src/rates/add/add.js',
    'driver/list': './src/driver/list.js',
    'driver/add': './src/driver/add.js',
    'freight/list': './src/freight/list.js',
    'freight/add': './src/freight/add.js',
    'truck/list': './src/truck/list.js',
    'truck/add': './src/truck/add.js',
    'trailer/list': './src/trailer/list.js',
    'trailer/add': './src/trailer/add.js',
    'employee/list': './src/employee/list/list.js',
    'employee/add': './src/employee/add/add.js',
    'waybill/list': './src/waybill/list.js',
    'waybill/add': './src/waybill/add.js',
    'transport/list': './src/transport/list',
    'transport/add': './src/transport/add',
    'maintenance/list': './src/maintenance/list.js',
    'maintenance/add': './src/maintenance/add.js',
    'peccancy/list': './src/peccancy/list.js',
    'peccancy/add': './src/peccancy/add.js',
    'accident/list': './src/accident/list.js',
    'accident/add': './src/accident/add.js',
    'insurance/list': './src/insurance/list.js',
    'insurance/add': './src/insurance/add.js',
    'care/list': './src/care/list.js',
    'care/add': './src/care/add.js',
    'tyre/list': './src/tyre/list.js',
    'tyre/add': './src/tyre/add.js',
    'tyreInspection/list': './src/tyreInspection/list.js',
    'tyreInspection/add': './src/tyreInspection/add.js',
    'device/list': './src/device/list',
    'device/add': './src/device/add',
    'logistics/list': './src/logistics/list.js',
    'logistics/add': './src/logistics/add.js',
    'waybill/ticket/detail/list': './src/waybill/ticket/detail/list/list.js',
    'waybill/ticket/detail/add': './src/waybill/ticket/detail/add/add.js',
    'register/user': './src/register/user.js',
    'register/org': './src/register/org.js',
    'register/success': './src/register/success.js',
    'register/wait': './src/register/wait.js',
    'logs/list': './src/logs/list.js',
    'waybill/action': './src/waybill/action.js',
    'waybill/addsettle': './src/waybill/addsettle.js',
    'logistics/action': './src/logistics/action.js',
    'org/self': './src/org/self.js',
    'person/self/info': './src/person/self/info',
    'safe/safe': './src/safe/safe',
    'safe/verify': './src/safe/verify',
    'safe/cert': './src/safe/cert',
    'role/list': './src/role/list',
    'menu/menu': './src/menu/menu',
    'menu/index': './src/menu/index',
    'login/login': './src/login/login',
    'remind/list': './src/remind/list.js',
    'car/car': './src/car/car',
    'truck/detail': './src/truck/detail.js',
    'settle/list': './src/settle/list'
  },
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
      './static': resolve('dist')
    },
    unsafeCache: true
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          cache: true
        }
      },
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
            loader: 'babel-loader?cacheDirectory',
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
            loader: "sass-loader"
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
