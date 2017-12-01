/**
 * Created by zhuyi on 17/5/2.
 */

const apiDomain = require('./ApiConst').apiDomain;
const apiOrgDomain = require('./ApiConst').apiOrgDomain;

import * as HTTP from './httpUtil';

/**
 * 注册用户
 */
function addUser(paramObj, cb) {
  const apiUrl = `${apiDomain}/account/add`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 验证用户是否存在
 */
function checkUser(paramObj, cb) {
  const apiUrl = `${apiDomain}/account/${paramObj.loginAccount}/validate`;
  HTTP.post(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 获取验证码
 */
function getValiCode(paramObj, cb) {
  const apiUrl = `${apiDomain}/account/send/verify_code`;
  HTTP.post(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 校验验证码
 */
function checkValiCode(paramObj, cb) {
  const apiUrl = `${apiDomain}/account/verify_code`;
  HTTP.post(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 校验邀请码
 */
function checkInviteCode(paramObj, cb) {
  const apiUrl = `${apiOrgDomain}/org/validate_invite_code`;
  HTTP.post(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 校验公司名称
 */
function checkOrgName(paramObj, cb) {
  const apiUrl = `${apiOrgDomain}/org/validate_unique`;
  HTTP.post(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 获取全部组织
 */
function getAll(paramObj, cb) {
  const apiUrl = `${apiOrgDomain}/org/all`;
  HTTP.get(apiUrl, {}, (response, error) => {
    cb(response, error);
  });
}

/**
 * 注册公司
 */
function addCompany(paramObj, cb) {
  const apiUrl = `${apiOrgDomain}/org/register`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 申请加入公司
 */
function joinCompany(paramObj, cb) {
  const apiUrl = `${apiOrgDomain}/org/${paramObj.code}/apply`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}


export { addUser, checkUser, getValiCode, checkValiCode, checkInviteCode, checkOrgName, getAll, addCompany, joinCompany };
