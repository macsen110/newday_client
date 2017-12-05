/**
 * Created by cc on 2017/10/9.
 */

import * as HTTP from './httpUtil';

const apiConst = require('./ApiConst');
const apiLogisticsDomain = apiConst.apiLogisticsDomain;

/**
 * 添加合约
 */
function add(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics_contract/add`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    callback(res, error);
  });
}

/**
 * 编辑合约
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics_contract/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取合约列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics_contract/list`;
  // console.log(apiUrl);
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiLogisticsDomain}/list_render_info/logisticsContract/list`;
  HTTP.get(apiUrl, {}, (res) => {
    callback(res, null);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiLogisticsDomain}/search_render_info/logisticsContract/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据编码获取详情
 * @param paramObj        参数对象
 *         partnerOrgCode
 * @param callback
 */
function get(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics_contract/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除
 * @param paramObj          参数对象
 *         partnerOrgCode    编码
 * @param callback          回调
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/logistics_contract/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/export/logisticsContract`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/generator/logisticsContract`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiLogisticsDomain}/download/template/logisticsContract`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, getColumn, getSearch, get, deleted, exportCsv, downloadErrorData, downloadTemplate };
