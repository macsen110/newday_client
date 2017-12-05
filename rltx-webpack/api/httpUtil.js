import * as Utils from './Utils.js'
const axios = require('axios'),
  code = {
    success: 200,
    forbid: 401,
    noUse: 403
  };
axios.defaults.withCredentials = true;
function showError(response, url) {
  console.error('error code: ' + response.code);
  console.error('error url: ' + url);
  console.error('error message: ' + response.content);
}
function matchRight (res) {
  if ( res.status === code.forbid || res.data.code === code.forbid ) {
    return true;
  } else {
    return false;
  }
}
function goBack(res) {
  if (matchRight(res)) {
    window.parent.location.href = '/login/login.html';
  }
}
function get(url, paramsObj, callback) {
  const len = Object.keys(paramsObj).length,
    getUrl = len > 0 ? `${url}?${Utils.objToParamStr(paramsObj)}` : `${url}`;
  axios.get(getUrl).then((res) => {
    goBack(res);
    const response = res.data;
    if (callback && response.code === code.success) {
      callback(response, null);
    } else {
      showError(response, url);
      callback(null, response);
      // alert(response.code);
      return false;
    }
  }).catch((err) => {
  	console.error(err);
    callback(null, err);
  });
}

function post(url, paramsObj, callback) {
  const obj = Array.isArray(paramsObj) ? paramsObj : Utils.objToParamStr(paramsObj);
  axios.post(url, obj, {
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  }).then((res) => {
    goBack(res);
    const response = res.data;
    if (callback && response.code === code.success) {
      callback(response, null);
    } else {
      showError(response, url);
      callback(null, response);
      // alert(response.content);
      return false;
    }
  }).catch((err) => {
  	console.error(err);
    callback(null, err);
  });
}

function postJson(url, paramsObj, callback) {
  axios.post(url, paramsObj).then((res) => {
    const response = res.data;
    if (callback && response.code === code.success) {
      callback(response, null);
    } else {
      showError(response, url);
      callback(null, response);
      return false;
    }
  }).catch((err) => {
    console.error(err);
    callback(null, err);
  });
}

export {get, post, postJson};
