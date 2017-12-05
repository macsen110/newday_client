/**
 * LogisticsService.js
 * Created by dsky on 17/7/6.
 */

import * as utils from './Utils';
import * as HTTP from './httpUtil';
const axios = require('axios');
const apiLogisticsDomain = require('./ApiConst').apiLogisticsDomain;
axios.defaults.withCredentials = true;

// 获取列表数据
function list(paramObj, cb) {
  const apiUrl = `${apiLogisticsDomain}/logistics/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}

// 获取列表操作
function getAction(paramObj, cb) {
  const apiUrl = `${apiLogisticsDomain}/logistics/action/list`;
  HTTP.post(apiUrl, { 'logisticsCodeList': paramObj }, (response, err) => {
    cb(response, err);
  });
}

// 获取头部搜索字段配置
function getSearch(cb) {
  const apiUrl = `${apiLogisticsDomain}/search_render_info/logistics/list`;
  HTTP.get(apiUrl, {}, (response, err) => {
    cb(response, err);
  });
}

// 删除数据
function deleted(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

// 获取列表显示字段
function getColumn(cb) {
  const apiUrl = `${apiLogisticsDomain}/list_render_info/logistics/list`;
  HTTP.get(apiUrl, {}, (response, err) => {
    cb(response, err);
  });
}
// 添加
function add(paramObj, cb) {
  const apiUrl = `${apiLogisticsDomain}/logistics/add`;
  // console.log(apiUrl);
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}
// 获取信息
function get(paramObj, callback) {
  const url = `${apiLogisticsDomain}/logistics/${paramObj.code}/get`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

//编辑
function edit(code, paramObj, cb) {
  const apiUrl = `${apiLogisticsDomain}/logistics/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}

//添加业务动作
function addAction(code, actionCode, paramObj, nullArray, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics/${code}/execute/${actionCode}`;
  HTTP.postJson(apiUrl, { 'params': paramObj }, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/export/logistics`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/generator/logistics`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/download/template/logistics`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}
// 运价关联订单
function rateBindLogistic(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics/rate/${paramObj.code}/${paramObj.ratesCode}/relation`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}
// 删除订单运价关联
function deleteLogisticRateRelation(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics/rate/${paramObj.code}/${paramObj.ratesCode}/relation/delete`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}
// 运价选中
function rateSelect(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics/rate/${paramObj.code}/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { list, getAction, deleted, getSearch, getColumn, add, edit, get, addAction, exportCsv, downloadErrorData, downloadTemplate, rateBindLogistic, deleteLogisticRateRelation, rateSelect };
