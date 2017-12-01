import * as utils from './Utils';
import * as HTTP from './httpUtil';

const apigatewayDomain = require('./ApiConst').gatewayDomain,
  apiPlatformDomain = require('./ApiConst').apiPlatformDomain;

/**
 *  获取验证状态
 */
function getInfo(callback) {
  const url = `${apiPlatformDomain}/platform/cert_org_base_info/info`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  })
}

/**
 *  公司认证
 */
function verifyAction(success, error) {
  HTTP.post(`${apigatewayDomain}/org/org/verify`, {}, (success, error) => {
    callback(success, error);
  });
}

export { getInfo, verifyAction };
