// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
let filePath = '';
if (process.argv[2] === 'dev') {
  filePath = '../dist/dev';
} else if (process.argv[2] === 'test') {
  filePath = '../dist/test';
} else if (process.argv[2] === 'staging') {
  filePath = '../dist/staging';
} else if (process.argv[2] === 'production') {
  filePath = '../dist/production';
} else {
  filePath = '../dist/build';
}
module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, filePath),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css','html'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or offF
    bundleAnalyzerReport: true,
    // orgId: process.argv[2],
    url: 'http://gateway.rltxtest',
    appPort:':80',
    orgUrl:'http://gateway.rltx.xyz/org'
  },
  dev: {
    env: require('./dev.env'),
    port: 8099,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    url:'http://gateway.rltx',
    appPort:':80'
  }
};
