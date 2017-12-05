const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});
const entryArrayFun = require("../config/pathConfig").exportsArrayFun;
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

// 获取需要打包的文件，然后生成动态入口文件
var webpackObj = (index) => {
  var entryObj = {};
  var entryArray = [];
  console.log("progressIndex: ", index);
  entryArray = entryArrayFun(index);
  console.log("entryArray Length", entryArray.length);
  entryObj = {};
  entryArray.forEach(element => {
    entryObj[element.chunks] = element.filePath;
  });
  return {
    cache: true,
    entry: entryObj,
    output: {
      path: config.build.assetsRoot,
      filename: "[name][id][hash]/bundle.js",
      publicPath:
        process.env.NODE_ENV === "production"
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": resolve("src"),
        vue$: "vue/dist/vue.esm.js",
        "./static": resolve("dist/static")
      },
      unsafeCache: true
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: [resolve('src')],
           use: 'happypack/loader?id=vueloader'
        },
        {
          test: /\.(js|es6)$/,
          include: [resolve('src'), resolve('test'), resolve('api')],
           use: 'happypack/loader?id=jsloader'
         
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("img/[name].[hash:7].[ext]")
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: extractSass.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "fast-sass-loader"
              },
              {
                loader: "cache-loader",
                options: {
                  cacheDirectory: path.resolve(".cache")
                }
              }
            ],
            // 在开发环境使用 style-loader
            fallback: "style-loader"
          })
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "cache-loader",
              options: {
                cacheDirectory: path.resolve(".cache")
              }
            }
          ]
        }
      ]
    },
    plugins: [
      extractSass,
      new webpack.PrefetchPlugin("core-js/library"),
      new webpack.PrefetchPlugin("babel-runtime/core-js"),
      new HappyPack({
        id: 'vueloader',
        threadPool: happyThreadPool,
        loaders: [
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
      }),
      new HappyPack({
        id: 'jsloader',
        threadPool: happyThreadPool,
        loaders: [
            
            {
              loader: 'babel-loader',
              options: {
                presets: ["es2015", "stage-2"],
                plugins: ["transform-runtime","istanbul"]
              }
            },{
              loader: 'cache-loader',
              options: {
                cacheDirectory: path.resolve('.cache')
              }
            },
          ]
      })
    ]
  };
};
module.exports = index => webpackObj(index);
