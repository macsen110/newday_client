var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.js');
var opn = require('opn')
config.entry.app.unshift("webpack-dev-server/client?http://dev.macsen318.com:9000/", "webpack/hot/dev-server");
console.log(config.output.publicPath)
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: {
    index: '/template/dev'
  }
}).listen(9000, 'dev.macsen318.com', function (err, result) {
  console.log('err', err)
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://dev.macsen318.com:9000/ts_zone');
  opn('http://dev.macsen318.com:9000/ts_zone')
});