import * as utils from '../../api/Utils';

const axios = require('axios');

function isArray(val) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(val);
  }
  return Object.prototype.toString.call(val) === '[object Array]';
}

function merge(vueInstance, domainObject, fieldConfig, data) {
  let counter = 0;
  Object.keys(data).forEach((key) => {
    if (isArray(data[key])) {
      vueInstance.$set(domainObject, key, data[key]);
    } else {
      vueInstance.$set(domainObject, key, utils.NumtoStr(data[key]));
    }
    counter += 1;
  });
  fieldConfig.field.forEach((field) => {
    field.extraParams.forEach((property) => {
      if (!(property.field in domainObject)) {
        if (property.default) {
          vueInstance.$set(domainObject, property.field, property.default);
        } else {
          vueInstance.$set(domainObject, property.field, null);
        }
        counter += 1;
      }
    });
  });
  return counter;
}

function request(requestUrl) {
  return axios({
    method: 'get',
    url: requestUrl,
    headers: { 'Accept': 'application/json' }
  });
}

function initForAdd(vueInstance, domainObject, fieldConfigUrl, callback) {
  const localStorage = window.localStorage;
  let counter = 0;
  axios.all([request(fieldConfigUrl)])
    .then(axios.spread((eleConfig) => {
      const eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo')),
        fieldConfig = utils.getParam(eleConfig, eleDefine, eleInfo);
      fieldConfig.field.forEach((field) => {
        field.extraParams.forEach((property) => {
          if (property.default) {
            vueInstance.$set(domainObject, property.field, property.default);
          } else {
            vueInstance.$set(domainObject, property.field, null);
          }
          counter += 1;
        });
      });
      callback(fieldConfig, counter);
    }));
}

function initForEdit(vueInstance, domainObject, fieldConfigUrl, data, callback) {
  const localStorage = window.localStorage;
  axios.all([request(fieldConfigUrl)])
    .then(axios.spread((eleConfig) => {
      const eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo')),
        fieldConfig = utils.getParam(eleConfig, eleDefine, eleInfo),
        counter = merge(vueInstance, domainObject, fieldConfig, data);
      callback(fieldConfig, counter);
    }));
}

export { initForAdd, initForEdit };
