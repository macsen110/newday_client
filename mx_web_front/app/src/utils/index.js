import config from '../config';
import _xhr from './xhr';
function http(options) {
  return new Promise((res, rej) => {
    new _xhr({
      url: config.http.url + options.url,
      method: options.method,
      sendData: options.sendData || null,
      done(callData) {
        res(callData)
      },
      faild() {
        var error = new Error('something wrong')
        rej(error)
      }
    })
  }) 
}
export default {
  http
}