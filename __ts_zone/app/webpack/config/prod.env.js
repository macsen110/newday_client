var path = require('path');
module.exports = {
    NODE_ENV: 'production',
    index: path.resolve(__dirname, '../../../../ts_zone/index.html'),
    assetsRoot: path.resolve(__dirname, '../../../../ts_zone'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/ts_zone/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: true
}