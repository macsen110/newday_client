/**
 * zipConfig.js
 * Created by dsky on 17/5/4.
 */
module.exports = {
  outPath:'./zipFile/',
  config: [
    {
      name : 'list',
      file : [
        {
          fileName: 'list.html',
          filePath: './dist/list.html'
        },
        {
          fileName: 'list.js',
          filePath: './dist/static/js/list/list.js'
        },
        {
          fileName: 'vendor.js',
          filePath: './dist/static/js/vendor.js'
        },
        {
          fileName: 'manifest.js',
          filePath: './dist/static/js/manifest.js'
        },{
          fileName: 'list.css',
          filePath: './dist/static/css/list/list.css'
        }
      ],
    },
    {
      name : 'appTest',
      file : [
        {
          fileName: 'appTest.html',
          filePath: './dist/appTest.html'
        },
        {
          fileName: 'appTest.js',
          filePath: './dist/static/js/appTest/appTest.js'
        },
        {
          fileName: 'vendor.js',
          filePath: './dist/static/js/vendor.js'
        },
        {
          fileName: 'manifest.js',
          filePath: './dist/static/js/manifest.js'
        },{
          fileName: 'appTest.css',
          filePath: './dist/static/css/appTest/appTest.css'
        }
      ],
    },
    {
      name : 'add',
      file : [
        {
          fileName: 'add.html',
          filePath: './dist/add.html'
        },
        {
          fileName: 'add.js',
          filePath: './dist/static/js/add/add.js'
        },
        {
          fileName: 'vendor.js',
          filePath: './dist/static/js/vendor.js'
        },
        {
          fileName: 'manifest.js',
          filePath: './dist/static/js/manifest.js'
        },{
          fileName: 'add.css',
          filePath: './dist/static/css/add/add.css'
        }
      ],
    }
  ]
};
