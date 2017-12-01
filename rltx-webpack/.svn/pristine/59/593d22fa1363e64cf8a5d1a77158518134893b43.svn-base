/**
 * Created by cc on 2017/11/6.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiPlatformDomain;

/**
 * 添加
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/accountingChargeItem/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/accountingChargeItem/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/accountingChargeItem/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/accountingChargeItem/delete/${paramObj.code}`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据编码获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/accountingChargeItem/detail/${paramObj.code}`;
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
        showName: '序号',
        fieldConfigCode: 'sort',
        elementCode: 'label',
        extraParams: '{"field1": "sort", "required": "false"}'
      },
      {
        showName: '科目名称',
        fieldConfigCode: 'chargeItemName',
        elementCode: 'label',
        extraParams: '{"field1": "chargeItemName", "detailLinkVisiable": "true", "required": "false"}'
      },
      {
        showName: '科目代码',
        fieldConfigCode: 'code',
        elementCode: 'label',
        extraParams: '{"field1": "code", "required": "false"}'
      },
      {
        showName: '状态',
        fieldConfigCode: 'disabled',
        elementCode: 'radio',
        extraParams: '{"field1": "disabled","default1":"false","required":"true","detailLinkVisiable":"false","optionsValue1":["false","true"],"options1":["启用","禁用"]}'
      },
      {
        showName: '数量单位',
        fieldConfigCode: 'chargeItemNumberUnitName',
        elementCode: 'label',
        extraParams: '{"field1": "chargeItemNumberUnitName", "required": "false"}'
      },
      {
        showName: '价格单位',
        fieldConfigCode: 'chargeItemPriceUnitName',
        elementCode: 'label',
        extraParams: '{"field1": "chargeItemPriceUnitName", "required": "false"}'
      },
      {
        showName: '金额单位',
        fieldConfigCode: 'chargeItemAmountsUnitName',
        elementCode: 'label',
        extraParams: '{"field1": "chargeItemAmountsUnitName", "required": "false"}'
      },
      {
        showName: '创建人',
        fieldConfigCode: 'creatorUsername',
        elementCode: 'label',
        extraParams: '{"field1": "creatorUsername", "required": "false"}'
      },
      {
        showName: '创建时间',
        fieldConfigCode: 'createTime',
        elementCode: 'label',
        extraParams: '{"field1": "createTime", "required": "false"}'
      },
      {
        showName: '修改人',
        fieldConfigCode: 'updateUsername',
        elementCode: 'label',
        extraParams: '{"field1": "updateUsername", "required": "false"}'
      },
      {
        showName: '修改时间',
        fieldConfigCode: 'updateTime',
        elementCode: 'label',
        extraParams: '{"field1": "updateTime", "required": "false"}'
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
        showName: '运输类型',
        fieldConfigCode: 'transportType',
        elementCode: 'select',
        extraParams: '{"field1": "transportType", "required": "false","placeholder1":"请选择运输类型","optionsValue1":["long_distance","short_distance"],"options1":["长途运输","短途运输"]}'
      },
      {
        showName: '组织名称',
        fieldConfigCode: 'orgFullName',
        elementCode: 'text',
        extraParams: '{"field1": "orgFullName", "placeholder1": "请输入组织名称"}'
      },
      {
        showName: '认证状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'select',
        extraParams: '{"field1": "certStatus","required": "false","placeholder1":"请选择状态","optionsValue1":["","unauthenticated","authenticated"],"options1":["全部","未认证","已认证"]}'
      }
    ]
  };
  callback(success);
  return success;
}

/**
 * 获取详情字段
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
