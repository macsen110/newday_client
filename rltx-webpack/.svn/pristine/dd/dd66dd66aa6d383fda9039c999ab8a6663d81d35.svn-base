/**
 * Created by zyc on 2017/7/4.
 */

import * as utils from './Utils';
import * as HTTP from './httpUtil';

const apiConst = require('./ApiConst');
const apiDomain = apiConst.apiOrgDomain;
const apiPersonDomain = apiConst.apiPersonDomain;

/**
 * 添加司机
 */
function add(paramObj, callback) {
  const apiUrl = `${apiPersonDomain}/person/driver/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑司机
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiPersonDomain}/person/driver/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取司机列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiPersonDomain}/person/driver/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiPersonDomain}/list_render_info/driver/list`;
  HTTP.get(apiUrl, {}, (res) => {
    callback(res, null);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiPersonDomain}/search_render_info/driver/list`;
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
  const apiUrl = `${apiPersonDomain}/person/driver/${paramObj.code}/get`;
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
  const apiUrl = `${apiConst.apiPersonDomain}/person/driver/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiConst.apiPersonDomain}/export/driver`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiConst.apiPersonDomain}/generator/driver`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiConst.apiPersonDomain}/download/template/driver`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, getColumn, getSearch, get, deleted, exportCsv, downloadErrorData, downloadTemplate };
