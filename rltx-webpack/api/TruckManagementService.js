/**
 * Created by cc on 2017/10/24.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiPlatformDomain;

/**
 * 车辆管理列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/truck/manager/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据车辆管理编码获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/truck/manager/detail/${paramObj.code}`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取列表字段
 */
function getColumn(callback) {
  const success = { 
    code: 200,
    content: [
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'label',
        extraParams: '{"field1": "truckLicenseNo", "required": "false", "detailLinkVisiable":"true"}'
      },
      {
        showName: '所属公司',
        fieldConfigCode: 'ownerOrgName',
        elementCode: 'selectPartner',
        extraParams: '{"field1": "ownerOrgName", "field2":"ownerOrgCode", "outputKey1":"partner","inputKey2":"partner.code"}'
      },
      {
        showName: '是否加入黑名单',
        fieldConfigCode: 'blacklist',
        elementCode: 'label',
        extraParams: '{"field1":"blacklist", "required": "false"}'
      },
      {
        showName: '认证状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'label',
        extraParams: '{"field1":"certStatus", "required": "false", "optionsValue1":["unauthenticated","authenticating","authenticated","failed"],"options1":["未认证","认证中","认证成功","认证失败"]}'
      },
      {
        showName: '动力类型',
        fieldConfigCode: 'powerType',
        elementCode: 'select',
        extraParams: '{"field1":"powerType","optionsValue1":["oil","gas"],"options1":["油车","气车"]}'
      },
      {
        showName: '车型',
        fieldConfigCode: 'truckModelCode',
        elementCode: 'truckModel',
        extraParams: '{"field1":"truckModelCode","field2":"truckModelName","required":"false"}'
      },
      {
        showName: '载重',
        fieldConfigCode: 'regTonnage',
        elementCode: 'regTonnage',
        extraParams: '{"field1":"regTonnage","field2":"regTonnageUnitCode","required":"false"}'
      },
      {
        showName: '车长',
        fieldConfigCode: 'truckLength',
        elementCode: 'truckSize',
        extraParams: '{"field1":"truckLength","field2":"truckLengthUnitCode", "required": "false"}'
      },
      {
        showName: '认证人',
        fieldConfigCode: 'auditUserFullname',
        elementCode: 'label',
        extraParams: '{"field1": "auditUserFullname", "required": "false"}'
      },
      {
        showName: '认证时间',
        fieldConfigCode: 'auditTime',
        elementCode: 'label',
        extraParams: '{"field1": "auditTime", "required": "false"}'
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
        showName: '是否加入黑名单',
        fieldConfigCode: 'blacklist',
        elementCode: 'select',
        extraParams: '{"field1": "blacklist"}'
      },
      {
        showName: '所属公司',
        fieldConfigCode: 'ownerOrgName',
        elementCode: 'text',
        extraParams: '{"field1": "ownerOrgName", "placeholder1":"请输入所属公司"}'
      },
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


export { list, get, getColumn, getSearch };
