
import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiMaintenaceDomain;

/**
 * 添加保养记录
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_care_record/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑保养记录
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_care_record/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取保养记录列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_care_record/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除保养记录
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_care_record/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据保养记录id获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_care_record/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/care/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/care/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取保养记录详情
 * @param callback
 */
function getDetail(callback) {
  const apiUrl = `${apiDomain}/detail_render_info/care/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/care`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/care`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/care`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, deleted, get, getColumn, getSearch, getDetail, exportCsv, downloadErrorData, downloadTemplate };
