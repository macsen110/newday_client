/**
 * waybillService.js
 * Created by dsky on 17/7/5.
 */

import * as utils from './Utils';
import * as HTTP from './httpUtil';

const axios = require('axios');
const apiWayBillDomain = require('./ApiConst').apiWayBillDomain;
const code = {
  success: 200
};
axios.defaults.withCredentials = true;

// 获取列表数据
function list(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/list`;
  HTTP.get(apiUrl, paramObj, (res, err) => {
    cb(res, err);
  });
}

// 获取费用列表数据
function settleList(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill_settle/list`;
  HTTP.get(apiUrl, paramObj, (res, err) => {
    cb(res, err);
  });
}

// 获取列表操作
function getAction(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/action/list`;
  HTTP.post(apiUrl, { 'waybillCodeList': paramObj.join(',') }, (res, err) => {
    cb(res, err);
  });
}

// 获取订单车辆列表
function getLogisticsTruckList(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/logistics/${paramObj.code}/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 获取头部搜索字段配置
function getSearch(cb) {
  const apiUrl = `${apiWayBillDomain}/search_render_info/waybill/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 获取费用列表头部搜索字段配置
function getSettleSearch(cb) {
  const apiUrl = `${apiWayBillDomain}/search_render_info/settle/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 删除数据
function deleteList(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 删除费用列表数据
function deleteSettleList(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill_settle/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 获取列表显示字段
function getColumn(cb) {
  const apiUrl = `${apiWayBillDomain}/list_render_info/waybill/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 获取费用列表显示字段
function getSettleColumn(cb) {
  const apiUrl = `${apiWayBillDomain}/list_render_info/settle/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 添加
function add(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/add`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}
// 获取信息
function get(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${paramObj.code}/info`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
//编辑
function edit(code, paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/edit`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}
function executeActionWithRecordCode(waybillCode, actionCode, actionRecordCode, actionParams, chargeParamList, cb) {
  let params = {};
  if (actionParams) {
    Object.keys(actionParams).forEach((propertyName) => {
      params[propertyName] = actionParams[propertyName];
    });
  }
  if (chargeParamList && chargeParamList.length) {
    chargeParamList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key in params) {
          params[key] = `${params[key]},${item[key]}`;
        } else {
          params[key] = `${item[key]}`;
        }
      });
    });
  }
  const apiUrl = `${apiWayBillDomain}/waybill/${waybillCode}/execute/${actionCode}/record/${actionRecordCode}`;
  HTTP.post(apiUrl, params, (response, err) => {
    cb(response, err);
  });
}
/**
 * 执行业务动作
 * @param waybillCode 运单编码
 * @param actionCode 业务动作编码
 * @param actionParams 业务动作参数
 * @param chargeParamList 费用记录参数
 * @param cb 回调函数（响应，错误）
 */
function executeAction(waybillCode, actionCode, actionParams, chargeParamList, cb) {
  let params = {};
  if (actionParams) {
    Object.keys(actionParams).forEach((propertyName) => {
      params[propertyName] = actionParams[propertyName];
    });
  }
  if (chargeParamList && chargeParamList.length) {
    chargeParamList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key in params) {
          params[key] = `${params[key]},${item[key]}`;
        } else {
          params[key] = `${item[key]}`;
        }
      });
    });
  }
  const apiUrl = `${apiWayBillDomain}/waybill/${waybillCode}/execute/${actionCode}`;
  HTTP.post(apiUrl, params, (response, err) => {
    cb(response, err);
  });
}

function addAction(paramObj, tableList, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${paramObj.code}/execute/${paramObj.actionCode}`;
  HTTP.post(apiUrl, { 'params': paramObj, 'chargeRecordList': tableList }, (response, err) => {
    cb(response, err);
  });
}
function getChargeDefine(code, cb) {
  //GET /waybill/{code}/accounting/charge/define/list
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/accounting/charge/define/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
function getCharge(code, action, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/accounting/charge/record/list?actionCode=${action}`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
function getActionRecord(code, actionCode, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/action/record/list?actionCode=${actionCode}`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
function getActionRecordWithParams(code, paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/action/record/list`;
  HTTP.get(apiUrl, paramObj, (res, err) => {
    cb(res, err);
  });
}
function deleteActionRecord(code, actionCode, actionRecordCode, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/del/${actionCode}/record/${actionRecordCode}`;
  HTTP.post(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
// 运单结算费用记录
function getSettleList(code, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/accounting/charge/record/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
// 运单行车记录
function getDriverList(code, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/driving/record/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}
function addSettle(settle, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/update/settle/info`;
  HTTP.post(apiUrl, settle, (response, err) => {
    cb(response, err);
  });
}
function editSettle(code, settle, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/update/settle/info`;
  settle.code = code;
  HTTP.post(apiUrl, settle, (response, err) => {
    cb(response, err);
  });
}
function addDriver(code, settle, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/update/driving/record`;
  let obj = {};
  settle.forEach((value) => {
    Object.keys(value).forEach((key) => {
      if (key in obj) {
        obj[key] += ',' + value[key];
      } else {
        obj[key] = value[key];
      }
    });
  });
  obj.code = code;
  HTTP.post(apiUrl, obj, (response, err) => {
    cb(response, err);
  });
}
function addRecord(code, settle, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/update/accounting/charge/record`;
  let obj = {},
    settleData = [];
  settle.forEach(val => {
    if (val.chargeAmounts) {
      settleData.push(val);
    }
  });
  if (settleData.length) {
    settleData.forEach((value) => {
      Object.keys(value).forEach((key) => {
        if (value[key] instanceof Array && value[key].length > 1) {
          value[key] = value[key].join(':');
        }
        if (key in obj) {
          obj[key] += ',' + value[key];
        } else {
          obj[key] = value[key];
        }
      });
    });
  }
  HTTP.post(apiUrl, obj, (response, err) => {
    cb(response, err);
  });
}
// 运单业务动作操作记录列表
function getSettleAction(code, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/action/record/list`;
  HTTP.get(apiUrl, {}, (res, err) => {
    cb(res, err);
  });
}

// 获取运费总金额
function getTotalAmount(code, model, record, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${code}/calculate`;
  let obj = {},
    recordData = [];
  if (record && model) {
    Object.keys(model).forEach((key) => {
      if (key) {
        // console.log('key: ', key);
        obj[key] = model[key];
      }
    });
    record.forEach(val => {
      if (!isNaN(val.chargeAmounts)) {
        recordData.push(val);
      }
    });
    if (recordData.length) {
      recordData.forEach((value) => {
        Object.keys(value).forEach((key) => {
          if (key in obj) {
            obj[key] += ',' + value[key];
          } else {
            obj[key] = value[key];
          }
        });
      });
    }
  }
  HTTP.post(apiUrl, obj, (response, err) => {
    cb(response, err);
  });
}

function saveSettle(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/waybill/${paramObj.code}/settle`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}

/**
 * export
 * @param callback
 */
function exportCsv(paramObj, callback) {
  const apiUrl = `${apiWayBillDomain}/export/waybill`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载错误数据的CSV文件
 */
function downloadErrorData(paramObj, callback) {
  const apiUrl = `${apiWayBillDomain}/generator/waybill`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 下载CSV模板
 */
function downloadTemplate(paramObj, callback) {
  const apiUrl = `${apiWayBillDomain}/download/template/waybill`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 运单上报
 * @param paramObj
 * @param cb
 */
function waybillReport(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/report`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}

/**
 * 校验车牌
 * @param paramObj
 * @param cb
 */
function validateTruckLicenseNo(paramObj, cb) {
  const apiUrl = `${apiWayBillDomain}/validateTruckLicenseNo`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    cb(response, err);
  });
}

// 获取图片url
function getImgUrl(resourceCode, callback) {
  const apiUrl = `${apiWayBillDomain}/fw/image/${resourceCode}/get`,
    paramObj = {
      resourceCode
    };
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { executeAction, executeActionWithRecordCode, list, settleList, getAction, getActionRecord, getActionRecordWithParams,
  getSearch, getSettleSearch, deleteList, deleteSettleList, getColumn, getSettleColumn, add, edit, get, addAction,
  getCharge, getChargeDefine, getSettleList, addSettle, editSettle, getSettleAction, getDriverList, addDriver, addRecord, getTotalAmount,
  saveSettle, exportCsv, downloadErrorData, downloadTemplate, waybillReport, validateTruckLicenseNo, getLogisticsTruckList,
  getImgUrl, deleteActionRecord };
