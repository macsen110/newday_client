/**
 * 人员服务
 * Created by baipf on 2017/5/19.
 */

import * as utils from './Utils';

const axios = require('axios');
const apiDomain = require('./ApiConst').apiPersonDomain,
  apiPermissionDomain = require('./ApiConst').apiPermissionDomain,
  apiOrgDomain = require('./ApiConst').apiOrgDomain;
  axios.defaults.withCredentials = true;

import * as HTTP from './httpUtil';

/**
 * 获取人员列表
 * @param mark          检索
 * @param page          页码
 * @param size          页长
 * @param callback      回调
 */
function list(paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/self/list`;
  HTTP.get(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 获取人员部门关系列表
 * @param mark          检索
 * @param page          页码
 * @param size          页长
 * @param callback      回调
 */
function personDeptRelationList(paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/dept/relation/list`;
  HTTP.get(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

function registerList(paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/register/list`;
  HTTP.get(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(cb) {
  const apiUrl = `${apiDomain}/list_render_info/employee/list`;
  HTTP.get(apiUrl, {}, (res, error) => {
    cb(res, error);
  });
}

/**
 * 获取search数据
 * @param callback
 */
function getSearch(cb) {
  const apiUrl = `${apiDomain}/search_render_info/employee/list`;
  HTTP.get(apiUrl, {}, (res, error) => {
    cb(res, error);
  });
}


/**
 * 创建人员
 * @param paramObj
 *         code      用户编码
 *         fullName      真实姓名（跟身份证一致）
 *         deptCode      部门编码
 *         phone         手机号码
 *         userType      1.非司机用户 2.司机用户
 *         positionName  岗位名称
 *         roleCode      角色code
 *         userTag       标签列表
 * @param callback       回调
 */
function add(paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/add`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 编辑员工
 * @param paramObj     参数对象
 *         code      用户对象
 *         fullName      真实姓名（跟身份证一致）
 *         userType      类型
 *         deptCode      部门
 *         positionName  主营业务
 *         roleCode      角色
 *         userTag       标签
 *         phone         手机号
 * @param callback
 */
function edit(code, paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 组织邀请人员加入组织
 * @param userIdentityCode  用户编码
 *         userType          1.非司机用户 2.司机用户
 *         deptCode          部门code
 *         positionName      positionName
 *         roleCodes         角色codes
 *         fullName          用户名称
 *         phone             手机号码
 * @param callback          回调
 */
function applyOrg(paramObj, callback) {
  const apiUrl = `${apiDomain}/employee/${paramObj.userIdentityCode}/org_apply`;
  // console.log(apiUrl);
  axios.post(apiUrl, utils.objToParamStr(paramObj)).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}


/**
 * 根据手机号匹配用户
 * @param paramObj  参数对象
 *         phone     手机号
 * @param callback  回调
 */
function getPhone(paramObj, callback) {
  const apiUrl = `${apiDomain}/employee/${paramObj.phone}/get_phone`;
  console.log(apiUrl);
  axios.get(apiUrl).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 删除员工(离职)
 * @param paramObj
 *         code
 * @param callback
 */
function deleted(paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/${paramObj.code}/delete`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    cb(success, error);
  });
}

/**
 * 禁用员工
 * @param paramObj  参数对象
 *         code  编码
 * @param callback  回调
 */
function disable(paramObj, callback) {
  const apiUrl = `${apiDomain}/employee/${paramObj.code}/disable`;
  // console.log(apiUrl);
  axios.post(apiUrl).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 启用员工
 * @param paramObj  参数对象
 *         code  编码
 * @param callback  回调
 */
function enable(paramObj, callback) {
  const apiUrl = `${apiDomain}/employee/${paramObj.code}/enable`;
  // console.log(apiUrl);
  axios.post(apiUrl).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 人员信息,司机详情
 * @param paramObj  参数对象
 *         code  编码
 * @param callback  回调
 */
function get(paramObj, cb) {
  const apiUrl = `${apiDomain}/employee/${paramObj.code}/get`;
  HTTP.get(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

function getRole(paramObj, cb) {
  const apiUrl = `${apiPermissionDomain}/permission/user/${paramObj.userCode}/role/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    cb(success, error);
  });
}

function getDept(paramObj, cb) {
  const apiUrl = `${apiOrgDomain}/dept/${paramObj.code}/get`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    cb(success, error);
  });
}

function editRole(paramObj, cb) {
  const apiUrl = `${apiPermissionDomain}/permission/set/user/${paramObj.userCode}/role`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    cb(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/employee`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/employee`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/employee`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { list, registerList, getColumn, getSearch, add, edit, applyOrg, getPhone, deleted, disable, enable, get, getRole, getDept, editRole, exportCsv, downloadErrorData, downloadTemplate, personDeptRelationList};
