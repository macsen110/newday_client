var webpack = require('webpack');

module.exports = {
  resolve: {
    modules: [
      './',
      "node_modules"
    ],
    alias: {
      zepto: 'scripts/lib/zepto',
      template: 'scripts/lib/template',
      security: 'scripts/lib/security',
      EXIF: 'scripts/lib/exif'      
    }
  },
  entry: {
      vendor: ['security','zepto','template','html', 'EXIF'],
      app: './scripts/pages/app',
      //tools: ['./scripts/lib/ui','./host']
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
