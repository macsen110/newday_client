const startTime = Date();
const curProItemName = process.argv[2]
const util = require('util');
var chalk = require('chalk');
var webpack = require('webpack');
const webpackPromise = util.promisify(webpack);
var webpackConfig = require('./webpack.item.prod.conf');
var ora = require('ora');
var spinner = ora('building for production...'+ curProItemName);
var progressItemDoneCb =  (err, stats, proItemName) => {
  spinner.stop();
  if (err) {
    throw err;
  }
  console.log(chalk.cyan(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n'));
  console.log(chalk.cyan('Build complete. ' + proItemName + '\n startTime: ' + startTime +'\n end Time'+ Date()));
  // copy.copyDir(path.resolve(__dirname, '../src/ex'), path.resolve(__dirname, `../dist/${process.argv[2]}/ex`));
  // copy.copyFile(path.resolve(__dirname, '../template/car/track.html'),  path.resolve(__dirname, `../dist/${process.argv[2]}/car/track.html`));
  // buildToOSS.uploadToOSS();
  
}
const webpackExecItem = (proItemName) => {
  //console.log(proItemName)
  // console.log(chalk.cyan('Webpack start Building '+ proItemName));
  webpackPromise(webpackConfig(proItemName))
  .then((res, rej) => progressItemDoneCb(rej, res, proItemName))
  .catch(err => console.log(err))
}
console.log(chalk.cyan('Webpack Start Build '+ curProItemName));

webpackExecItem(curProItemName)