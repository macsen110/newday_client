require('./check-versions')();

process.env.NODE_ENV = 'production';
var fs = require('fs'),
  stat = fs.stat;
var async = require("async");
var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.item.prod.conf');
var buildToOSS = require('./buildToOSS');
// var orgId = config.build.orgId;
// var zipFile = require('../zip');
var spinner = ora('building for production...');
var copy = require('./copy');

spinner.start();
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  console.log(chalk.cyan('Start Build.\n'));
  global.startTime = Date()
  console.log('start: ' + global.startTime)
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    console.log(chalk.cyan('Webpack Build.\n'));
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('Build complete.\n'));
    copy.copyDir(path.resolve(__dirname, '../src/ex'), path.resolve(__dirname, `../dist/${process.argv[2]}/ex`));
    copy.copyFile(path.resolve(__dirname, '../template/car/track.html'),  path.resolve(__dirname, `../dist/${process.argv[2]}/car/track.html`));

    buildToOSS.uploadToOSS();
    // console.log(chalk.cyan('  zip start.\n'));
    // zipFile.zip(orgId);
    // console.log(chalk.cyan('  zip complete.\n'));
    console.log('startTime: ',  global.startTime)
    console.log('end build: ' + Date())
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
});

