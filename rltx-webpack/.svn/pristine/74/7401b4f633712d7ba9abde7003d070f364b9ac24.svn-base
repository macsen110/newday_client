/**
 * Created by cc on 17/8/14.
 */

// import * as utils from './Utils';

const axios = require('axios');

axios.defaults.withCredentials = true;

import * as HTTP from './httpUtil';

/**
 * 获取变更日志信息
 */
function list(paraObj, cb) {
  const apiUrl = `${paraObj.url}`;
  delete paraObj.url;
  HTTP.get(apiUrl, paraObj, (response, error) => {
    cb(response, error);
  });
}

export { list };
