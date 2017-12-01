/**
 * 用户服务
 * Created by baipf on 2017/5/19.
 */
// import * as utils from './Utils';
import * as HTTP from './httpUtil';

const axios = require('axios'),
  apiDomain = require('./ApiConst').apiPersonDomain;

axios.defaults.withCredentials = true;

/**
 * 编辑用户
 * @param fullName      真实姓名（跟身份证一致）
 * @param userType      1.非司机用户 2.司机用户
 * @param positionName  岗位名称
 * @param userTag       标签列表
 * @param phone         手机号码
 * @param callback      回调
 */
function edit(paramObj, callback) {
  const apiUrl = `${apiDomain}/person/self/edit`;
  HTTP.post(apiUrl, paramObj, (success, error) => {
    callback(success, error);
  });
}

/**
 * 获取当前用户信息
 * @param callback  回调
 */
function info(callback) {
  const apiUrl = `${apiDomain}/person/self/info`;
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}

/**
 * 组织同意人员申请
 * @param id        申请号
 * @param callback  回调
 */
function orgConfirm(id, callback) {
  const apiUrl = `${apiDomain}/person/${id}/org_confirm`;
  // console.log(apiUrl);
  HTTP.post(apiUrl, {}, (success, error) => {
    callback(success, error);
  });
}


function getColumn(callback) {
  const success = {
    code: 200,
    content: [
      {
        'showName': '头像',
        'elementCode': 'image',
        'extraParams': '{"field1":"pictureResourceCode","required":"false","detailLinkVisiable":"false"}',
        'fieldConfigCode': 'pictureResourceCode'
      },
      {
        'showName': '姓名',
        'elementCode': 'text',
        'extraParams': '{"field1":"fullName","required":"true","detailLinkVisiable":"true","maxLength1":"20","placeholder1":"请输入姓名"}',
        'fieldConfigCode': 'fullName'
      },
      {
        'showName': '性别',
        'elementCode': 'radio',
        'extraParams': '{"field1":"gender","default1":"male","required":"true","detailLinkVisiable":"false","optionsValue1":["male","female"],"options1":["男","女"]}',
        'fieldConfigCode': 'gender'
      },
      {
        'showName': '手机号',
        'elementCode': 'text',
        'extraParams': '{"field1":"phone","required":"true","detailLinkVisiable":"false","maxLength1":"18","placeholder1":"请输入手机号"}',
        'fieldConfigCode': 'phone'
      }
      // {
      //   'showName': '婚姻状况',
      //   'elementCode': 'select',
      //   'extraParams': '{"field1":"maritalStatus","required":"false","detailLinkVisiable":"false","optionsValue1":["single","married","divorce","widowed"],"options1":["未婚","已婚","离异","丧偶"]}',
      //   'fieldConfigCode': 'maritalStatus'
      // },
      // {
      //   'showName': '现居住地址',
      //   'elementCode': 'text',
      //   'extraParams': '{"field1":"currentResidence","required":"false","detailLinkVisiable":"false","maxLength1":"50","placeholder1":"请输入现居住地址"}',
      //   'fieldConfigCode': 'currentResidence'
      // },
      // {
      //   'showName': '备注',
      //   'elementCode': 'text',
      //   'extraParams': '{"field1":"description","required":"false","detailLinkVisiable":"false","maxLength1":"200","placeholder1":"请输入备注"}',
      //   'fieldConfigCode': 'description'
      // }
    ]
  };
  callback(success);
  return success;
}

export { edit, info, orgConfirm, getColumn };
