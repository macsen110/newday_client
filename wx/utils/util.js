const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const prefixUrl = 'https://www.macsen318.com';
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(options) {

  return new Promise((res, rej) => {
    let obj = {};
    Object.assign(obj, options, {
      url: prefixUrl + options.url,
      success: (data) => res(data),
      falid: (data) => rej(data)
    })
    console.log(obj)
    wx.request(
      obj
    )
  })
}
export default {
  formatTime: formatTime,
  http: http
}
