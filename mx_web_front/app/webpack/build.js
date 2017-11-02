// https://github.com/shelljs/shelljs
//require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('./config/')
var webpackConfig = require('./product')

var spinner = ora('building for production...')
spinner.start()
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

shell.config.silent = true
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.cp('-R', 'static/*', assetsPath)
shell.cp('-R', 'tmp', config.build.assetsRoot)
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
  
  
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
  console.log(assetsPath+'/css/style.css');
  shell.sed('-i', 'rem', '../', assetsPath+'/css/style.css');
})
