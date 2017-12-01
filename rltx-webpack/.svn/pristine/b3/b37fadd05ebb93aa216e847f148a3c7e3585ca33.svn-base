/**
 * 车服务
 * Created by baipf on 2017/5/18.
 */

import * as utils from './Utils';
import * as apiConst from './ApiConst';

const axios = require('axios');
axios.defaults.withCredentials = true;

/**
 * 添加车信息
 * @param paramObj      对象
 *         truckLicenseNo        车牌号
 *         truckModelName        车型名称
 *         truckModelCode        车型code
 *         truckFixedMobile      随车手机
 *         truckBodyNo           车体号
 *         drivingLicenseNo      行驶证号
 *         operateLicenseNo      运营许可证
 *         truckLicenseType      牌照类型：无车承运人
 *         transportLicenseNo    道路运输证号：无车承运人
 *         truckLength           车长
 *         truckLengthUnitCode   车长单位编码
 *         truckWidth            车宽
 *         truckWidthUnitCode    车宽单位编码
 *         truckHeight           车高
 *         truckHeightUnitCode   车高单位编码
 *         truckTag              标签列表
 *         powerType             动力类型(1.油车 2.汽车)
 *         regTonnage            载重
 *         regTonnageUnitCode    载重单位编码
 *         cubage                容积
 *         cubageUnitCode        容积单位编码
 *         remark                备注
 *         description           描述
 *         isTrailer             是否挂车
 * @param callback      回调
 */
function add(paramObj, callback) {
  const apiUrl = `${apiConst.apiTruckDomain}/truck/add`;
  console.log(apiUrl);
  axios.post(apiUrl, utils.objToParamStr(paramObj)).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 编辑车信息
 * @param paramObj      对象
 *         truckCode             车编码
 *         truckLicenseNo        车牌号
 *         truckModelName        车型名称
 *         truckModelCode        车型code
 *         truckFixedMobile      随车手机
 *         truckBodyNo           车体号
 *         drivingLicenseNo      行驶证号
 *         operateLicenseNo      运营许可证
 *         truckLicenseType      牌照类型：无车承运人
 *         transportLicenseNo    道路运输证号：无车承运人
 *         truckLength           车长
 *         truckLengthUnitCode   车长单位编码
 *         truckWidth            车宽
 *         truckWidthUnitCode    车宽单位编码
 *         truckHeight           车高
 *         truckHeightUnitCode   车高单位编码
 *         truckTag              标签列表
 *         powerType             动力类型(1.油车 2.汽车)
 *         regTonnage            载重
 *         regTonnageUnitCode    载重单位编码
 *         cubage                容积
 *         cubageUnitCode        容积单位编码
 *         remark                备注
 *         description           描述
 *         isTrailer             是否挂车
 * @param callback      回调函数
 */
function edit(paramObj, callback) {
  const apiUrl = `${apiConst.apiTruckDomain}/truck/edit`;
  console.log(apiUrl);
  axios.post(apiUrl, utils.objToParamStr(paramObj)).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 车列表
 * @param paramObj   对象
 *         truckTagList       标签
 *         page               页码
 *         size               页长度
 * @param callback   回调函数
 */
function list(paramObj, callback) {
  const parObj = utils.objToObj(paramObj);
  axios.get(`${apiConst.apiTruckDomain}/truck/list/page`, {params: parObj}).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    console.log(err.config);
    callback(null, err);
  });
}

/**
 * 删除车辆
 * @param paramObj  参数对象
 *         truckCode 车辆编码
 * @param callback  回调函数
 */
function deleted(paramObj, callback) {
  const apiUrl = `${apiConst.apiTruckDomain}/truck/${paramObj.truckCode}/delete`;
  console.log(apiUrl);
  axios.get(apiUrl).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 绑定挂车
 * @param paramObj          参数对象
 *         mainTruckCode     主车
 *         trailerTruckCode  挂车
 * @param callback
 */
function bindTrailer(paramObj, callback) {
  const apiUrl = `${apiConst.apiTruckDomain}/truck/trailer/bind`;
  console.log(apiUrl);
  axios.post(apiUrl, `mainTruckCode=${paramObj.mainTruckCode}&trailerTruckCode=${paramObj.trailerTruckCode}`).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 解绑挂车
 * @param paramObj          参数对象
 *         mainTruckCode     主车
 *         trailerTruckCode  挂车
 * @param callback
 */
function unbindTrailer(paramObj, callback) {
  const apiUrl = `${apiConst.apiTruckDomain}/truck/trailer/unbind`;
  console.log(apiUrl);
  axios.post(apiUrl, `mainTruckCode=${paramObj.mainTruckCode}&trailerTruckCode=${paramObj.trailerTruckCode}`).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

/**
 * 根据code获取车辆信息
 * @param paramObj  参数对象
 *         truckCode  车辆code
 * @param callback  回调
 */
function get(paramObj, callback){
  const apiUrl = `${apiConst.apiTruckDomain}/truck/${paramObj.trackCode}/get`;
  console.log(apiUrl);
  axios.get(apiUrl).then(function (response) {
    // console.log(response);
    callback(response, null);
  }).catch(function (err) {
    callback(null, err);
  });
}

export { add, edit, list, deleted, bindTrailer, unbindTrailer, get };
