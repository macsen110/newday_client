import * as utils from './Utils';
import * as HTTP from './httpUtil';

const apiConst = require('./ApiConst');
const apiDomain = apiConst.apiOrgDomain;
const apiFreightDomain = apiConst.apiFreightDomain;

/**
 * 添加货源
 */
function add(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑货源
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

//添加业务动作
function addAction(code, actionCode, paramObj, nullArray, callback) {
  const apiUrl = `${apiFreightDomain}/freight/${code}/execute/${actionCode}`;
  HTTP.postJson(apiUrl, { 'params': paramObj }, (success, error) => {
    callback(success, error);
  });
}

/**
 * 刷新货源
 */
function refresh(code, paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight/${code}/refresh`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 结束发布
 */
function close(code, paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight/${code}/close`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取货源列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiFreightDomain}/list_render_info/freight/list`;
  HTTP.get(apiUrl, {}, (res) => {
    callback(res, null);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiFreightDomain}/search_render_info/freight/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据伙伴编码获取车辆详情
 * @param paramObj        参数对象
 *         partnerOrgCode
 * @param callback
 */
function get(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/freight/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除车辆
 * @param paramObj          参数对象
 *         partnerOrgCode    编码
 * @param callback          回调
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiConst.apiFreightDomain}/freight/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/export/freight`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/generator/freight`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiFreightDomain}/download/template/freight`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, addAction, refresh, close, list, getColumn, getSearch, get, deleted, exportCsv, downloadErrorData, downloadTemplate };
