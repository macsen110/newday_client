/**
 * Created by cc on 2017/10/17.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiOrgDomain;

/**
 * 添加账户信息
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/bank/account/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑账户信息
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/org/bank/account/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 账户信息列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/bank/account/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除账户信息
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/bank/account/${paramObj.code}/delete`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据账户信息编码获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/org/bank/account/${paramObj.code}`;
  HTTP.get(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取账户信息列表字段
 */
function getColumn(callback) {
  const success = { 
    code: 200,
    content: [
      {
        showName: '银行户名',
        fieldConfigCode: 'bankAccountName',
        elementCode: 'label',
        extraParams: '{"field1": "bankAccountName", "required": "false"}'
      },
      {
        showName: '开户行',
        fieldConfigCode: 'bankName',
        elementCode: 'label',
        extraParams: '{"field1": "bankName", "required": "false"}'
      },
      {
        showName: '银行账号',
        fieldConfigCode: 'bankAccountNo',
        elementCode: 'text',
        extraParams: '{"field1": "bankAccountNo", "required": "true", "detailLinkVisiable":"true"}'
      },
      {
        showName: '描述',
        fieldConfigCode: 'description',
        elementCode: 'label',
        extraParams: '{"field1": "description", "required": "false"}'
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
        showName: '银行账号',
        fieldConfigCode: 'bankAccountNo',
        elementCode: 'text',
        extraParams: '{"field1": "bankAccountNo", "placeholder1":"请输入银行账号"}'
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
