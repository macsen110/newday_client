import * as utils from './Utils';
import * as HTTP from './httpUtil';

const apiConst = require('./ApiConst');
const apiFreightDomain = apiConst.apiFreightDomain;
const apiWayBillDomain = apiConst.apiWayBillDomain;

/**
 * 获取货源接单记录列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight_accept_record/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 编辑货源
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight_accept_record/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取货源接单记录详情
 * @param paramObj        参数对象
 *         partnerOrgCode
 * @param callback
 */
function get(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight_accept_record/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiFreightDomain}/list_render_info/freight.accept.record/list`;
  HTTP.get(apiUrl, {}, (res) => {
    callback(res, null);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiFreightDomain}/search_render_info/freight.accept.record/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/export/freight.accept.record`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * batchSubmit
 * @param callback
 */
function batchSubmit(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight_accept_record/${paramObj.code}/dispatch`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * batchSubmit
 * @param callback
 */
function batchIgnored(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight_accept_record/${paramObj}/ignored`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/generator/freight.accept.record`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/download/template/freight.accept.record`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { list, edit, get, getColumn, getSearch, exportCsv, batchSubmit, batchIgnored, downloadErrorData, downloadTemplate };
