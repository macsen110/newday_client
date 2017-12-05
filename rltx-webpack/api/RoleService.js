/**
 * Created by zyc on 2017/7/24.
 */

import * as HTTP from './httpUtil';

const axios = require('axios');
const apiDomain = require('./ApiConst').apiPermissionDomain;
axios.defaults.withCredentials = true;

function getMember(callback) {
  const url = `${apiDomain}/permission/org/role/list/self`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

function getUserRoleList(params, callback) {
  const url = `${apiDomain}/permission/user/role/list`;
  HTTP.get(url, params, (success, error) => {
    callback(success, error);
  });
}

function getPermission(callback) {
  const url = `${apiDomain}/permission/user/list/permission`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

function getRolePermission(paramObj, callback) {
  const url = `${apiDomain}/permission/role/${paramObj.code}/list`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

function editUserInfo(paramObj, callback) {
  const url = `${apiDomain}/permission/role/${paramObj.code}/update`;
  delete paramObj.code;
  HTTP.post(url, paramObj, (success, error) => {
    callback(success, error);
  });
}

function savePermissionEdit(paramObj, callback) {
  const url = `${apiDomain}/permission/set/${paramObj.roleCode}/role`;
  delete paramObj.roleCode;
  HTTP.post(url, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { getMember, getPermission, getRolePermission, editUserInfo, savePermissionEdit, getUserRoleList };
