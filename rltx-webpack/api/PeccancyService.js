
import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiMaintenaceDomain;

/**
 * 添加违章记录
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_peccancy_record/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑违章记录
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_peccancy_record/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取违章记录列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_peccancy_record/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除违章记录
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_peccancy_record/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据违章记录id获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_peccancy_record/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/peccancy/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/peccancy/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取违章记录详情
 * @param callback
 */
function getDetail(callback) {
  const apiUrl = `${apiDomain}/detail_render_info/peccancy/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/peccancy`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/peccancy`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/peccancy`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, deleted, get, getColumn, getSearch, getDetail, exportCsv, downloadErrorData, downloadTemplate };
