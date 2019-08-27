var path = require('path');
module.exports = {
    NODE_ENV: 'production',
    index: path.resolve(__dirname, '../../../../zone/index.html'),
    assetsRoot: path.resolve(__dirname, '../../../../zone'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/zone/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
}