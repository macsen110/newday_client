/**
 * Created by cc on 17/8/14.
 */

// import * as utils from './Utils';

const axios = require('axios');

axios.defaults.withCredentials = true;

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiLbsDomain;

/**
 * 获取围栏记录列表字段
 */
function getColumn(callback) {
  const success = { 
    code: 200,
    content: [
      {
        showName: '围栏名称',
        fieldConfigCode: 'polygonName',
        elementCode: 'label',
        extraParams: '{"field1": "polygonName", "required": "false"}'
      },
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'label',
        extraParams: '{"field1": "truckLicenseNo", "required": "false"}'
      },
      {
        showName: '时间',
        fieldConfigCode: 'accessTime',
        elementCode: 'label',
        extraParams: '{"field1": "accessTime", "required": "false"}'
      },
      {
        showName: '进出类型',
        fieldConfigCode: 'accessType',
        elementCode: 'label',
        extraParams: '{"field1": "accessType", "required": "false"}'
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
        showName: '围栏名称',
        fieldConfigCode: 'polygonName',
        elementCode: 'text',
        extraParams: '{"field1": "polygonName", "placeholder1":"请输入围栏名称"}'
      },
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'text',
        extraParams: '{"field1": "truckLicenseNo", "placeholder1":"请输入车牌号"}'
      },
      {
        showName: '时间',
        fieldConfigCode: 'accessTime',
        elementCode: 'dateRange',
        extraParams: '{"field1":"beginTime","field3":"endTime","format1":"yyyy-MM-dd hh:mm:ss","format3":"yyyy-MM-dd hh:mm:ss","default2":"到"}'
      },
      {
        showName: '类型',
        fieldConfigCode: 'accessType',
        elementCode: 'select',
        extraParams: '{"field1":"accessType","optionsValue1":["1","2"],"options1":["进入围栏","离开围栏"]}'
      }
    ]
  };
  callback(success);
  return success;
}

/**
 * 获取围栏出入记录信息
 */
function list(paraObj, cb) {
  const apiUrl = `${apiDomain}/lbs/polygon_access_log/list`;;
  HTTP.get(apiUrl, paraObj, (response, error) => {
    cb(response, error);
  });
}

export { getColumn, getSearch, list };
