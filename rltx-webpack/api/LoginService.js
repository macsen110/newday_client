/**
 * Created by zhuyi on 17/5/2.
 */

import * as apiConst from './ApiConst';
import * as HTTP from './httpUtil';

const axios = require('axios');
axios.defaults.withCredentials = true;

/**
 * 登录方法
 *
 * @param account 账户
 * @param password 密码
 * @param callback 回调方法
 */
function login(account, password, callback) {
  const url = `${apiConst.BaseDomain}/login`;
  HTTP.post(url, {
  	account,
  	password
  }, (success, error) => {
    callback(success, error);
  });
}

/**
 * 登出方法
 */
function logout(callback) {
  const url = `${apiConst.BaseDomain}/logout`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

export { login, logout };
