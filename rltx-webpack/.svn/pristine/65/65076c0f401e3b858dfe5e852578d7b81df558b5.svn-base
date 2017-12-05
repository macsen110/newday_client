/**
 * Created by cc on 2017/10/30.
 */

import * as HTTP from './httpUtil';

const apiConst = require('./ApiConst');
const apiDomain = apiConst.apiMessageDomain;

/**
 * 获取列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/message/list`;
  // console.log(apiUrl);
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 删除
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/message/delete/${paramObj.id}`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

export { list, deleted };
