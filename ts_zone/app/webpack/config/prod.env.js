var path = require('path');
module.exports = {
    NODE_ENV: 'production',
    index: path.resolve(__dirname, '../../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/ts_zone',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: true
}