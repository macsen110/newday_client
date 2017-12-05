/**
 * Created by cc on 17/5/2.
 */

import * as utils from './Utils';

const axios = require('axios');
// 权限服务
const apiPermissionDomain = require('./ApiConst').apiPermissionDomain;

// 人员服务
const apiPersonDomain = require('./ApiConst').apiPersonDomain;

axios.defaults.withCredentials = true;

import * as HTTP from './httpUtil';

/**
 * 获取人员信息
 */
function get(cb) {
  const apiUrl = `${apiPersonDomain}/person/self/info`;
  HTTP.get(apiUrl, {}, (response, error) => {
    cb(response, error);
  });
}

/**
 * 初始化角色
 */
function initRole(cb) {
  const apiUrl = `${apiPermissionDomain}/permission/set/root_permission`;
  HTTP.post(apiUrl, {}, (response, error) => {
    cb(response, error);
  });
}

/**
 * 初始化配置
 */
function initConfig(paramObj, cb) {
  const apiUrl = paramObj.url,
    apiType = paramObj.type;
  HTTP.post(apiUrl, utils.objToParamStr(apiType), (response, error) => {
    cb(response, error);
  });
}

export { get, initConfig, initRole };
