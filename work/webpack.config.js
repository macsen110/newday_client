var webpack = require('webpack');

var path = require('path');

function src(name) {
  return path.join(__dirname, './scripts/app/', name)
}
module.exports = {
  resolve: {
    modules: [
      './',
      "node_modules"
    ],
    alias: {
      zepto: src('lib/zepto'),
      template: src('lib/template'),
      host: src('host'),
      ui: 'yao-m-ui',
      MeScroll: 'mescroll.js',
      common: src('lib/common'),
      commonAjax: src('lib/commonAjax'),
      ycaptcha: src('lib/ycaptcha')
    }
  },
  entry: {
      vendor: ['zepto','template','html', 'yao-easy-router', 'ui', 'MeScroll'],
      app: './scripts/app/main',
  },
  output: {
    path: __dirname +'/scripts/build/',
    publicPath: './scripts/build/',
    filename: '[name].min.js',
    chunkFilename : '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attrs: false
        }
      }
    ]
  },
  
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "bundle.js"}),
    //new webpack.optimize.OccurenceOrderPlugin(),
  ]
} else {
    module.exports.plugins = [
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "bundle.js"}),
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin("tools", "tools.js"),
  ]
}
