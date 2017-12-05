/**
 * menu.js
 * Created by dsky on 17/6/6.
 */
import axios from 'axios';
import * as apiConst from './ApiConst';
import * as HTTP from './httpUtil';

axios.defaults.withCredentials = true;

function getMenu(callback) {
  const url = `${apiConst.apiPermissionDomain}/permission/user/resource/list/self`;
  HTTP.get(url, {}, (success, error) => {
  	callback(success, error);
  });
}

export { getMenu };