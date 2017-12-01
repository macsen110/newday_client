/**
 * Created by cc on 2017/10/20.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiPlatformDomain;

/**
 * 添加组织管理
 */
function add(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/org/manager/add`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 编辑组织管理
 */
function edit(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/org/manager/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 组织管理列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/org/manager/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 删除组织管理
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/org/manager/disabled/${paramObj.code}`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 根据组织管理编码获取详情
 */
function get(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/org/manager/detail/${paramObj.code}`;
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
        showName: '组织名称',
        fieldConfigCode: 'orgFullName',
        elementCode: 'label',
        extraParams: '{"field1": "orgFullName", "detailLinkVisiable": "true", "required": "false"}'
      },
      {
        showName: '运输类型',
        fieldConfigCode: 'transportType',
        elementCode: 'label',
        extraParams: '{"field1": "transportType", "required": "false"}'
      },
      {
        showName: '法人',
        fieldConfigCode: 'legalPerson',
        elementCode: 'label',
        extraParams: '{"field1": "legalPerson", "required": "false"}'
      },
      {
        showName: '法人联系电话',
        fieldConfigCode: 'legalPersonPhone',
        elementCode: 'label',
        extraParams: '{"field1": "legalPersonPhone", "required": "false"}'
      },
      {
        showName: '组织联系人',
        fieldConfigCode: 'personFullName',
        elementCode: 'label',
        extraParams: '{"field1": "personFullName", "required": "false"}'
      },
      {
        showName: '组织联系人手机号',
        fieldConfigCode: 'personPhone',
        elementCode: 'label',
        extraParams: '{"field1": "personPhone", "required": "false"}'
      },
      {
        showName: '认证状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'label',
        extraParams: '{"field1": "certStatus", "required": "false"}'
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
