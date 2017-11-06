process.env.NODE_ENV = 'development'
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.js');
var opn = require('opn')
config.entry.app.unshift("webpack-dev-server/client?http://localhost:5000/", "webpack/hot/dev-server");
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(5000, 'localhost', function (err, result) {
  console.log(result)
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:5000/');
  //opn('http://localhost:4000/')
});