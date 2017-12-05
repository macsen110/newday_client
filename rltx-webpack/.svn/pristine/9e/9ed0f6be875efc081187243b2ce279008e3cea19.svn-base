var fs = require('fs');
const ossService = require('../src/service/ossService');


exports.uploadToOSS = function() {
  var distDir = '../dist/' + process.argv[2];

  if (fs.existsSync(distDir)) {
    fs.readdir(distDir, function (err, objFileDirs) {
      if (err) {
        console.log(err);
        return;
      }

      objFileDirs.forEach(function (objFileDir) {
        if (objFileDir != "static") { // 上传业务html和css, 如waybill/add.html
          fs.readdir(distDir + "/" + objFileDir, function (err, objFiles) {
              objFiles.forEach(function (objFile) {
                ossService.uploadFile(objFileDir, objFile, distDir + "/" + objFileDir + '/' + objFile, (err, result) => {
                  if (err) throw err;
                  console.log(result);
                });
              });
            }
          );
        } else { // 上传js, img, fonts
          fs.readdir(distDir + "/" + objFileDir + '/fonts', function (err, objFiles) { // 上传fonts
            console.log(objFiles);
            objFiles.forEach(function (objFile) {
              ossService.uploadFile(objFileDir + '/fonts', objFile, distDir + "/" + objFileDir + '/fonts', (err, result) => {
                if (err) throw err;
                console.log(result);
              });
            });
          });
          fs.readdir(distDir + "/" + objFileDir + '/img', function (err, objFiles) { // 上传img
            console.log(objFiles);
            objFiles.forEach(function (objFile) {
              ossService.uploadFile(objFileDir + '/img', objFile, distDir + "/" + objFileDir + '/img', (err, result) => {
                if (err) throw err;
                console.log(result);
              });
            });
          });
          fs.readdir(distDir + "/" + objFileDir + '/js', function (err, objFileJsDirs) { // 上传js
            console.log(objFileJsDirs);
            objFileJsDirs.forEach(function (objFileJsDir) {
              if (objFileJsDir.indexOf('.js') > 0) { // 如果文件是manifest.js和vendor.js, 直接上传
                ossService.uploadFile(objFileDir + '/js', objFileJsDir, distDir + "/" + objFileDir + '/js/' + objFileJsDir, (err, result) => {
                  if (err) throw err;
                  console.log(result);
                });
              } else { // 遍历对象文件夹中的js并上传
                fs.readdir(distDir + "/" + objFileDir + '/js/' + objFileJsDir, function (err, objFileJsFiles) {
                  objFileJsFiles.forEach(function (objFileJsFile) {
                    ossService.uploadFile(objFileDir + '/js/' + objFileJsDir, objFileJsFile, distDir + "/" + objFileDir + '/js/' + objFileJsDir + '/' + objFileJsFile, (err, result) => {
                      if (err) throw err;
                      console.log(result);
                    });
                  });
                });
              }
            });
          });
        }
      });
    });
  }
}


