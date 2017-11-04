var path = require('path')
var config = require('./config/index')
var webpack = require("webpack")
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var cssnano = require('cssnano');
var NODE_ENV = process.env.NODE_ENV;
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
function getVueOptions() {
  var obj = {};
  if (NODE_ENV === 'production') {
    obj = {
      extractCSS: true,
      postcss: [
        cssnano({
          reduceIdents: false,
          discardDuplicates:true,
          autoprefixer:true
        })
      ],
    }
  }
  else {
    obj = {
      extractCSS: true
    } 
  }
  return obj;
}
module.exports = {
  
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    modules: [
      '../../',
      "node_modules"
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'styles': resolve('src/styles'),
      'assets': resolve('src/assets')
    }
  },
  entry: {
    vendor: ['vue', 'vue-router', 'yao-m-ui'],
    app: resolve('src/main')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  module: {
    rules: [ 
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },     
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }  
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
        // loader: 'url-loader',
        // query: {
        //   limit: 1000,
        //   name: utils.assetsPath('img/[name].[hash:7].[ext]')
        // }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      
      //解析.vue文件
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: getVueOptions()
      }, 
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     //resolve-url-loader may be chained before sass-loader if necessary
      //     use: [
      //       'style-loader',
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           minimize: true
      //         }
      //       }, 
      //       'sass-loader',
      //       // {
      //       //   loader: 'sass-resources-loader',generateLoaders(['css', 'sass?data=@import "~assets/styles/app";'])
      //       //   options: {
      //       //     // Provide path to the file with resources
      //       //     resources: resolve('src/scss/base.scss'),
      //       //   },
      //       // },
      //     ]
      //   })
      // },
      // //解析.css文件
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [{
      //       loader: 'css-loader',
      //       options: {
      //         minimize: true
      //       }
      //     }]
      //   }),
      // },
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: utils.assetsPath("js/vendor.js")}),
    new ExtractTextPlugin({
      filename: NODE_ENV !== 'production' ? 'style.css' : utils.assetsPath('css/style.css'),
      allChunks: true,
      disable: NODE_ENV !== 'production'
    }),
    
  
  ]
}
