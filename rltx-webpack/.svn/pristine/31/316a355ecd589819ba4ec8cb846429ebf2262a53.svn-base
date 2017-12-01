/**
 * Created by cc on 2017/10/18.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiOprLbsDomain,
  apiPlatformDomain = require('./ApiConst').apiPlatformDomain;

/**
 * 添加设备绑定
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/opr-lbs/device/bind`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑设备绑定
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/opr-lbs/device/bind/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 设备绑定列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/opr-lbs/device/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 设备使用单位数据源
 */
function orgList(callback) {
  const apiUrl = `${apiPlatformDomain}/cert_org/org/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 设备厂商列表数据源
 */
function manufactoryList(callback) {
  const apiUrl = `${apiDomain}/opr-lbs/provider/list`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除设备绑定
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/opr-lbs/device/disabled/${paramObj.code}`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据设备绑定编码获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/opr-lbs/device/detail/${paramObj.code}`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取设备绑定列表字段
 */
function getColumn(callback) {
  const success = {
    code: 200,
    content: [
      {
        showName: '使用单位',
        fieldConfigCode: 'orgName',
        elementCode: 'label',
        extraParams: '{"field1": "orgName", "required": "false"}'
      },
      {
        showName: '融链设备名称',
        fieldConfigCode: 'deviceName',
        elementCode: 'label',
        extraParams: '{"field1": "deviceName", "required": "false", "detailLinkVisiable":"true"}'
      },
      {
        showName: '融链设备编号',
        fieldConfigCode: 'deviceCode',
        elementCode: 'text',
        extraParams: '{"field1": "deviceCode", "required": "true"}'
      },
      {
        showName: 'SIM卡号',
        fieldConfigCode: 'simCardNo',
        elementCode: 'label',
        extraParams: '{"field1": "simCardNo", "required": "false"}'
      },
      {
        showName: '设备厂商',
        fieldConfigCode: 'providerName',
        elementCode: 'label',
        extraParams: '{"field1": "providerName", "required": "false"}'
      },
      {
        showName: '录入日期',
        fieldConfigCode: 'createTime',
        elementCode: 'label',
        extraParams: '{"field1": "createTime", "required": "false"}'
      }
    ]
  };
  callback(success);
  return success;
}

/**
 * 获取搜索字段
 */
function getSearch(callback) {
  const success = {
    code: 200,
    content: [
      {
        showName: '融链设备名称',
        fieldConfigCode: 'deviceName',
        elementCode: 'text',
        extraParams: '{"field1": "deviceName", "placeholder1":"请输入融链设备名称"}'
      },
      {
        showName: '融链设备编号',
        fieldConfigCode: 'deviceCode',
        elementCode: 'text',
        extraParams: '{"field1": "deviceCode", "placeholder1":"请输入融链设备编号"}'
      },
      {
        showName: 'SIM卡号',
        fieldConfigCode: 'simCardNo',
        elementCode: 'text',
        extraParams: '{"field1": "simCardNo", "placeholder1":"请输入SIM卡号"}'
      },
      {
        showName: '使用单位',
        fieldConfigCode: 'orgName',
        elementCode: 'text',
        extraParams: '{"field1": "orgName", "placeholder1":"请输入使用单位"}'
      },
      {
        showName: '设备厂商',
        fieldConfigCode: 'providerName',
        elementCode: 'text',
        extraParams: '{"field1": "providerName", "placeholder1":"请输入设备厂商"}'
      },
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

export { add, edit, list, orgList, manufactoryList, deleted, get, getColumn, getSearch, getDetail };
