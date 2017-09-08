var path = require('path');
var webpack = require('webpack');
module.exports = {
  resolve: {
    modules: [
      '../../',
      "node_modules"
    ]
  },
  entry: [
    'webpack-dev-server/client?http://www.newday.com', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './script/build/main' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, '../src/'),
    publicPath: '/script/src/',    
    filename: '[name].js'
  },
  devtool: 'eval',
  //devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: ['react-hot-loader/webpack','babel-loader']}
    ]
  }
};