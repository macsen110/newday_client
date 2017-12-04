
require('./check-versions')();
process.env.NODE_ENV = 'production';
global.progressIndex = 0;
var fs = require('fs'),
  stat = fs.stat;
const util = require('util');
var async = require("async");
var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
//var webpackConfig = require('./webpack.item.prod.conf');
var buildToOSS = require('./buildToOSS');
// var orgId = config.build.orgId;
// var zipFile = require('../zip');
//var spinner = ora('building for production...');
var copy = require('./copy');
const webpackPromise = util.promisify(webpack);
var webpackConfig = require('./webpack.item.prod.conf');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const pathConfig = require("../config/pathConfig")
const proStartTime = Date();
const projectsDone = () => {
  console.log(chalk.cyan('project build startTime', proStartTime+'\n\n'))
  console.log(chalk.cyan('project build endTime', Date()))
}
const projectsRun = () => {
  if (process.argv[2]) execSync('npm run item ' + process.argv[2])
  else {
    Object.keys(pathConfig.configProjectObj).forEach((proItem, index) => {
      console.log(chalk.cyan('Start Build. ' + proItem ));
      let startItemTime = Date();
      execSync('npm run item ' + proItem)
      let endTime = Date();
      console.log(chalk.green('\n'+'bulid ' + proItem + '; entry items length: '+ proItem.length));
      console.log(chalk.cyan('Start time. ' + startItemTime));
      console.log(chalk.cyan('End   time. ' + endTime +'\n'));
    })
  }
}



// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//   if (err) throw err;
//   console.log(chalk.cyan('Start Build.\n'));
//   console.log('startTime: ',  global.startTime)
// });


projectsRun()
projectsDone()