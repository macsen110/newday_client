/**
 * Created by cc on 2017/7/5.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiTruckDomain;

/**
 * 添加车辆附件
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/truck_attachment/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑车辆附件
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/truck_attachment/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 车辆附件列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/truck_attachment/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除车辆附件
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/truck_attachment/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据车辆附件编码获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/truck_attachment/${paramObj.code}/get`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取围栏记录列表字段
 */
function getColumn(callback) {
  const success = {
    code: 200,
    content: [
      {
        showName: '证照名称',
        fieldConfigCode: 'attachmentName',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentName", "required": "false"}'
      },
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'selectTruck',
        extraParams: '{"field1":"truckLicenseNo","field2":"truckCode","required":"true","maxLength1":"20","placeholder1":"请输入车牌号","outputKey1":"truck","inputKey2":"truck.code"}'
      },
      {
        showName: '证照类型',
        fieldConfigCode: 'attachmentTypeCode',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentTypeCode", "required": "false"}'
      },
      {
        showName: '证件号',
        fieldConfigCode: 'attachmentNo',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentNo", "required": "false"}'
      },
      {
        showName: '发证日期',
        fieldConfigCode: 'attachmentIssuanceDate',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentIssuanceDate", "required": "false"}'
      },
      {
        showName: '到期日期',
        fieldConfigCode: 'attachmentExpirationDate',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentExpirationDate", "required": "false"}'
      },
      {
        showName: '提醒日期',
        fieldConfigCode: 'attachmentRemindDate',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentRemindDate", "required": "false"}'
      },
      {
        showName: '相关附件',
        fieldConfigCode: 'attachmentResourceCode',
        elementCode: 'image',
        extraParams: '{"field1": "attachmentResourceCode", "required": "false"}'
      },
      {
        showName: '认证状态',
        fieldConfigCode: 'attachmentCertStatus',
        elementCode: 'label',
        extraParams: '{"field1": "attachmentCertStatus", "required": "false"}'
      },
      {
        showName: '描述',
        fieldConfigCode: 'description',
        elementCode: 'label',
        extraParams: '{"field1": "description", "required": "false"}'
      }
    ]
  };
  callback(success);
  return success;
}

/**
 * 获取围栏记录搜索字段
 */
function getSearch(callback) {
  const success = {
    code: 200,
    content: [
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'text',
        extraParams: '{"field1": "truckLicenseNo", "placeholder1":"请输入车牌号"}'
      }
    ]
  };
  callback(success);
  return success;
}

/**
 * 获取围栏记录搜索字段
 */
function getDetail(callback) {
  const success = {
    code: 200,
    data: {
      content: [
        {
          showName: '附件名称',
          fieldConfigCode: 'attachmentName',
          elementCode: 'text',
          extraParams: '{"field1": "attachmentName", "placeholder1":"请输入车牌号"}'
        },
        {
          showName: '车牌号',
          fieldConfigCode: 'truckLicenseNo',
          elementCode: 'text',
          extraParams: '{"field1": "truckLicenseNo", "placeholder1":"请输入车牌号"}'
        }
      ]
    }
  };
  callback(success);
  return success;
}

export { add, edit, list, deleted, get, getColumn, getSearch, getDetail };
