var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.js');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:4000/", "webpack/hot/dev-server");
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(4000, 'dev.macsen318.com', function (err, result) {
  console.log(result)
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:4000/');
});