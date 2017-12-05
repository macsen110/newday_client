/**
 * ElementType服务
 * Created by baipf on 2017/5/19.
 */

import * as HTTP from './httpUtil';

const axios = require('axios');
const apiDomain = require('./ApiConst').apiOrgConfigDomain;
axios.defaults.withCredentials = true;

/**
 * ElementDefine
 *
 * @param cb      回调
 */
function elementDefine(cb) {
  const apiUrl = `${apiDomain}/element_type/define`;
  HTTP.get(apiUrl, {}, (response, error) => {
    cb(response, error);
  });
}

/**
 * ElementInfo
 *
 * @param cb      回调
 */
function elementInfo(cb) {
  const apiUrl = `${apiDomain}/element_type/info`;
  HTTP.get(apiUrl, {}, (response, error) => {
    cb(response, error);
  });
}

export { elementDefine, elementInfo };
