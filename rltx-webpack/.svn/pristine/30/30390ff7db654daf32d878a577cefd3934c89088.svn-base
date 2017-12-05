
import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiMaintenaceDomain;

/**
 * 添加车辆轮胎
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_tyre_record/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑车辆轮胎
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_tyre_record/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取车辆轮胎列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_tyre_record/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除车辆轮胎
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_tyre_record/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据车辆轮胎id获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/maintenance_tyre_record/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/tyre/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/tyre/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取车辆轮胎详情
 * @param callback
 */
function getDetail(callback) {
  const apiUrl = `${apiDomain}/detail_render_info/tyre/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/tyre`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/tyre`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/tyre`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, deleted, get, getColumn, getSearch, getDetail, exportCsv, downloadErrorData, downloadTemplate };
