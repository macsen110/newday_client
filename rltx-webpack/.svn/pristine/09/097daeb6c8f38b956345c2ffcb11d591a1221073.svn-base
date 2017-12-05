/**
 * 平台服务
 * Created by liangsheng on 2017/8/21.
 */

import * as HTTP from './httpUtil';

const axios = require('axios'),
  apiDomain = require('./ApiConst').apiPlatformDomain;

axios.defaults.withCredentials = true;

function setUserInfoCode(code, paramObj, callback) {
  const apiUrl = `${apiDomain}/platform/self/${code}/set`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

function registerInit(callback) {
  const apiUrl = `${apiDomain}/register/init`;
  HTTP.post(apiUrl, {}, (response, err) => {
    callback(response, err);
  });
}

/**
 * 组织审核列表字段
 */
function certOrgColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '公司全称',
        fieldConfigCode: 'orgFullName',
        elementCode: 'label',
        extraParams: '{"field1": "orgFullName", "required": "false", "detailLinkVisiable": "true"}'
      },
      {
        showName: '运输类型',
        fieldConfigCode: 'orgTag',
        elementCode: 'select',
        extraParams: '{"field1": "orgTag", "required": "false","placeholder1":"请选择运输类型","optionsValue1":["long_distance","short_distance"],"options1":["长途运输","短途运输"]}'
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
        showName: '联系人',
        fieldConfigCode: 'personFullName',
        elementCode: 'label',
        extraParams: '{"field1": "personFullName", "required": "false"}'
      },
      {
        showName: '联系电话',
        fieldConfigCode: 'personPhone',
        elementCode: 'label',
        extraParams: '{"field1": "personPhone", "required": "false"}'
      },
      {
        showName: '认证状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'select',
        extraParams: '{"field1":"certStatus", "required": "true", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
      },
      {
        showName: '账号状态',
        fieldConfigCode: 'disabled',
        elementCode: 'select',
        extraParams: '{"field1": "disabled", "required": "true", "optionsValue1": ["true","false"], "options1": ["冻结","正常"]}'
      },
      {
        showName: '是否加入黑名单',
        fieldConfigCode: 'isBlack',
        elementCode: 'select',
        extraParams: '{"field1": "isBlack", "required": "false", "optionsValue1": ["true","false"], "options1": ["是","否"]}'
      },
      {
        showName: '所在地区',
        fieldConfigCode: 'area',
        elementCode: 'selectArea',
        extraParams: '{"field1": "province", "field2": "city", "field3": "county", "required": "false", "inputKey1": "route.province","inputKey2":"route.city","inputKey3":"route.county"}'
      },
      {
        showName: '审核附件',
        fieldConfigCode: 'fileNum',
        elementCode: 'label',
        extraParams: '{"field1": "fileNum", "required": "false"}'
      },
      {
        showName: '提交人',
        fieldConfigCode: 'creatorUsername',
        elementCode: 'label',
        extraParams: '{"field1": "creatorUsername", "required": "false"}'
      },
      {
        showName: '提交时间',
        fieldConfigCode: 'createTime',
        elementCode: 'label',
        extraParams: '{"field1": "createTime", "format1": "yyyy-MM-dd HH:mm:ss", "required": "false"}'
      },
      {
        showName: '审核人',
        fieldConfigCode: 'updateUsername',
        elementCode: 'label',
        extraParams: '{"field1": "updateUsername", "required": "false"}'
      },
      {
        showName: '审核时间',
        fieldConfigCode: 'updateTime',
        elementCode: 'label',
        extraParams: '{"field1": "updateTime", "required": "false"}'
      }
    ] };
  callback(success);
  return success;
}

/**
 * 组织审核搜索字段
 */
function certOrgSearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '运输类型',
        fieldConfigCode: 'orgTag',
        elementCode: 'select',
        extraParams: '{"field1": "orgTag", "required": "false","placeholder1":"请选择运输类型","optionsValue1":["long_distance","short_distance"],"options1":["长途运输","短途运输"]}'
      },
      {
        showName: '公司全称',
        fieldConfigCode: 'orgFullName',
        elementCode: 'text',
        extraParams: '{"field1": "orgFullName", "required": "false"}'
      },
      {
        showName: '认证状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'select',
        extraParams: '{"field1":"certStatus", "required": "false", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
      }
    ]};
  callback(success);
  return success;
}

/**
 * 组织审核详情字段
 */
function certOrgDetail(callback) {
  const success = {
    data: {
      code: 200,
      content: [
        {
          showName: '公司全称',
          fieldConfigCode: 'orgFullName',
          elementCode: 'text',
          extraParams: '{"field1": "orgFullName", "required": "false"}'
        },
        // {
        //   showName: '营业执照',
        //   fieldConfigCode: 'businessLicenseResourceCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "businessLicenseResourceCode", "required": "false"}'
        // },
        {
          showName: '法人',
          fieldConfigCode: 'legalPerson',
          elementCode: 'text',
          extraParams: '{"field1": "legalPerson", "required": "false"}'
        },
        // {
        //   showName: '身份证照片',
        //   fieldConfigCode: 'idNumberResourceCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "idNumberResourceCode", "required": "false"}'
        // },
        {
          showName: '法人联系电话',
          fieldConfigCode: 'legalPersonPhone',
          elementCode: 'text',
          extraParams: '{"field1": "legalPersonPhone", "required": "false"}'
        },
        {
          showName: '联系人',
          fieldConfigCode: 'personFullName',
          elementCode: 'label',
          extraParams: '{"field1": "personFullName", "required": "false"}'
        },
        {
          showName: '联系电话',
          fieldConfigCode: 'personPhone',
          elementCode: 'label',
          extraParams: '{"field1": "personPhone", "required": "false"}'
        },
        {
          showName: '运输类型',
          fieldConfigCode: 'orgTag',
          elementCode: 'select',
          extraParams: '{"field1": "orgTag", "required": "false","placeholder1":"请选择运输类型","optionsValue1":["long_distance","short_distance"],"options1":["长途运输","短途运输"]}'
        },
        {
          showName: '开户行',
          fieldConfigCode: 'bankName',
          elementCode: 'text',
          extraParams: '{"field1": "bankName", "required": "false"}'
        },
        {
          showName: '银行户名',
          fieldConfigCode: 'bankAccountName',
          elementCode: 'text',
          extraParams: '{"field1": "bankAccountName", "required": "false"}'
        },
        {
          showName: '银行账号',
          fieldConfigCode: 'bankAccountNo',
          elementCode: 'text',
          extraParams: '{"field1": "bankAccountNo", "required": "false"}'
        },
        {
          showName: '备注',
          fieldConfigCode: 'failReason',
          elementCode: 'label',
          extraParams: '{"field1": "failReason", "required": "false"}'
        },
        {
          showName: '提交人',
          fieldConfigCode: 'creatorUsername',
          elementCode: 'label',
          extraParams: '{"field1": "creatorUsername", "required": "false"}'
        },
        {
          showName: '提交时间',
          fieldConfigCode: 'updateTime',
          elementCode: 'label',
          extraParams: '{"field1": "updateTime", "format1": "yyyy-MM-dd HH:mm:ss", "required": "false"}'
        }
      ]
    }
  };
  callback(success);
  return success;
}

/**
 * 组织审核列表
 * @param paramObj
 * @param callback
 */
function certOrgList(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 组织审核列表数
 * @param paramObj
 * @param callback
 */
function certOrgCount(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/count`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 组织审核详情
 * @param paramObj
 * @param callback
 */
function certOrgInfo(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/${paramObj.code}/info`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 组织审核
 * @param orgCode
 * @param paramObj
 * @param callback
 */
function certOrgApproval(orgCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/${orgCode}/approval`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 组织审核
 * @param orgCode
 * @param paramObj
 * @param callback
 */
function certOrgDisabled(orgCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_org/${orgCode}/disabled`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 司机审核列表字段
 */
function certPersonColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '司机姓名',
        fieldConfigCode: 'fullName',
        elementCode: 'label',
        extraParams: '{"field1": "fullName", "required": "false", "detailLinkVisiable": "true"}'
      },
      {
        showName: '账号状态',
        fieldConfigCode: 'userStatus',
        elementCode: 'select',
        extraParams: '{"field1": "userStatus", "required": "true", "optionsValue1": ["active","inactive"], "options1": ["已激活","未激活"]}'
      },
      {
        showName: '审核状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'select',
        extraParams: '{"field1":"certStatus", "required": "true", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
      },
      {
        showName: '是否加入黑名单',
        fieldConfigCode: 'isBlack',
        elementCode: 'select',
        extraParams: '{"field1": "isBlack", "required": "false", "optionsValue1": ["true","false"], "options1": ["是","否"]}'
      },
      {
        showName: '手机号',
        fieldConfigCode: 'phone',
        elementCode: 'label',
        extraParams: '{"field1": "phone", "required": "false"}'
      },
      {
        showName: '标签',
        fieldConfigCode: 'userTag',
        elementCode: 'tag',
        extraParams: '{"field1": "userTag", "required": "false"}'
      },
      {
        showName: '性别',
        fieldConfigCode: 'gender',
        elementCode: 'radio',
        extraParams: '{"field1": "gender", "required": "false", "optionsValue1":["male","female"],"options1":["男","女"]}'
      },
      {
        showName: '提交人',
        fieldConfigCode: 'requestUserFullname',
        elementCode: 'label',
        extraParams: '{"field1": "requestUserFullname", "required": "false"}'
      },
      {
        showName: '提交时间',
        fieldConfigCode: 'requestTime',
        elementCode: 'label',
        extraParams: '{"field1": "requestTime", "format1": "yyyy-MM-dd HH:mm:ss", "required": "false"}'
      }
      // {
      //   showName: '审核人',
      //   fieldConfigCode: 'updateUsername',
      //   elementCode: 'label',
      //   extraParams: '{"field1": "updateUsername", "required": "false"}'
      // },
      // {
      //   showName: '审核时间',
      //   fieldConfigCode: 'updateTime',
      //   elementCode: 'label',
      //   extraParams: '{"field1": "updateTime", "required": "false"}'
      // }
    ] };
  callback(success);
  return success;
}

/**
 * 司机审核搜索字段
 */
function certPersonSearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '司机姓名',
        fieldConfigCode: 'personFullName',
        elementCode: 'text',
        extraParams: '{"field1": "personFullName", "placeholder1":"请输入司机姓名"}'
      },
      {
        showName: '手机号',
        fieldConfigCode: 'phone',
        elementCode: 'text',
        extraParams: '{"field1": "phone", "placeholder1":"请输入手机号"}'
      }
    ]};
  callback(success);
  return success;
}

/**
 * 司机审核详情字段
 */
function certPersonDetail(callback) {
  const success = {
    data: {
      code: 200,
      content: [
        {
          showName: '司机姓名',
          fieldConfigCode: 'fullName',
          elementCode: 'text',
          extraParams: '{"field1": "fullName", "required": "false"}'
        },
        {
          showName: '账号状态',
          fieldConfigCode: 'userStatus',
          elementCode: 'select',
          extraParams: '{"field1": "userStatus", "required": "false", "optionsValue1": ["active","inactive"], "options1": ["已激活","未激活"]}'
        },
        {
          showName: '审核状态',
          fieldConfigCode: 'certStatus',
          elementCode: 'select',
          extraParams: '{"field1":"certStatus", "required": "false", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
        },
        {
          showName: '手机号',
          fieldConfigCode: 'phone',
          elementCode: 'label',
          extraParams: '{"field1": "phone", "required": "false"}'
        },
        {
          showName: '标签',
          fieldConfigCode: 'userTag',
          elementCode: 'tag',
          extraParams: '{"field1": "userTag", "required": "false"}'
        },
        {
          showName: '性别',
          fieldConfigCode: 'gender',
          elementCode: 'radio',
          extraParams: '{"field1": "gender", "required": "false", "optionsValue1":["male","female"],"options1":["男","女"]}'
        },
        // {
        //   showName: '身份证正面',
        //   fieldConfigCode: 'id1ResourceCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "id1ResourceCode", "required": "false"}'
        // },
        // {
        //   showName: '身份证反面',
        //   fieldConfigCode: 'id2ResourceCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "id2ResourceCode", "required": "false"}'
        // },
        // {
        //   showName: '驾驶证',
        //   fieldConfigCode: 'driverLicenseCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "driverLicenseCode", "required": "false"}'
        // },
        // {
        //   showName: '营运从业资格证',
        //   fieldConfigCode: 'operateLicenseCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "operateLicenseCode", "required": "false"}'
        // },
        // {
        //   showName: '危险货物运输从业资格证',
        //   fieldConfigCode: 'dangerousTransportLicenseCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "dangerousTransportLicenseCode", "required": "false"}'
        // },
        {
          showName: '备注',
          fieldConfigCode: 'failReason',
          elementCode: 'label',
          extraParams: '{"field1": "failReason", "required": "false"}'
        },
        {
          showName: '提交人',
          fieldConfigCode: 'requestUserFullname',
          elementCode: 'label',
          extraParams: '{"field1": "requestUserFullname", "required": "false"}'
        },
        {
          showName: '提交时间',
          fieldConfigCode: 'requestTime',
          elementCode: 'label',
          extraParams: '{"field1": "requestTime", "format1": "yyyy-MM-dd HH:mm:ss", "required": "false"}'
        }
      ]
    }
  };
  callback(success);
  return success;
}

/**
 * 司机审核列表
 * @param paramObj
 * @param callback
 */
function certPersonList(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_person/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 司机审核列表数
 * @param paramObj
 * @param callback
 */
function certPersonCount(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_person/count`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 司机审核详情
 * @param paramObj
 * @param callback
 */
function certPersonInfo(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_person/${paramObj.code}/info`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 司机审核
 * @param userCode
 * @param paramObj
 * @param callback
 */
function certPersonApproval(userCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_person/${userCode}/approval`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 司机冻结/解冻
 * @param userCode
 * @param paramObj
 * @param callback
 */
function certPersonDisabled(userCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_person/${userCode}/disabled`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 车辆审核列表字段
 */
function certTruckColumn(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'label',
        extraParams: '{"field1": "truckLicenseNo", "required": "false", "detailLinkVisiable": "true"}'
      },
      // {
      //   showName: '挂车牌号',
      //   fieldConfigCode: 'trailerTruckLicenseNo',
      //   elementCode: 'label',
      //   extraParams: '{"field1": "trailerTruckLicenseNo", "required": "false" }'
      // },
      {
        showName: '所属公司',
        fieldConfigCode: 'ownerOrgName',
        elementCode: 'selectPartner',
        extraParams: '{"field1": "ownerOrgName", "field2":"ownerOrgCode", "outputKey1":"partner","inputKey2":"partner.code"}'
      },
      {
        showName: '审核状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'select',
        extraParams: '{"field1":"certStatus", "required": "true", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
      },
      {
        showName: '是否加入黑名单',
        fieldConfigCode: 'isBlack',
        elementCode: 'select',
        extraParams: '{"field1": "isBlack", "required": "false", "optionsValue1": ["true","false"], "options1": ["是","否"]}'
      },
      // {
      //   showName: '车辆状态',
      //   fieldConfigCode: 'disabled',
      //   elementCode: 'select',
      //   extraParams: '{"field1": "disabled", "required": "true", "optionsValue1": ["true","false"], "options1": ["冻结","正常"]}'
      // },
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
        showName: '车长',
        fieldConfigCode: 'truckLength',
        elementCode: 'truckSize',
        extraParams: '{"field1":"truckLength","field2":"truckLengthUnitCode","required":"false"}'
      },
      {
        showName: '载重',
        fieldConfigCode: 'regTonnage',
        elementCode: 'regTonnage',
        extraParams: '{"field1":"regTonnage","field2":"regTonnageUnitCode","required":"false"}'
      },
      {
        showName: '容积',
        fieldConfigCode: 'cubage',
        elementCode: 'cubage',
        extraParams: '{"field1":"cubage","field2":"cubageUnitCode","required":"false"}'
      },
      {
        showName: '提交人',
        fieldConfigCode: 'requestUserFullname',
        elementCode: 'label',
        extraParams: '{"field1": "requestUserFullname", "required": "false"}'
      },
      {
        showName: '提交时间',
        fieldConfigCode: 'requestTime',
        elementCode: 'label',
        extraParams: '{"field1": "requestTime", "format1": "yyyy-MM-dd HH:mm:ss", "required": "false"}'
      }
      // {
      //   showName: '审核人',
      //   fieldConfigCode: 'updateUsername',
      //   elementCode: 'label',
      //   extraParams: '{"field1": "updateUsername", "required": "false"}'
      // },
      // {
      //   showName: '审核时间',
      //   fieldConfigCode: 'updateTime',
      //   elementCode: 'label',
      //   extraParams: '{"field1": "updateTime", "required": "false"}'
      // }
    ]};
  callback(success);
  return success;
}

/**
 * 车辆审核搜索字段
 */
function certTruckSearch(callback) {
  const success = { code: 200,
    content: [
      {
        showName: '车牌号',
        fieldConfigCode: 'truckLicenseNo',
        elementCode: 'text',
        extraParams: '{"field1": "truckLicenseNo", "required": "false"}'
      },
      {
        showName: '所属公司',
        fieldConfigCode: 'ownerOrgName',
        elementCode: 'text',
        extraParams: '{"field1": "ownerOrgName", "placeholder1":"请输入所属公司"}'
      },
      {
        showName: '审核状态',
        fieldConfigCode: 'certStatus',
        elementCode: 'select',
        extraParams: '{"field1":"certStatus", "required": "false", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
      },
      {
        showName: '是否加入黑名单',
        fieldConfigCode: 'isBlack',
        elementCode: 'select',
        extraParams: '{"field1": "isBlack", "required": "false", "optionsValue1": ["true","false"], "options1": ["是","否"]}'
      }
    ]};
  callback(success);
  return success;
}

/**
 * 车辆审核详情字段
 */
function certTruckDetail(callback) {
  const success = {
    data: {
      code: 200,
      content: [
        {
          showName: '车牌号',
          fieldConfigCode: 'truckLicenseNo',
          elementCode: 'text',
          extraParams: '{"field1": "truckLicenseNo", "required": "false"}'
        },
        // {
        //   showName: '挂车牌号',
        //   fieldConfigCode: 'trailerTruckLicenseNo',
        //   elementCode: 'label',
        //   extraParams: '{"field1": "trailerTruckLicenseNo", "required": "false"}'
        // },
        {
          showName: '所属公司',
          fieldConfigCode: 'ownerOrgName',
          elementCode: 'selectPartner',
          extraParams: '{"field1": "ownerOrgName", "field2":"ownerOrgCode", "outputKey1":"partner","inputKey2":"partner.code"}'
        },
        // {
        //   showName: '车辆状态',
        //   fieldConfigCode: 'disabled',
        //   elementCode: 'select',
        //   extraParams: '{"field1": "disabled", "required": "false", "optionsValue1": ["true","false"], "options1": ["冻结","正常"]}'
        // },
        {
          showName: '审核状态',
          fieldConfigCode: 'certStatus',
          elementCode: 'select',
          extraParams: '{"field1":"certStatus", "required": "false", "optionsValue1": ["unauthenticated","authenticating","authenticated","failed"], "options1": ["未提交","待审核","审核通过","审核不通过"]}'
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
          showName: '车长',
          fieldConfigCode: 'truckLength',
          elementCode: 'truckSize',
          extraParams: '{"field1":"truckLength","field2":"truckLengthUnitCode","required":"false"}'
        },
        {
          showName: '载重',
          fieldConfigCode: 'regTonnage',
          elementCode: 'regTonnage',
          extraParams: '{"field1":"regTonnage","field2":"regTonnageUnitCode","required":"false"}'
        },
        {
          showName: '容积',
          fieldConfigCode: 'cubage',
          elementCode: 'cubage',
          extraParams: '{"field1":"cubage","field2":"cubageUnitCode","required":"false"}'
        },
        {
          showName: '道路运输证号',
          fieldConfigCode: 'operateLicenseCode',
          elementCode: 'label',
          extraParams: '{"field1": "operateLicenseCode", "required": "false"}'
        },
        // {
        //   showName: '道路运输证',
        //   fieldConfigCode: 'operateLicenseResourceCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "operateLicenseResourceCode", "required": "false"}'
        // },
        {
          showName: '行驶证号',
          fieldConfigCode: 'drivingLicenseCode',
          elementCode: 'label',
          extraParams: '{"field1": "drivingLicenseCode", "required": "false"}'
        },
        // {
        //   showName: '行驶证',
        //   fieldConfigCode: 'drivingLicenseResourceCode',
        //   elementCode: 'image',
        //   extraParams: '{"field1": "drivingLicenseResourceCode", "required": "false"}'
        // },
        {
          showName: '备注',
          fieldConfigCode: 'failReason',
          elementCode: 'label',
          extraParams: '{"field1": "failReason", "required": "false"}'
        },
        {
          showName: '提交人',
          fieldConfigCode: 'requestUserFullname',
          elementCode: 'label',
          extraParams: '{"field1": "requestUserFullname", "required": "false"}'
        },
        {
          showName: '提交时间',
          fieldConfigCode: 'requestTime',
          elementCode: 'label',
          extraParams: '{"field1": "requestTime", "format1": "yyyy-MM-dd HH:mm:ss", "required": "false"}'
        }
      ]
    }
  };
  callback(success);
  return success;
}

/**
 * 车辆审核列表
 * @param paramObj
 * @param callback
 */
function certTruckList(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_truck/list`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 车辆审核列表数
 * @param paramObj
 * @param callback
 */
function certTruckCount(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_truck/count`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 车辆审核详情
 * @param paramObj
 * @param callback
 */
function certTruckInfo(paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_truck/${paramObj.code}/info`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 车辆审核
 * @param truckCode
 * @param paramObj
 * @param callback
 */
function certTruckApproval(truckCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_truck/${truckCode}/approval`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 车辆冻结/解冻
 * @param truckCode
 * @param paramObj
 * @param callback
 */
function certTruckDisabled(truckCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/cert_truck/${truckCode}/disabled`;
  HTTP.post(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}

/**
 * 附件图片显示
 * @param resourceCode
 * @param paramObj
 * @param callback
 */
function getImage(resourceCode, paramObj, callback) {
  const apiUrl = `${apiDomain}/fw/image/${resourceCode}/get`;
  HTTP.get(apiUrl, paramObj, (response, err) => {
    callback(response, err);
  });
}


export { setUserInfoCode, registerInit,
certOrgColumn, certOrgSearch, certOrgDetail, certOrgList, certOrgCount, certOrgInfo, certOrgApproval, certOrgDisabled,
certPersonColumn, certPersonSearch, certPersonDetail, certPersonList, certPersonCount, certPersonInfo, certPersonApproval, certPersonDisabled,
certTruckColumn, certTruckSearch, certTruckDetail, certTruckList, certTruckCount, certTruckInfo, certTruckApproval, certTruckDisabled, getImage };
