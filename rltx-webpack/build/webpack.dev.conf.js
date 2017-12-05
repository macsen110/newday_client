const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  cache: true,
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      'process.env.rltx': JSON.stringify("http://gateway.rltx.xyz"),
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'appTest.html',
    //   template: 'appTest.html',
    //   chunks: ['appTest/appTest'],
    //   inject: true
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'list.html',
    //   template: 'list.html',
    //   chunks: ['list/list'],
    //   inject: true
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'add.html',
    //   template: 'add.html',
    //   chunks: ['add/add'],
    //   inject: true
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'detail.html',
    //   template: 'detail.html',
    //   chunks: ['detail/detail'],
    //   inject: true
    // }),
    new HtmlWebpackPlugin({
      filename: 'register/user.html',
      template: 'template/register/user.html',
      chunks: ['register/user'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'register/org.html',
      template: 'template/register/org.html',
      chunks: ['register/org'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'register/success.html',
      template: 'template/register/success.html',
      chunks: ['register/success'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'register/wait.html',
      template: 'template/register/wait.html',
      chunks: ['register/wait'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'logs/list.html',
      template: 'template/logs/list.html',
      chunks: ['logs/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'partner/list.html',
      template: 'template/partner/list.html',
      chunks: ['partner/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'partner/add.html',
      template: 'template/partner/add.html',
      chunks: ['partner/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'resource/route/list.html',
      template: 'template/resource/route/list.html',
      chunks: ['route/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'resource/route/add.html',
      template: 'template/resource/route/add.html',
      chunks: ['route/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'resource/rates/list.html',
      template: 'template/resource/rates/list.html',
      chunks: ['rates/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'resource/rates/add.html',
      template: 'template/resource/rates/add.html',
      chunks: ['rates/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'truck/list.html',
      template: 'template/truck/list.html',
      chunks: ['truck/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'truck/add.html',
      template: 'template/truck/add.html',
      chunks: ['truck/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'truck/detail.html',
      template: 'template/truck/detail.html',
      chunks: ['truck/detail'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'trailer/list.html',
      template: 'template/trailer/list.html',
      chunks: ['trailer/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'trailer/add.html',
      template: 'template/trailer/add.html',
      chunks: ['trailer/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'employee/list.html',
      template: 'template/employee/list.html',
      chunks: ['employee/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'employee/add.html',
      template: 'template/employee/add.html',
      chunks: ['employee/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'waybill/list.html',
      template: 'template/waybill/list.html',
      chunks: ['waybill/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'waybill/add.html',
      template: 'template/waybill/add.html',
      chunks: ['waybill/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'waybill/action.html',
      template: 'template/waybill/action.html',
      chunks: ['waybill/action'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'waybill/addsettle.html',
      template: 'template/waybill/addsettle.html',
      chunks: ['waybill/addsettle'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'logistics/list.html',
      template: 'template/logistics/list.html',
      chunks: ['logistics/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'logistics/add.html',
      template: 'template/logistics/add.html',
      chunks: ['logistics/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'logistics/action.html',
      template: 'template/logistics/action.html',
      chunks: ['logistics/action'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'driver/list.html',
      template: 'template/driver/list.html',
      chunks: ['driver/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'driver/add.html',
      template: 'template/driver/add.html',
      chunks: ['driver/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'freight/list.html',
      template: 'template/freight/list.html',
      chunks: ['freight/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'freight/add.html',
      template: 'template/freight/add.html',
      chunks: ['freight/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'waybill/ticket/detail/list.html',
      template: 'template/waybill/ticket/detail/list.html',
      chunks: ['waybill/ticket/detail/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'waybill/ticket/detail/add.html',
      template: 'template/waybill/ticket/detail/add.html',
      chunks: ['waybill/ticket/detail/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'org/self.html',
      template: 'template/org/self.html',
      chunks: ['org/self'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'transport/list.html',
      template: 'template/transport/list.html',
      chunks: ['transport/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'transport/add.html',
      template: 'template/transport/add.html',
      chunks: ['transport/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'person/self/info.html',
      template: 'template/person/self/info.html',
      chunks: ['person/self/info'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'safe/verify.html',
      template: 'template/safe/verify.html',
      chunks: ['safe/verify'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'safe/safe.html',
      template: 'template/safe/safe.html',
      chunks: ['safe/safe'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'safe/cert.html',
      template: 'template/safe/cert.html',
      chunks: ['safe/cert'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'role/list.html',
      template: 'template/role/list.html',
      chunks: ['role/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'menu/menu.html',
      template: 'template/menu/menu.html',
      chunks: ['menu/menu'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'login/login.html',
      template: 'template/login/login.html',
      chunks: ['login/login'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'car/car.html',
      template: 'template/car/car.html',
      chunks: ['car/car'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'menu/index.html',
      template: 'template/menu/index.html',
      chunks: ['menu/index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'settle/list.html',
      template: 'template/settle/list.html',
      chunks: ['settle/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'maintenance/list.html',
      template: 'template/maintenance/list.html',
      chunks: ['maintenance/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'maintenance/add.html',
      template: 'template/maintenance/add.html',
      chunks: ['maintenance/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'peccancy/list.html',
      template: 'template/peccancy/list.html',
      chunks: ['peccancy/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'peccancy/add.html',
      template: 'template/peccancy/add.html',
      chunks: ['peccancy/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'accident/list.html',
      template: 'template/accident/list.html',
      chunks: ['accident/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'accident/add.html',
      template: 'template/accident/add.html',
      chunks: ['accident/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'insurance/list.html',
      template: 'template/insurance/list.html',
      chunks: ['insurance/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'insurance/add.html',
      template: 'template/insurance/add.html',
      chunks: ['insurance/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'care/list.html',
      template: 'template/care/list.html',
      chunks: ['care/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'care/add.html',
      template: 'template/care/add.html',
      chunks: ['care/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'tyre/list.html',
      template: 'template/tyre/list.html',
      chunks: ['tyre/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'tyre/add.html',
      template: 'template/tyre/add.html',
      chunks: ['tyre/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'tyre_inspection/list.html',
      template: 'template/tyreInspection/list.html',
      chunks: ['tyreInspection/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'tyre_inspection/add.html',
      template: 'template/tyreInspection/add.html',
      chunks: ['tyreInspection/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'device/list.html',
      template: 'template/device/list.html',
      chunks: ['device/list'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'device/add.html',
      template: 'template/device/add.html',
      chunks: ['device/add'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'remind/list.html',
      template: 'template/remind/list.html',
      chunks: ['remind/list'],
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
