/**
 * 组织服务
 * Created by baipf on 2017/5/18.
 */

import * as utils from './Utils';

const axios = require('axios');
const apiDomain = require('./ApiConst').apiOrgDomain;
axios.defaults.withCredentials = true;

import * as HTTP from './httpUtil';

/**
 * 创建组织
 * @param paramObj      参数对象
 *         orgFullName   全称
 *         telephone     电话
 *         websiteUrl    网址
 *         mainBusiness  主营业务
 *         province      省编码
 *         city          市编码
 *         county        区编码
 *         address       详细地址
 * @param callback      回调
 */
function add(paramObj, cb) {
  const apiUrl = `${apiDomain}/org/add`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 组织发起认证
 * @param callback  回调
 */
function applyCert(callback) {
  const apiUrl = `${apiDomain}/org/apply_cert`;
  axios.get(apiUrl).then(function (response) {
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 获取组织信息
 * @param callback  回调
 */
function selfs(callback) {
  const apiUrl = `${apiDomain}/org/self`;
  axios.get(apiUrl).then(function (response) {
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 编辑组织
 * @param paramObj      参数对象
 *         orgFullName   全称
 *         telephone     电话
 *         websiteUrl    网址
 *         mainBusiness  主营业务
 *         province      省编码
 *         city          市编码
 *         county        区编码
 *         address       详细地址
 * @param callback      回调
 */
function edit(code, paramObj, cb) {
  const apiUrl = `${apiDomain}/org/self/edit`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 人员拒绝组织邀请
 * @param paramObj  参数对象
 *         id        邀请id
 * @param callback  回调
 */
function personCancel(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/${paramObj.id}/persion_cancel`;
  axios.post(apiUrl).then(function (response) {
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 人员同意组织邀请
 * @param paramObj  参数对象
 *         id        邀请id
 * @param callback  回调
 */
function personConfirm(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/${paramObj.id}/persion_confirm`;
  axios.post(apiUrl).then(function (response) {
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 根据组织全称完全匹配
 * @param paramObj      参数对象
 *         loginName 组织名称
 * @param callback  回调
 */
function get({}, cb) {
  const apiUrl = `${apiDomain}/org/self`;
  HTTP.get(apiUrl, {}, (success, error) => {
    cb(success, error);
  });
}

/**
 * 申请加入组织
 * @param paramObj  参数对象
 *         orgCode   组织
 * @param callback  回调
 */
function apply(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/${paramObj.orgCode}/apply`;
  axios.post(apiUrl).then(function (response) {
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

// 增加部门
function addDept(paramObj, callback) {
  HTTP.post(`${apiDomain}/dept/add`, paramObj, (success, error) => {
    callback(success, error);
  });
}

//编辑部门
function editDept(paramObj, callback) {
  HTTP.post(`${apiDomain}/dept/${paramObj.code}/edit`, paramObj, (success, error) => {
    callback(success, error);
  });
}

//删除部门
function deletedDept(paramObj, callback) {
  HTTP.post(`${apiDomain}/dept/${paramObj.code}/delete`, {}, (success, error) => {
    callback(success, error);
  });
}

//获取自身的部门列表
function getSelfDept(paramObj, callback) {
  HTTP.get(`${apiDomain}/dept/self/list`, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, applyCert, selfs, edit, personCancel, personConfirm, get, apply, addDept, editDept, deletedDept, getSelfDept };
