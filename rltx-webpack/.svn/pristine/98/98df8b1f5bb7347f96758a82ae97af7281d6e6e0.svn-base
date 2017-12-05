/**
 * menu.js
 * Created by zyc on 17/6/22.
 */
import axios from 'axios';
import * as apiConst from './ApiConst';
import * as HTTP from './httpUtil';
import * as utils from './Utils';

// axios.defaults.withCredentials = true;

/*
 *  获取左上角车辆类型
 */
function getCarType(callback) {
  const url = `${apiConst.BaseDomain}/truck/truck/tag/list`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

/*
 *  获取左侧车辆列表
 */
function getSideList(obj, callback) {
  const oldurl = `${apiConst.BaseDomain}/truck/truck/list`,
    sendObj = obj;
  sendObj.page = document.getElementById('pageNumber').value;
  HTTP.get(oldurl, sendObj, (success, error) => {
    callback(success, error);
  });
}

/*
 *  获取车辆列表的位置等信息
 */
function getPosition(paramObj, callback) {
  const url = `${apiConst.BaseDomain}/lbs/lbs/location/current`;
  HTTP.post(url, paramObj, (success, error) => {
    callback(success, error);
  });
}

function getAddress(paramObj, callback) {
  const url = `${apiConst.BaseDomain}/lbs/lbs/get/address?type=1&lat=${paramObj.lat}&lng=${paramObj.lng}`;
  HTTP.get(url, {}, (success, error) => {
    callback(success, error);
  });
}

function getHistoryLocation(truckLicenseNo, paramObj, callback) {
  const url = `${apiConst.BaseDomain}/lbs/location/history/${truckLicenseNo}`;
  HTTP.get(url, paramObj, (success, error) => {
    callback(success, error);
  });
}

export { getCarType, getSideList, getPosition, getAddress, getHistoryLocation };
