/**
 * Created by zhuyi on 17/5/2.
 */
const config = require('../../api/Config').get(process.env.NODE_ENV);
const co = require('co');
const OSS = require('ali-oss');

console.log(config.oss.accessKeyId);

const client = new OSS({
  region: config.oss.region,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  bucket: config.oss.bucket
});

/**
 * 上传文件到oss，路径暂定为{orgId}/{type}/{file}
 *
 * @param orgId 企业id
 * @param type 类型
 *          partner 伙伴
 * @param fileKey file key
 * @param localFilePath 本地文件路径
 * @param cb 回调方法
 */
module.exports.uploadFile = function (orgId, type, fileKey, localFilePath, cb) {
  co(function* () {
    const fileOssPath = `${orgId}/${type}/${fileKey}`;
    const result = yield client.put(fileOssPath, localFilePath);
    cb(null, result);
  }).catch((err) => {
    cb(err);
  });
};
