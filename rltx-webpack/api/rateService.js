/**
 * Created by cc on 2017/6/30.
 */

import * as utils from './Utils';
import * as HTTP from './httpUtil';

const apiConst = require('./ApiConst'),
  apiDomain = apiConst.apiLineDomain;


/**
 * 获取运价列表
 * @param rateTag      运价标签
 * @param mark          检索
 * @param page          页码
 * @param size          页长
 * @param callback      回调
 */
// function list(paramObj, cb) {
//   const apiUrl = `${apiDomain}/resource/rates/list`;
//   HTTP.get(apiUrl, paramObj, (response, error) => {
//     cb(response, error);
//   });
// }
function list(paramObj, cb) {
  //GET /logistics/rate_code/list
  const apiUrl = `${apiConst.apiLogisticsDomain}/logistics/rate_code/list`;
  HTTP.get(apiUrl, paramObj, (response, error) => {
    if (error) { cb(null, error); }
    else {
      const codeList = [];
      response.content.forEach((item) => {
        codeList.push(item.rateCode);
      });
      HTTP.get(`${apiDomain}/resource/rates/list`, { code: codeList.join(','), page: 1, size: paramObj.size }, (rep, err) => {
        if (rep && rep.content && rep.total) {
          rep.content.forEach((rate) => {
            const rel = response.content.find(rel => rel.rateCode === rate.code);
            if (rel) {
              rate.clientOrgCode = rel.clientOrgCode;
              rate.clientOrgName = rel.clientOrgName;
              rate.logisticsCode = rel.logisticsCode;
              rate.logisticsNo = rel.logisticsNo;
            }
          });
          rep.total = response.total;
        }
        cb(rep, err);
      });
    }
  });
}

function ratesList(paramObj, cb) {
  const apiUrl = `${apiDomain}/resource/rates/logistics_change_log/${paramObj.code}/list`;
  HTTP.get(apiUrl, paramObj, (response, error) => {
    cb(response, error);
  });
}
function getLogisticRatesColumn(cb) {
  const columnsData = [
    {
      showName: '客户运价',
      fieldConfigCode: 'clientFreightRate',
      elementCode: 'clientFreightPrice',
      extraParams: '{"field1":"clientFreightRate","field2":"clientFreightRateUnitCode","checkRule1":"[0-9]{1,10}(\\\\.[0-9]{0,2})?","checkMsg1":"不超过13位（最多2位小数）","required":"true","detailLinkVisiable":"false","maxLength1":"13","placeholder1":"请输入客户运价"}'
    },
    {
      showName: '司机参考运价',
      fieldConfigCode: 'driverReferencePrice',
      elementCode: 'driverPrice',
      extraParams: '{"field1":"driverReferencePrice","field2":"driverReferencePriceUnitCode","checkRule1":"[0-9]{1,10}(\\\\.[0-9]{0,2})?","checkMsg1":"不超过13位（最多2位小数）","required":"false","detailLinkVisiable":"false","maxLength1":"13","placeholder1":"请输入司机运价"}'
    },
    {
      showName: '货物单价',
      fieldConfigCode: 'goodsUnitPrice',
      elementCode: 'goodsPrice',
      extraParams: '{"field1":"goodsPrice","field2":"goodsPriceUnitCode","checkRule1":"[0-9]{1,10}(\\\\.[0-9]{0,2})?","checkMsg1":"不超过13位（最多2位小数）","required":"false","detailLinkVisiable":"false","maxLength1":"13","placeholder1":"请输入货物单价"}'
    },
    {
      showName: '合理货差系数',
      fieldConfigCode: 'goodsLossMethod',
      elementCode: 'goodsLoss',
      extraParams: '{"field1":"goodsLossMethod","field2":"goodsLoss","field3":"goodsLossUnitCode","checkRule2":"[0-9]{1,10}(\\\\.[0-9]{0,4})?","checkMsg2":"不超过15位（最多4位小数）","required":"false","detailLinkVisiable":"false","maxLength2":"15","placeholder2":"请输入合理货差系数","optionsValue1":["goods.loss","goods.loss.ration"],"options1":["按量","按系数"]}'
    },
    {
      showName: '操作人',
      fieldConfigCode: 'updateUsername',
      elementCode: 'label',
      extraParams: '{"field1":"updateUsername","required":"false","detailLinkVisiable":"false"}'
    },
    {
      showName: '调整时间',
      fieldConfigCode: 'updateTime',
      elementCode: 'label',
      extraParams: '{"field1":"updateTime","format1":"yyyy-MM-dd HH:mm:ss","required":"false","detailLinkVisiable":"false"}'
    }
  ];
  cb({content:columnsData});
}
/**
 * 获取table头部数据
 * @param callback
 */
function getColumn(cb) {
  const apiUrl = `${apiDomain}/list_render_info/rates/list`;
  HTTP.get(apiUrl, {}, (res, error) => {
    cb(res, error);
  });
}

/**
 * 获取search数据
 * @param callback
 */
function getSearch(cb) {
  const apiUrl = `${apiDomain}/search_render_info/rates/list`;
  HTTP.get(apiUrl, {}, (res, error) => {
    cb(res, error);
  });
}

/**
 * 删除运价
 * @param paramObj          参数对象
 *        code              编码
 * @param callback          回调
 */
function deleted(paramObj, cb) {
  const apiUrl = `${apiDomain}/resource/rates/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    cb(success, error);
  });
}

/**
 * 添加运价
 * @param partnerName       简称
 * @param callback          回调
 */
function add(paramObj, cb) {
  const apiUrl = `${apiDomain}/resource/rates/add`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 编辑运价
 * @param partnerName       简称
 * @param callback          回调
 */
function edit(code, paramObj, cb) {
  const apiUrl = `${apiDomain}/resource/rates/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * 根据运价编码获取运价详情
 * @param paramObj        参数对象
 *        code
 * @param callback
 */
function get(paramObj, cb) {
  const apiUrl = `${apiDomain}/resource/rates/${paramObj.code}/info`;
  HTTP.get(apiUrl, paramObj, (res, error) => {
    cb(res, error);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiDomain}/export/rates`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiDomain}/generator/rates`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiDomain}/download/template/rates`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { list, ratesList, getColumn, getLogisticRatesColumn, getSearch, deleted, add, edit, get, exportCsv, downloadErrorData, downloadTemplate };
