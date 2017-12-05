/**
 * Created by zyc on 2017/7/5.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiTruckDomain;

/**
 * 添加挂车
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/trailer/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑挂车
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/trailer/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取挂车列表
 * @param partnerName   伙伴名称
 * @param orgTagList    标签列表
 * @param mark          检索
 * @param page          页码
 * @param size          页长
 * @param callback      回调
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/trailer/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除伙伴
 * @param paramObj          参数对象
 *         partnerOrgCode    编码
 * @param callback          回调
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/trailer/${paramObj.code}/delete`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据伙伴编码获取伙伴详情
 * @param paramObj        参数对象
 *         partnerOrgCode
 * @param callback
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/trailer/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}
/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/trailer/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/trailer/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取车辆详情
 * @param callback
 */
function getDetail(callback) {
  const apiUrl = `${apiDomain}/detail_render_info/trailer/list`;
  // console.log(apiUrl);
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/trailer`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/trailer`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/trailer`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, deleted, get, getColumn, getSearch, getDetail, exportCsv, downloadErrorData, downloadTemplate };
