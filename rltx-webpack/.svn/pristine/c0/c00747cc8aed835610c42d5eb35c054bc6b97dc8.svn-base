/**
 * ResourceService.js
 * Created by dsky on 17/7/7.
 */

// import * as waybillService from './waybillService';
import { objToParamStr } from './Utils.js';
import * as RateService from './rateService.js';
// import { getColumn as PartnergetColumn, getSearch as PartnergetSearch } from './PartnerService';
// import { getColumn as RoutegetColumn, getSearch as RoutegetSearch } from './RouteService';
// import { getColumn as LogisticsgetColumn, getSearch as LogisticsgetSearch } from './LogisticsService';
// import { getColumn as TruckgetColumn, getSearch as TruckgetSearch } from './TruckService';
// import { getColumn as TrailergetColumn, getSearch as TrailergetSearch } from './TrailerService';
const axios = require('axios'),
  ApiConst = require('./ApiConst'),
  TRUCK_MODEL_DATA = require('./TruckModelData').list,
  PAGE_SIZE = 10,
  area = require('./area.json'),
  // defineUrl = `${ApiConst.orgConfigUrl}/element_type/define`,
  // typeUrl = `${ApiConst.orgConfigUrl}/element_type/info`,
  LOCAL_CACHE = {};

axios.defaults.withCredentials = true;

/**
 * 封装Get请求
 * @param url 请求的URL
 * @param successCallback 成功回调函数
 * @param errorCallback 失败回调函数
 */
function get(url, successCallback, errorCallback) {
  axios.get(url).then((res) => {
    const data = res.data;
    successCallback(data.content, data.total);
  }).catch((err) => {
    console.error(err);
    errorCallback(err);
  });
}

function post(url, param, successCallback, errorCallback) {
  axios.post(url, param).then((res) => {
    const data = res.data;
    successCallback(data.content);
  }).catch((err) => {
    console.error(err);
    errorCallback(err);
  });
}

//
const dataSourcesObj = {};

/**
 * 车型数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const truckModel = dataSourcesObj.truckModel = {
  getData(params, callback) {
    callback(TRUCK_MODEL_DATA, null);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};


/**
 * 计量单位数据源
 * @param type
 * @param keyword
 * @param callback
 */
function measureUnit(type, codeUnitType, keyword, callback) {
  // console.log('type in LOCAL_CACHE', type, LOCAL_CACHE, (type in LOCAL_CACHE));
  const realType = `${type}|${codeUnitType}`;
  if (!(realType in LOCAL_CACHE)) {
    LOCAL_CACHE[realType] = [callback];
    let url = `${ApiConst.apiOrgConfigDomain}/measure_unit/${type}/get`;
    if (codeUnitType) {
      url += `?codeUnitType=${codeUnitType}`;
    }
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': data[i].codeName,
          'name': data[i].codeName,
          'data': data[i]
        });
      }
      // console.log('set cache for', type, LOCAL_CACHE);
      // callback(autoData, null);
      if (LOCAL_CACHE[realType].length) {
        LOCAL_CACHE[realType].forEach((cb) => {
          cb(autoData, null);
        });
      }
      delete LOCAL_CACHE[realType];
    }, (err) => {
      console.error(err);
      // callback(null, err);
      if (LOCAL_CACHE[realType].length) {
        LOCAL_CACHE[realType].forEach((cb) => {
          cb(null, err);
        });
      }
      delete LOCAL_CACHE[realType];
    });
  } else {
    LOCAL_CACHE[realType].push(callback);
    // callback(LOCAL_CACHE[type], null);
  }
}

/**
 * 车辆尺寸单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const truckSize = dataSourcesObj.truckSize = {
  getData(params, callback) {
    measureUnit('truck.size', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 轮胎纹深单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 mm
 *               </p>
 * @param callback
 */
const tyrewrinklesNumber = dataSourcesObj.tyrewrinklesNumber = {
  getData(params, callback) {
    measureUnit('tyrewrinkles.number', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 车辆载重单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const truckCarry = dataSourcesObj.truckCarry = {
  getData(params, callback) {
    measureUnit('truck.carry', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 车辆容积单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const truckCubage = dataSourcesObj.truckCubage = {
  getData(params, callback) {
    measureUnit('truck.cubage', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 司机运价单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const driverPrice = dataSourcesObj.driverPrice = {
  getData(params, callback) {
    measureUnit('driver.price', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 标准时长单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const routeDuration = dataSourcesObj.routeDuration = {
  getData(params, callback) {
    measureUnit('route.duration', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 货物单价单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const goodsPrice = dataSourcesObj.goodsPrice = {
  getData(params, callback) {
    let codeUnitType = params.codeUnitType;
    if (codeUnitType === 'truck') {
      codeUnitType = undefined;
    }
    measureUnit('goods.price', codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 承运价单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const carrierPrice = dataSourcesObj.carrierPrice = {
  getData(params, callback) {
    measureUnit('carrier.price', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 货物数量单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const goodsNumber = dataSourcesObj.goodsNumber = {
  getData(params, callback) {
    measureUnit('goods.number', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 货量单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const goodsVolume = dataSourcesObj.goodsVolume = {
  getData(params, callback) {
    measureUnit('goods.volume', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 货物重量单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const goodsWeight = dataSourcesObj.goodsWeight = {
  getData(params, callback) {
    measureUnit('goods.weight', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 合理货差系数单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const goodsLossRation = dataSourcesObj.goodsLossRation = {
  getData(params, callback) {
    measureUnit('goods.loss.ration', null, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 合理货差单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const goodsLoss = dataSourcesObj.goodsLoss = {
  getData(params, callback) {
    let codeUnitType = params.codeUnitType;
    if (codeUnitType === 'truck') {
      codeUnitType = undefined;
    }
    measureUnit('goods.loss', codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 标准运距单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const standardDistance = dataSourcesObj.standardDistance = {
  getData(params, callback) {
    measureUnit('standard.distance', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 费用科目数量单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const chargeItemNumber = dataSourcesObj.chargeItemNumber = {
  getData(params, callback) {
    measureUnit('settle.volume.unit', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 费用科目价格单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const chargeItemPrice = dataSourcesObj.chargeItemPrice = {
  getData(params, callback) {
    measureUnit('goods.price', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 结算货量单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const settleVolumeUnit = dataSourcesObj.settleVolumeUnit = {
  getData(params, callback) {
    measureUnit('settle.volume.unit', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 费用科目金额单位数据源
 * @param params <p>
 *                  keyword => 关键词
 *                  codeUnitType => 单位类型 ton、truck、cube
 *               </p>
 * @param callback
 */
const chargeItemAmount = dataSourcesObj.chargeItemAmount = {
  getData(params, callback) {
    measureUnit('price.unit', params.codeUnitType, params.keyword, callback);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

function _getConfig(url, filter, cb) {
  const configData = [];
  get(url, (data) => {
    data.forEach((val) => {
      if (filter.indexOf(val.fieldConfigCode) > -1) {
        configData.push(val);
      }
    });
    cb({ content: configData }, null);
  }, (err) => {
    console.error(err);
    cb(null, err);
  });
}

function _getListData(url, cb) {
  get(url, (data, total) => {
    cb({ content: data, total: total }, null);
  }, (err) => {
    cb(null, err);
  });
}

/**
 * 车辆数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const truck = dataSourcesObj.truck = {
  getData(params, callback) {
    const url = `${ApiConst.apiTruckDomain}/truck/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    // console.log('test', { 'keyword': keyword, 'size': PAGE_SIZE });
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].truckLicenseNo ? data[i].truckLicenseNo : '-'}`,
          'name': `${data[i].truckLicenseNo ? data[i].truckLicenseNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '车辆';
  },
  getDetailUrl(code, objectName) {
    // return `/truck/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/truck/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getAddUrl(objectName) {
    // return `/truck/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getColumns(cb) {
    const filter = ['truckLicenseNo'];
    _getConfig(`${ApiConst.apiTruckDomain}/list_render_info/truck/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['truckLicenseNo'];
    _getConfig(`${ApiConst.apiTruckDomain}/search_render_info/truck/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiTruckDomain}/truck/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 挂车数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const trailer = dataSourcesObj.trailer = {
  getData(params, callback) {
    const url = `${ApiConst.apiTruckDomain}/trailer/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].truckLicenseNo ? data[i].truckLicenseNo : '-'}`,
          'name': `${data[i].truckLicenseNo ? data[i].truckLicenseNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '挂车';
  },
  getDetailUrl(code, objectName) {
    // return `/trailer/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/trailer/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/trailer/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/trailer/add.html';
  },
  getAddUrl(objectName) {
    // return `/trailer/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/trailer/add.html';
  },
  getColumns(cb) {
    const config = ['truckLicenseNo'];
    _getConfig(`${ApiConst.apiTruckDomain}/list_render_info/trailer/list`, config, cb);
  },
  getSearch(cb) {
    const config = ['truckLicenseNo'];
    _getConfig(`${ApiConst.apiTruckDomain}/search_render_info/trailer/list`, config, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiTruckDomain}/trailer/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};
/**
 * 所有车辆数据源，不分主挂车
 * @type {{getData: (function(*, *)), getObjectName: (function()), getDetailUrl: (function(*, *)), getEditUrl: (function(*, *)), getAddUrl: (function(*)), getColumns: (function(*=)), getSearch: (function(*=)), getListData: (function(*=, *=))}}
 */
const allTruck = dataSourcesObj.allTruck = {
  getData(params, callback) {
    const url = `${ApiConst.apiTruckDomain}/truck/all/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    // console.log('test', { 'keyword': keyword, 'size': PAGE_SIZE });
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].truckLicenseNo ? data[i].truckLicenseNo : '-'}`,
          'name': `${data[i].truckLicenseNo ? data[i].truckLicenseNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '车辆';
  },
  getDetailUrl(code, objectName, object) {
    if (object && object.isTrailer) {
      return '/trailer/add.html';
    }
    // return `/truck/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getEditUrl(code, objectName, object) {
    if (object && object.isTrailer) {
      return '/trailer/add.html';
    }
    // return `/truck/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getAddUrl(objectName) {
    // return `/truck/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getColumns(cb) {
    const filter = ['truckLicenseNo'];
    _getConfig(`${ApiConst.apiTruckDomain}/list_render_info/truck/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['truckLicenseNo'];
    _getConfig(`${ApiConst.apiTruckDomain}/search_render_info/truck/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiTruckDomain}/truck/all/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 司机数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const driver = dataSourcesObj.driver = {
  getData(params, callback) {
    const url = `${ApiConst.apiPersonDomain}/person/driver/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].fullName ? data[i].fullName : '-'} - ${data[i].phone ? data[i].phone : '-'}`,
          'name': `${data[i].fullName ? data[i].fullName : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getDetailUrl(code, objectName) {
    // return `/driver/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/driver/add.html';
  },
  getAddUrl(objectName) {
    // return `/driver/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/driver/add.html';
  },
  getEditUrl(code, objectName) {
    return '/driver/add.html';
  },
  getObjectName() {
    return '司机';
  },
  getSearch(cb) {
    const filter = ['fullName'];
    _getConfig(`${ApiConst.apiPersonDomain}/search_render_info/driver/list`, filter, cb);
  },
  getColumns(cb) {
    const filter = ['fullName', 'phone', 'userTag'];
    _getConfig(`${ApiConst.apiPersonDomain}/list_render_info/driver/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiPersonDomain}/person/driver/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 伙伴数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const partner = dataSourcesObj.partner = {
  getData(params, callback) {
    const url = `${ApiConst.apiOrgDomain}/partner/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].orgName ? data[i].orgName : '-'}(${data[i].linkmanFullName ? data[i].linkmanFullName : '-'})`,
          'name': `${data[i].orgName ? data[i].orgName : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '伙伴';
  },
  getDetailUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/partner/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/partner/add.html';
  },
  getAddUrl(objectName) {
    // return `/partner/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/partner/add.html';
  },
  getColumns(cb) {
    const filter = ['orgName'];
    _getConfig(`${ApiConst.apiOrgDomain}/list_render_info/partner/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['orgName'];
    _getConfig(`${ApiConst.apiOrgDomain}/search_render_info/partner/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiOrgDomain}/partner/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 公司数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const company = dataSourcesObj.company = {
  getData(params, callback) {
    const url = `${ApiConst.apiPlatformDomain}/cert_org/org/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].ownerOrgName ? data[i].ownerOrgName : '-'}(${data[i].linkmanFullName ? data[i].linkmanFullName : '-'})`,
          'name': `${data[i].ownerOrgName ? data[i].ownerOrgName : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '公司';
  },
  getDetailUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/orgManagement/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/orgManagement/add.html';
  },
  getAddUrl(objectName) {
    // return `/partner/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/orgManagement/add.html';
  },
  getColumns(cb) {
    const success = {
      code: 200,
      content: [
        {
          showName: '公司名称',
          fieldConfigCode: 'orgName',
          elementCode: 'label',
          extraParams: '{"field1":"orgName","field2":"orgCode","field3":"pop"}'
        }
      ]
    };
    cb(success);
    return success;
  },
  getSearch(cb) {
    const success = {
      code: 200,
      content: [
        {
          showName: '公司名称',
          fieldConfigCode: 'orgName',
          elementCode: 'text',
          extraParams: '{"field1":"orgName", "placeholder1":"请输入公司名称"}'
        }
      ]
    };
    cb(success);
    return success;
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiPlatformDomain}/cert_org/org/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 银行账户数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const bankAccount = dataSourcesObj.bankAccount = {
  getData(params, callback) {
    const url = `${ApiConst.apiOrgDomain}/org/bank/account/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].bankName ? data[i].bankName : '-'}(${data[i].bankAccountNo ? data[i].bankAccountNo : '-'})`,
          'name': `${data[i].bankAccountName ? data[i].bankAccountName : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '银行账户';
  },
  getDetailUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/bankAccount/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/bankAccount/add.html';
  },
  getAddUrl(objectName) {
    // return `/partner/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/bankAccount/add.html';
  },
  getColumns(cb) {
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
    cb(success);
    return success;
  },
  getSearch(cb) {
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
    cb(success);
    return success;
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiOrgDomain}/org/bank/account/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 运单数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const waybill = dataSourcesObj.waybill = {
  getData(params, callback) {
    const url = `${ApiConst.apiWayBillDomain}/waybill/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].waybillNo ? data[i].waybillNo : ''}-${data[i].goodsName ? data[i].goodsName : ''}-${data[i].routeName ? data[i].routeName : ''}`,
          'name': `${data[i].waybillNo ? data[i].waybillNo : data[i].code}`,
          'data': data[i]
        });
      }

      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getDetailUrl(code, objectName) {
    return '/waybill/add.html';
    // return `/waybill/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
  },
  getObjectName() {
    return '运单';
  },
  getDetailUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/waybill/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/partner/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/waybill/add.html';
  },
  getAddUrl(objectName) {
    // return `/partner/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/waybill/add.html';
  },
  getColumns(cb) {
    const filter = ['waybillNo', 'goodsName'];
    _getConfig(`${ApiConst.apiWayBillDomain}/list_render_info/waybill/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['waybillNo'];
    _getConfig(`${ApiConst.apiWayBillDomain}/search_render_info/waybill/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiWayBillDomain}/waybill/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};


/**
 * 线路数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const route = dataSourcesObj.route = {
  getData(params, callback) {
    const url = `${ApiConst.apiLineDomain}/resource/route/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].routeName ? data[i].routeName : '-'}`,
          'name': `${data[i].routeName ? data[i].routeName : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '线路';
  },
  getDetailUrl(code, objectName) {
    // return `/route/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/route/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/route/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/route/add.html';
  },
  getAddUrl(objectName) {
    // return `/route/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/route/add.html';
  },
  getColumns(cb) {
    const filter = ['routeName', 'loadingOrg', 'unloadingOrg'];
    _getConfig(`${ApiConst.apiResourceDomain}/list_render_info/route/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['routeName'];
    _getConfig(`${ApiConst.apiResourceDomain}/search_render_info/route/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiResourceDomain}/resource/route/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};
/**
 * 运价数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const rates = dataSourcesObj.rates = {
  getData(params, callback) {
    const url = `${ApiConst.apiLineDomain}/resource/rates/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].ratesName ? data[i].ratesName : '-'}(${data[i].routeName ? data[i].routeName : '-'})`,
          'name': `${data[i].ratesName ? data[i].ratesName : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '运价';
  },
  getDetailUrl(code, objectName) {
    // return `/rates/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/rates/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/rates/add.html?code={code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/rates/add.html';
  },
  getAddUrl(objectName) {
    // return `/rates/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/rates/add.html';
  },
  getColumns(cb) {
    const filter = ['goodsName', 'goodsUnitPrice', 'clientFreightPrice', 'driverReferencePrice', 'goodsLossMethod', 'createTime'];
    _getConfig(`${ApiConst.apiResourceDomain}/list_render_info/rates/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['goodsName'];
    _getConfig(`${ApiConst.apiResourceDomain}/search_render_info/rates/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    // const url = `${ApiConst.apiResourceDomain}/resource/rates/list?${objToParamStr(paramsObj)}`;
    // _getListData(url, callback);
    RateService.list(paramsObj, callback);
  }
};

/**
 * 订单数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const logistics = dataSourcesObj.logistics = {
  getData(params, callback) {
    const url = `${ApiConst.apiLogisticsDomain}/logistics/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].clientOrgName ? data[i].clientOrgName : '-'} - ${data[i].logisticsNo ? data[i].logisticsNo : '-'}`,
          'name': `${data[i].logisticsNo ? data[i].logisticsNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '订单';
  },
  getDetailUrl(code, objectName) {
    // return `/logistics/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/logistics/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/logistics/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/logistics/add.html';
  },
  getAddUrl(objectName) {
    // return `/logistics/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/logistics/add.html';
  },
  getColumns(cb) {
    const filter = ['logisticsNo', 'clientOrg', 'route', 'goodsName', 'goodsWeight'];
    _getConfig(`${ApiConst.apiLogisticsDomain}/list_render_info/logistics/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['logisticsNo', 'clientOrg'];
    _getConfig(`${ApiConst.apiLogisticsDomain}/search_render_info/logistics/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiLogisticsDomain}/logistics/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};


/**
 * 合约据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const transportContract = dataSourcesObj.transportContract = {
  getData(params, callback) {
    const url = `${ApiConst.apiLogisticsDomain}/contract/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].clientOrgName ? data[i].clientOrgName : '-'} - ${data[i].contractNo ? data[i].contractNo : '-'}`,
          'name': `${data[i].contractNo ? data[i].contractNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    }, (err) => {
      console.error(err);
      callback(null, err);
    });
  },
  getObjectName() {
    return '合约';
  },
  getDetailUrl(code, objectName) {
    // return `/logistics_contract/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/contract/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/logistics_contract/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/contract/add.html';
  },
  getAddUrl(objectName) {
    // return `/logistics_contract/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/contract/add.html';
  },
  getColumns(cb) {
    const filter = ['contractNo', 'contractName', 'contractExpiryDate'];
    _getConfig(`${ApiConst.apiLogisticsDomain}/list_render_info/logisticsContract/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['contractNo', 'contractName'];
    _getConfig(`${ApiConst.apiLogisticsDomain}/search_render_info/logisticsContract/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiLogisticsDomain}/logistics_contract/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};


/**
 * 省据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const province = dataSourcesObj.province = {
  getData(params, callback) {
    const autoData = [];
    area.forEach((data) => {
      autoData.push({
        'id': `${data.code}`,
        'value': data.name,
        'name': data.name,
        'data': data.name
      });
    });
    callback(autoData, null);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};

/**
 * 市据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const city = dataSourcesObj.city = {
  getData(params, callback) {
    const autoData = [];
    for (let i = 0; i < area.length; i++) {
      const province = area[i];
      if (province.code == params.keyword) {
        const citys = province.citys;
        citys.forEach((data) => {
          autoData.push({
            'id': `${data.code}`,
            'value': data.name,
            'name': data.name,
            'data': data.name
          });
        });
        break;
      }
    }
    callback(autoData, null);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};
/**
 * 区据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const county = dataSourcesObj.county = {
  getData(params, callback) {
    const autoData = [];
    for (let i = 0; i < area.length; i++) {
      const province = area[i];
      const citys = province.citys;
      for (let j = 0; j < citys.length; j++) {
        const city = citys[j];
        if (city.code == params.keyword) {
          const areas = city.county;
          areas.forEach((data) => {
            autoData.push({
              'id': `${data.code}`,
              'value': data.name,
              'name': data.name,
              'data': data.name
            });
          });
          break;
        }
      }
    }
    callback(autoData, null);
  },
  getDetailUrl(code, objectName) {
    return null;
  }
};
/**
 * 运力数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const transport = dataSourcesObj.transport = {
  getData(params, callback) {
    const url = `${ApiConst.apiTransportDomain}/transport/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].mainTruckLicenseNo ? data[i].mainTruckLicenseNo : ''} - ${data[i].driverFullName ? data[i].driverFullName : ''} - ${data[i].trailerTruckLicenseNo ? data[i].trailerTruckLicenseNo : ''} - ${data[i].viceDriverFullName ? data[i].viceDriverFullName : ''}`,
          'name': `${data[i].mainTruckLicenseNo ? data[i].mainTruckLicenseNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    });
  },
  getObjectName() {
    return '车源';
  },
  getDetailUrl(code, objectName) {
    // return `/transport/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
    return '/truck/add.html';
  },
  getEditUrl(code, objectName) {
    // return `/transport/add.html?code=${code}&editable=true&objectName=${encodeURIComponent(objectName)}`;
    return '/transport/add.html';
  },
  getAddUrl(objectName) {
    // return `/transport/add.html?objectName=${encodeURIComponent(objectName)}`;
    return '/transport/add.html';
  },
  getColumns(cb) {
    // transportgetColumn(cb);
    // 车辆来源， 主车编号，挂车编号， 主驾， 主驾手机号，副驾，副驾手机号
    // 目前数据没有‘车辆来源’，暂时跳过
    const filter = ['mainTruck', 'trailerTruck', 'driver', 'driverPhone', 'viceDriver', 'viceDriverPhone'];
    _getConfig(`${ApiConst.apiTransportDomain}/detail_render_info/transport/list`, filter, cb);
  },
  getSearch(cb) {
    const filter = ['mainTruck', 'trailerTruck'];
    _getConfig(`${ApiConst.apiTransportDomain}/search_render_info/transport/list`, filter, cb);
  },
  getListData(paramsObj, callback) {
    const url = `${ApiConst.apiTransportDomain}/transport/list?${objToParamStr(paramsObj)}`;
    _getListData(url, callback);
  }
};

/**
 * 轮胎数据源
 * @param params <p>
 *                  keyword => 关键词
 *               </p>
 * @param callback
 */
const tyre = dataSourcesObj.tyre = {
  getData(params, callback) {
    const url = `${ApiConst.apiMaintenaceDomain}/maintenance_tyre_record/list?size=${PAGE_SIZE}&keyword=${params.keyword}`;
    get(url, (data) => {
      const len = data.length,
        autoData = [];
      for (let i = 0; i < len; i += 1) {
        autoData.push({
          'id': data[i].code,
          'value': `${data[i].tyreNo ? data[i].tyreNo : '-'} - ${data[i].truckLicenseNo ? data[i].truckLicenseNo : '-'}`,
          'name': `${data[i].tyreNo ? data[i].tyreNo : data[i].code}`,
          'data': data[i]
        });
      }
      callback(autoData, null);
    });
  },
  getDetailUrl(code, objectName) {
    return `/maintenance_tyre_record/add.html?code=${code}&editable=false&objectName=${encodeURIComponent(objectName)}`;
  }
};

function getAllListData(sources, params, cb) {
  let data = [],
    count = 0,
    total = 0;
  const len = sources.length;
  //content: data, total: total
  sources.forEach((val) => {
    dataSourcesObj[val].getListData(params, (success) => {
      if (success && success.content && success.total) {
        data = data.concat(success.content);
        total += success.total;
      }
      count += 1;
      if (count === len) {
        cb({ content: data, total: total }, null);
      }
    });
  });
}
function getAll(sources, params, cb) {
  let data = [],
    count = 0;
  const len = sources.length,
    cacheArray = ['province', 'city', 'county', 'goodsLossRation', 'goodsLoss', 'standardDistance', 'goodsNumber', 'goodsVolume', 'goodsWeight', 'chargeItemNumber', 'chargeItemPrice', 'chargeItemAmount', 'truckModel', 'truckSize', 'truckCarry', 'truckCubage', 'driverPrice', 'routeDuration', 'goodsPrice', 'carrierPrice'];
  sources.forEach((val) => {
    const key = `${val}-${Object.keys(params)}-${Object.values(params)}`;
    if (localStorage.getItem(key)) {
      data = data.concat(JSON.parse(localStorage.getItem(key)));
      count += 1;
      if (count === len) {
        cb(data, null);
      }
    } else {
      dataSourcesObj[val].getData(params, (success) => {
        if (cacheArray.indexOf(val) > -1) {
          localStorage.setItem(key, JSON.stringify(success));
        }
        data = data.concat(success);
        count += 1;
        if (count === len) {
          cb(data, null);
        }
      });
    }
  });
}

export {
  waybill,
  province,
  city,
  county,
  goodsLossRation,
  goodsLoss,
  standardDistance,
  goodsNumber,
  goodsVolume,
  goodsWeight,
  settleVolumeUnit,
  chargeItemNumber,
  chargeItemPrice,
  chargeItemAmount,
  truckModel,
  truckSize,
  truckCarry,
  truckCubage,
  driverPrice,
  routeDuration,
  goodsPrice,
  carrierPrice,
  truck,
  trailer,
  allTruck,
  driver,
  partner,
  company,
  bankAccount,
  route,
  rates,
  logistics,
  transportContract,
  transport,
  tyre,
  getAll,
  getAllListData
};
