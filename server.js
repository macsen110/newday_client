var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./script/build/webpack.config');
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(4000, 'www.newday.com', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:4000/');
});