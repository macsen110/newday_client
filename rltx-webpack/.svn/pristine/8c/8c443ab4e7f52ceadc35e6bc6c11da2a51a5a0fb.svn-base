/**
 * zip.js
 * Created by dsky on 17/5/4.
 */

const fs = require('fs');
const JSZip = require('jszip');
const zipConfig = require('./zipConfig');
const outPath = zipConfig.outPath;
const fileConfig = zipConfig.config;
const ossService = require('../service/ossService');
function creatZip(zip, path, name, orgId) {
  zip
  .generateNodeStream({type:'nodebuffer',streamFiles:true})
  .pipe(fs.createWriteStream(path))
  .on('finish', function () {
    console.log(name + " is uploading.");
    ossService.uploadFile(orgId, name, name+'.zip', path, function (error, res) {
      console.log(name + ' is uploaded');
      if (error) {
        console.log(error);
      }
    });
  });
}
function setZip(zip, data) {
  const len = data.length;
  for (let j = len; j--;) {
    zip.file(data[j].fileName, fs.readFileSync(data[j].filePath, 'utf8'));
  }
}
function setConfig(data, orgId) {
  const len = data.length;
  for (let i = len; i--;) {
    let zip = new JSZip();
    /*if (data[i].isFloder) {
      let folder = zip.folder(data[i].name);
      setZip(folder, data[i].file);
      folder = null;
    } else {
      setZip(zip, data[i].file);
    }*/
    setZip(zip, data[i].file);
    creatZip(zip , outPath + data[i].name +'.zip', data[i].name, orgId);
    zip = null;
  }
}
module.exports.zip = (orgId) => {
  setConfig(fileConfig, orgId);
};

