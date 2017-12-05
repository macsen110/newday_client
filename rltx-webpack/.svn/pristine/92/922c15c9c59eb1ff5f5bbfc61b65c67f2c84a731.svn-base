/* eslint-disable no-mixed-operators */
/* eslint-disable one-var */
/* eslint-disable no-empty */
export default {
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  },
  transformLon(x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
    return ret;
  },
  delta(lat, lng) {
    const a = 6378245.0;
    const ee = 0.00669342162296594323;
    let dLat = this.transformLat(lng - 105.0, lat - 35.0);
    let dLon = this.transformLon(lng - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * this.PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * this.PI);
    dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    return {
      'lat': dLat,
      'lng': dLon
    };
  },
  outOfChina(lat, lng) {
    if (lng < 72.004 || lng > 137.8347) {
      return true;
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true;
    }
    return false;
  },
  gcj_encrypt(wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) {
      return {
        'lat': wgsLat,
        'lng': wgsLon
      };
    }
    const d = this.delta(wgsLat, wgsLon);
    return {
      'lat': wgsLat + d.lat,
      'lng': wgsLon + d.lng
    };
  },
  distance(latA, lngA, latB, lngB) {
    const earthR = 6371000,
      x = Math.cos(latA * this.PI / 180) * Math.cos(latB * this.PI / 180) * Math.cos((lngA - lngB) * this.PI / 180),
      y = Math.sin(latA * this.PI / 180) * Math.sin(latB * this.PI / 180);
    let s = x + y;
    if (s > 1) {
      s = 1;
    }
    if (s < -1) {
      s = -1;
    }
    const alpha = Math.acos(s),
      distance = alpha * earthR;
    return distance;
  },
  bd_encrypt(gcjLat, gcjLon) {
    const x = gcjLon;
    const y = gcjLat;
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    const bdLon = z * Math.cos(theta) + 0.0065;
    const bdLat = z * Math.sin(theta) + 0.006;
    return {
      'lat': bdLat,
      'lng': bdLon
    };
  },
  transformPoint(point) {
    // const pointArray = points;
    // const len = pointArray.length;
    // for (let i = 0; i < len; i += 1) {
    //   if (pointArray[i].lng && pointArray[i].lat) {
    //     const gcj = this.gcj_encrypt(pointArray[i].lat, pointArray[i].lng);
    //     const baidu = this.bd_encrypt(gcj.lat, gcj.lng);
    //     pointArray[i].lng = baidu.lng;
    //     pointArray[i].lat = baidu.lat;
    //   } else {
    //     pointArray.splice(i, 1);
    //   }
    // }
    // return pointArray;
    if (point.lng && point.lat) {
      const gcj = this.gcj_encrypt(point.lat, point.lng);
      const baidu = this.bd_encrypt(gcj.lat, gcj.lng);
      // point.lng = baidu.lng;
      // point.lat = baidu.lat;
      return baidu;
    }
    return point;
  },
  transformPoints(points) {
    const pointArray = points;
    const len = pointArray.length;
    for (let i = 0; i < len; i += 1) {
      if (pointArray[i].lng && pointArray[i].lat) {
        const gcj = this.gcj_encrypt(pointArray[i].lat, pointArray[i].lng);
        const baidu = this.bd_encrypt(gcj.lat, gcj.lng);
        pointArray[i].lng = baidu.lng;
        pointArray[i].lat = baidu.lat;
      } else {
        pointArray.splice(i, 1);
      }
    }
    return pointArray;
  },
  delRepeat(array) {
    const len = array.length;
    if (len > 1) {
      const arr = [];
      array.forEach((a) => {
        a.pos_str = '查看位置';
        a.directionDec = this.getDirection(a.direction);
        a.stop_point = !!a.stop_time;
      }, this);

      arr.push(array[0]);
      for (let i = 1; i < len - 2; i++) {
        for (let j = i + 1; j < len; j++) {
          if (array[i].lng === array[j].lng && array[i].lat === array[j].lat) {
          } else {
            arr.push(array[j]);
            i = j;
            break;
          }
        }
      }
      return arr;
    }
    return array;
  },
  getDirection(direction) {
    switch (true) {
      case direction === 0:
        return '北方';
      case direction === 90:
        return '东方';
      case direction === 180:
        return '南方';
      case direction === 270:
        return '西方';
      case direction === 45:
        return '东北方';
      case direction === 135:
        return '东南方';
      case direction === 225:
        return '西南方';
      case direction === 315:
        return '西北方';
      case direction > 0 && direction < 45:
        return '东北方偏北';
      case direction > 45 && direction < 90:
        return '东北方偏东';
      case direction > 90 && direction < 135:
        return '东南方偏东';
      case direction > 135 && direction < 180:
        return '东南方偏南';
      case direction > 180 && direction < 225:
        return '西南方偏南';
      case direction > 225 && direction < 270:
        return '西南方偏西';
      case direction > 270 && direction < 315:
        return '西北方偏西';
      case direction > 315 && direction < 360:
        return '西北方偏北';
      default:
        return '西北方偏北';
    }
  }
};
