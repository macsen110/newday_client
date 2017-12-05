/**
 * 部门服务
 * Created by baipf on 2017/5/18.
 */

import * as utils from './Utils';
import * as apiConst from './ApiConst';

const axios = require('axios');
axios.defaults.withCredentials = true;
// axios.defaults.headers = {'Access-Control-Allow-Origin':'*', 'Content-type':'application/x-www-form-urlencoded;charset=utf-8'};

/**
 * 添加部门
 * @param deptName          名称
 * @param description       描述
 * @param parentDeptCode    上级编码
 * @param callback          回调
 */
function add(paramObj, callback) {
  const apiUrl = `${apiConst.apiOrgDomain}/dept/add`;
  // console.log(apiUrl);
  axios.post(apiUrl, utils.objToParamStr(paramObj)).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 编辑部门
 * @param paramObj        参数对象
 *         deptCode          编码
 *         deptName          名称
 *         description       描述
 *         parentDeptCode    上级编码
 * @param callback          回调
 */
function edit(paramObj, callback) {
  const apiUrl = `${apiConst.apiOrgDomain}/dept/${paramObj.deptCode}/edit`;
  // console.log(apiUrl);
  axios.post(apiUrl, utils.objToParamStr(paramObj)).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 删除部门
 * @param paramObj  参数对象
 *         deptCode  编码
 * @param callback  回调
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiConst.apiOrgDomain}/dept/${paramObj.deptCode}/delete`;
  // console.log(apiUrl);
  axios.post(apiUrl).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

export { add, edit, deleted };
