import axios from 'axios';
import * as apiConst from './ApiConst';
import * as HTTP from './httpUtil';
import * as utils from './Utils';
function getPosition(paramObj, callback) {
    const url = `${apiConst.BaseDomain}/lbs/lbs/location/current`;
    HTTP.post(url, paramObj, (success, error) => {
        callback(success, error);
    });
}

function getAddress(paramObj, callback) {
    const url = `${apiConst.BaseDomain}/lbs/lbs/get/address?type=${paramObj.type}&lat=${paramObj.lat}&lng=${paramObj.lng}`;
    HTTP.get(url, {}, (success, error) => {
        callback(success, error);
    });
}
function getHistoryLocation(truckLicenseNo, paramObj, callback) {
    const url = `${apiConst.BaseDomain}/lbs/lbs/location/history/${truckLicenseNo}`;
    HTTP.get(url, paramObj, (success, error) => {
        callback(success, error);
    });
}

export { getPosition, getAddress, getHistoryLocation };
