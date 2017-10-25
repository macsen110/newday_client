var path = require('path');
module.exports = {
    NODE_ENV: 'production',
    index: path.resolve(__dirname, '../../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
}