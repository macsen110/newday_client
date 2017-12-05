/**
 * Created by cc on 2017/6/30.
 */

import * as utils from './Utils';

const apiDomain = require('./ApiConst').apiWayBillDomain;

import * as HTTP from './httpUtil';

/**
 * 获取列表
 * @param routeTag      线路标签
 * @param mark          检索
 * @param page          页码
 * @param size          页长
 * @param callback      回调
 */
function list(paramObj, cb) {
  const apiUrl = `${apiDomain}/waybill_ticket_detail/list`;
  HTTP.get(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(cb) {
  const apiUrl = `${apiDomain}/list_render_info/ticket/list`;
  HTTP.get(apiUrl, {}, (res, error) => {
    cb(res, error);
  });
}

/**
 * 获取search数据
 * @param callback
 */
function getSearch(cb) {
  const apiUrl = `${apiDomain}/search_render_info/ticket/list`;
  HTTP.get(apiUrl, {}, (res, error) => {
    cb(res, error);
  });
}

/**
 * 删除
 * @param paramObj          参数对象
 *        code              编码
 * @param callback          回调
 */
function deleted(paramObj, cb) {
  const apiUrl = `${apiDomain}/waybill_ticket_detail/${paramObj.code}/delete`;
  HTTP.post(apiUrl, paramObj, (res) => {
    cb(res);
  });
}

/**
 * 添加
 * @param partnerName       简称
 * @param callback          回调
 */
function add(paramObj, cb) {
  const apiUrl = `${apiDomain}/waybill_ticket_detail/add`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 编辑
 * @param partnerName       简称
 * @param callback          回调
 */
function edit(code, paramObj, cb) {
  const apiUrl = `${apiDomain}/waybill_ticket_detail/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 根据编码获取详情
 * @param paramObj        参数对象
 *        code
 * @param callback
 */
function get(paramObj, cb) {
  const apiUrl = `${apiDomain}/waybill_ticket_detail/${paramObj.code}/get`;
  delete paramObj.code;
  HTTP.get(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/ticket`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/ticket`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/ticket`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { list, getColumn, getSearch, deleted, add, edit, get, exportCsv, downloadErrorData, downloadTemplate };
