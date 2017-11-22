const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
class xhr {
  constructor(opt) {

    this.method = 'GET';
    this.aysc = true;
    this.sendData = null;
    this.cache = true;
    if (typeof opt === 'object') {
      Object.assign(this, opt);
    }

    this.send();

  }
  send() {
    

    
  }
  done(data) {

  }
  faild() {

  }
}
module.exports = {
  formatTime: formatTime,
  xhr: new xhr

}
