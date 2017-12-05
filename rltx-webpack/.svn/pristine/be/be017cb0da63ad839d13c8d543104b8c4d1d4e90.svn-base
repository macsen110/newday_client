/**
 * 运力服务
 * Created by zyc on 2017/7/6.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiTransportDomain;

/**
 * 添加运力
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/transport/add`;
  // axios.post(apiUrl, utils.objToParamStr(paramObj), {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //   }
  // }).then((res) => {
  //   const response = res.data;
  //   // console.log(response);
  //   if (callback && response.code === code.success) {
  //     callback(response, null);
  //   } else {
  //     console.error('error code: ' + response.code);
  //     console.error('error url: ' + url);
  //     console.error('error message: ' + response.content);
  //     callback(null, response);
  //     // alert(response.content);
  //     return false;
  //   }
  // }).catch((err) => {
  //   console.error('url:',apiUrl,'paramObj:',paramObj);
  //   console.error(err);
  // });
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  })
}

/**
 * 编辑运力
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/transport/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取运力列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/transport/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除运力
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/transport/${paramObj.code}/delete`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据伙伴编码获取伙伴详情
 * @param paramObj        参数对象
 *         transportOrgCode
 * @param callback
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/transport/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}
/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(callback) {
  const apiUrl = `${apiDomain}/list_render_info/transport/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取serach数据
 * @param callback
 */
function getSearch(callback) {
  const apiUrl = `${apiDomain}/search_render_info/transport/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取伙伴详情
 * @param callback
 */
function getDetail(callback) {
  const apiUrl = `${apiDomain}/detail_render_info/transport/list/`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/transport`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/transport`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/transport`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { add, edit, list, deleted, get, getColumn, getSearch, getDetail, exportCsv, downloadErrorData, downloadTemplate };
