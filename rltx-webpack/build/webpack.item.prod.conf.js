const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.item.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const entryArrayFun = require("../config/pathConfig").exportsArrayFun;
const chalk = require('chalk');
let filePath = "";
let gatewayUrl = '"http://gateway.rltx.xyz"';
if (process.argv[2] === "dev") {
  filePath = "../dist/dev";
} else if (process.argv[2] === "test") {
  filePath = "../dist/test";
  gatewayUrl = '"http://gateway.rltxtest.xyz"';
} else if (process.argv[2] === "staging") {
  filePath = "../dist/staging";
  gatewayUrl = '"https://gateway.rltx.com"';
} else if (process.argv[2] === "production") {
  filePath = "../dist/production";
  gatewayUrl = '"https://gateway.rltx.com"';
} else {
  filePath = "../dist/build";
}
console.log(__dirname);
// console.log('orgId：',config.build.orgId);
var env =
  process.env.NODE_ENV === "testing"
    ? require("../config/test.env")
    : config.build.env;
console.log("Build", process.argv[2], "environment");

// 获取相对应的编译数组
const proPluginArray = [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    "process.env.rltx": gatewayUrl,
    "process.env": env
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    /**
     * 在这里引入 manifest 文件
     */
    manifest: require("./dist/vendor-manifest.json")
  }),
  new ParallelUglifyPlugin({
    uglifyJS: {
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        beautify: false
      }
    },
    cacheDir: path.join(__dirname, "../.cache")
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, "../static"),
      to: config.build.assetsSubDirectory,
      ignore: [".*"]
    }
  ])
];

var webpackConfig = index => {
  console.log(chalk.cyan(index))
  // 把需要遍历的页面push到plugin中
  const getHandleArray = entryArrayFun(index);
  console.log("progressIndex: ", index);
  getHandleArray.forEach(element => {
    proPluginArray.push(
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, filePath + element.outputPath),
        template: element.templatePath,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunks: [element.chunks, "vendor", "manifest"]
      })
    );
  });
  return merge(baseWebpackConfig(index), {
    module: {
      rules: utils.styleLoaders({
        sourceMap: false,
        extract: true
      })
    },
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath("js/[name].[chunkhash].js"),
      chunkFilename: utils.assetsPath("js/[name].[chunkhash].js")
    },
    plugins: proPluginArray
  });
};



module.exports = webpackConfig;
