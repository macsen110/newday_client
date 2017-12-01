/**
 * Created by cc on 2017/10/24.
 */

import * as HTTP from './httpUtil';

const apiDomain = require('./ApiConst').apiPlatformDomain;


/**
 * 司机管理列表
 */
function list(paramObj, callback) {
  const apiUrl = `${apiDomain}/user/manager/list`;
  HTTP.get(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 司机冻结解冻
 */
function disableDriver(userCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/user/manager/disabled/${userCode}`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
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
        showName: '司机姓名',
        fieldConfigCode: 'personFullName',
        elementCode: 'label',
        extraParams: '{"field1": "personFullName", "required": "false"}'
      },
      {
        showName: '账号状态',
        fieldConfigCode: 'userStatus',
        elementCode: 'label',
        extraParams: '{"field1":"userStatus", "required": "false"}'
      },
      {
        showName: '是否冻结',
        fieldConfigCode: 'disabled',
        elementCode: 'label',
        extraParams: '{"field1":"disabled", "required": "false"}'
      },
      {
        showName: '手机号',
        fieldConfigCode: 'personPhone',
        elementCode: 'label',
        extraParams: '{"field1": "personPhone", "required": "false"}'
      },
      {
        showName: '标签',
        fieldConfigCode: 'userTag',
        elementCode: 'tag',
        extraParams: '{"field1": "userTag", "required": "false"}'
      },
      {
        showName: '性别',
        fieldConfigCode: 'personGender',
        elementCode: 'radio',
        extraParams: '{"field1": "personGender", "required": "false", "optionsValue1":["male","female"],"options1":["男","女"]}'
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
        showName: '司机姓名',
        fieldConfigCode: 'personFullName',
        elementCode: 'text',
        extraParams: '{"field1": "personFullName", "placeholder1":"请输入司机姓名"}'
      },
      {
        showName: '手机号',
        fieldConfigCode: 'personPhone',
        elementCode: 'text',
        extraParams: '{"field1": "personPhone", "placeholder1":"请输入手机号"}'
      }
    ]
  };
  callback(success);
  return success;
}

export { list, disableDriver, getColumn, getSearch };
