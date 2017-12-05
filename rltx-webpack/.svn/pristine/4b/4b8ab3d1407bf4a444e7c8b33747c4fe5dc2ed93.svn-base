'use strict';

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var mapTool = {
    delRepeat: function delRepeat(array) {
        var point = [];
        point.push(array[0]);
        var len = array.length;
        for (var i = 0; i < len; i ++) {
            for (var j = i + 1; j < len; j ++) {
                if (array[j].lat !== array[i].lat || array[j].lng !== array[i].lng) {
                    point.push(array[j]);
                    i = j;
                } else if (array[j].stop_time) {
                    array[i].stop_time = array[j].stop_time;
                }
            }
        }
        return point;
    },

    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function delta(lat, lng) {
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var dLat = this.transformLat(lng - 105.0, lat - 35.0);
        var dLon = this.transformLon(lng - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * this.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * this.PI);
        dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return {
            'lat': dLat,
            'lng': dLon
        };
    },
    gcj_encrypt: function gcj_encrypt(wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon)) {
            return {
                'lat': wgsLat,
                'lng': wgsLon
            };
        }
        var d = this.delta(wgsLat, wgsLon);
        return {
            'lat': wgsLat + d.lat,
            'lng': wgsLon + d.lng
        };
    },
    gcj_decrypt: function gcj_decrypt(gcjLat, gcjLon) {
        if (this.outOfChina(gcjLat, gcjLon)) {
            return {
                'lat': gcjLat,
                'lng': gcjLon
            };
        }
        var d = this.delta(gcjLat, gcjLon);
        return {
            'lat': gcjLat - d.lat,
            'lng': gcjLon - d.lng
        };
    },
    gcj_decrypt_exact: function gcj_decrypt_exact(gcjLat, gcjLon) {
        var initDelta = 0.01;
        var threshold = 0.000000001;
        var dLat = initDelta;
        var dLon = initDelta;
        var mLat = gcjLat - dLat;
        var mLon = gcjLon - dLon;
        var pLat = gcjLat + dLat;
        var pLon = gcjLon + dLon;
        var wgsLat = void 0;
        var wgsLon = void 0;
        var i = 0;
        while (1) {
            wgsLat = (mLat + pLat) / 2;
            wgsLon = (mLon + pLon) / 2;
            var tmp = this.gcj_encrypt(wgsLat, wgsLon);
            dLat = tmp.lat - gcjLat;
            dLon = tmp.lng - gcjLon;
            if (Math.abs(dLat) < threshold && Math.abs(dLon) < threshold) {
                break;
            }
            if (dLat > 0) {
                pLat = wgsLat;
            } else {
                mLat = wgsLat;
            }
            if (dLon > 0) {
                pLon = wgsLon;
            } else {
                mLon = wgsLon;
            }
            if (i > 10000) {
                break;
            }
            i += 1;
        }
        return {
            'lat': wgsLat,
            'lng': wgsLon
        };
    },
    bd_encrypt: function bd_encrypt(gcjLat, gcjLon) {
        var x = gcjLon;
        var y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        var bdLon = z * Math.cos(theta) + 0.0065;
        var bdLat = z * Math.sin(theta) + 0.006;
        return {
            'lat': bdLat,
            'lng': bdLon
        };
    },
    bd_decrypt: function bd_decrypt(bdLat, bdLon) {
        var x = bdLon - 0.0065;
        var y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        var gcjLon = z * Math.cos(theta);
        var gcjLat = z * Math.sin(theta);
        return {
            'lat': gcjLat,
            'lng': gcjLon
        };
    },
    mercator_encrypt: function mercator_encrypt(wgsLat, wgsLon) {
        var x = wgsLon * 20037508.34 / 180;
        var y = Math.log(Math.tan((90 + wgsLat) * (this.PI / 360))) / (this.PI / 180);
        y = y * 20037508.34 / 180;
        return {
            'lat': y,
            'lng': x
        };
    },
    mercator_decrypt: function mercator_decrypt(mercatorLat, mercatorLon) {
        var x = mercatorLon / 20037508.34 * 180;
        var y = mercatorLat / 20037508.34 * 180;
        y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180)) - this.PI / 2);
        return {
            'lat': y,
            'lng': x
        };
    },
    distance: function distance(latA, lngA, latB, lngB) {
        var earthR = 6371000;
        var x = Math.cos(latA * this.PI / 180) * Math.cos(latB * this.PI / 180) * Math.cos((lngA - lngB) * this.PI / 180);
        var y = Math.sin(latA * this.PI / 180) * Math.sin(latB * this.PI / 180);
        var s = x + y;
        if (s > 1) {
            s = 1;
        }
        if (s < -1) {
            s = -1;
        }
        var alpha = Math.acos(s);
        var distance = alpha * earthR;
        return distance;
    },
    outOfChina: function outOfChina(lat, lng) {
        if (lng < 72.004 || lng > 137.8347) {
            return true;
        }
        if (lat < 0.8293 || lat > 55.8271) {
            return true;
        }
        return false;
    },
    transformLat: function transformLat(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function transformLon(x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    },
    transformPoint: function transformPoint(point) {
        var pointArray = point;
        var len = pointArray.length;
        for (var i = 0; i < len; i += 1) {
            if (pointArray[i].lng && pointArray[i].lat) {
                var gcj = this.gcj_encrypt(pointArray[i].lat, pointArray[i].lng);
                var baidu = this.bd_encrypt(gcj.lat, gcj.lng);
                pointArray[i].lng = baidu.lng;
                pointArray[i].lat = baidu.lat;
            } else {
                pointArray.splice(i, 1);
            }
        }
        return pointArray;
    },
    getDirection: function getDirection(direction) {
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
    },
    stopTime: function stopTime(start, end) {
        var satrtTime = Date.parse(start);
        var endTime = Date.parse(end);
        var totalTime = (endTime - satrtTime) / 1000 / 60;
        var hour = 0;
        var day = 0;
        var minute = 0;
        var stopTime = '';
        var dayMinute = 24 * 60;
        var hourMinute = 60;
        switch (true) {
            case totalTime >= dayMinute:
                day = Math.floor(totalTime / dayMinute);
                hour = Math.floor((totalTime - day * dayMinute) / hourMinute);
                minute = totalTime - day * dayMinute - hour * hourMinute;
                stopTime = day.toFixed(0) + '\u5929' + hour.toFixed(0) + '\u5C0F\u65F6' + minute.toFixed(0) + '\u5206\u949F';
                break;
            case totalTime >= hourMinute && totalTime < dayMinute:
                hour = Math.floor(totalTime / hourMinute);
                minute = totalTime - hour * hourMinute;
                stopTime = hour.toFixed(0) + '\u5C0F\u65F6' + minute.toFixed(0) + '\u5206\u949F';
                break;
            default:
                stopTime = totalTime.toFixed(0) + '\u5206\u949F';
                break;
        }
        return stopTime;
    },
    getPostion: function getPostion(lng, lat) {
        var _this = this;

        var geoc = new BMap.Geocoder();
        var posPoint = new BMap.Point(lng, lat);
        var address = '';
        geoc.getLocation(posPoint, function(rs) {
            _this.address = rs.address;
        });
        address = this.address;
        this.address = '';
        return address;
    }
};

var MapLib = function() {
    function MapLib(ele, opt) {
        _classCallCheck(this, MapLib);

        this.ele = ele;
        this.opt = opt || {};
    }

    _createClass(MapLib, [{
        key: 'init',
        value: function init() {
            MapLib.loadMap();
            this.map = null;
            document.getElementById(this.ele).onselectstart = function() {
                event.returnValue = false;
            };
        }
    }, {
        key: 'initMap',
        value: function initMap() {
            var map = new BMap.Map(this.ele);
            var point = new BMap.Point(this.opt.initLongitude || 116.404, this.opt.initLatitude || 39.915);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom();
            this.map = map;
            var me = this;
            MapLib.setMap(map, this.opt);
            var handler = function hander() {
                var pointArray = me.pointArray;
                if (me.pointArray) {
                    me.setLu(pointArray);
                    me.pointArray = null;
                }
            };
            if (this.lu) {
                handler();
                this.islushu = true;
            } else {
                this.islushu = true;
                document.addEventListener('lushu', handler, false);
            }
        }
    }, {
        key: 'initLu',
        value: function initLu(pointArray, maxLen) {
            this.pointArray = pointArray;
            this.lu = true;
            this.maxLen = maxLen;
            var lushu = new Event('lushu');
            document.dispatchEvent(lushu);
            if (this.islushu) {
                var me = this;
                if (me.pointArray) {
                    me.setLu(pointArray);
                    me.pointArray = null;
                }
            }
        }
    }, {
        key: 'setLu',
        value: function setLu(pointArray) {
            var _this2 = this;

            var map = this.map;
            map.clearOverlays();
            var pointAll = pointArray;
            var opt = this.opt;
            MapLib.drawPoint(pointAll, map, this.maxLen);
            if (document.getElementById('$baidulushu')) {
                this.drawLuShu(pointAll, map);
            } else {
                MapLib.loadLushu(opt).then(function() {
                    _this2.drawLuShu(pointAll, map);
                });
            }
            this.pointAll = pointAll;
        }
    }, {
        key: 'drawLuShu',
        value: function drawLuShu(pointArray, map) {
            MapLib.linkPoint(pointArray, map);
            var lushu = null;
            lushu = new BMapLib.LuShu(map, pointArray, {
                defaultContent: '',
                autoView: true,
                icon: new BMap.Icon(MapLib.carImg, new BMap.Size(36, 16)),
                speed: 2000,
                enableRotation: true,
                landmarkPois: []
            });
            this.lushu = lushu;
        }
    }, {
        key: 'startLushu',
        value: function startLushu() {
            this.lushu.start();
            if (this.lushu.i < 1) {
                MapLib.showLuShuInfo(this.pointAll, this.lushu, this.map);
            }
            MapLib.removeLushuIcon(this.map);
        }
    }, {
        key: 'stopLushu',
        value: function stopLushu() {
            this.lushu.stop();
        }
    }, {
        key: 'pauseLushu',
        value: function pauseLushu() {
            this.lushu.pause();
        }
    }, {
        key: 'returToStart',
        value: function returToStart() {
            this.lushu.stop();
            this.lushu.removeMaker();
            this.lushu.addMarker();
            MapLib.removeLushuIcon(this.map);
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(times) {
            this.lushu.setSpeed(times);
        }
    }], [{
        key: 'loadJs',
        value: function loadJs(scriptId, src) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.id = scriptId;
            document.body.appendChild(script);
            var promise = new Promise(function(resolve) {
                script.addEventListener('load', function() {
                    resolve();
                });
            });
            return promise;
        }
    }, {
        key: 'loadMap',
        value: function loadMap() {
            var key = '0splGL787be69VgsOZX2t3vMvw016i0F';
            MapLib.loadJs('$baidumapapi', 'http://api.map.baidu.com/api?v=2.0&ak=' + key + '&callback=mapLib.initMap');
        }
    }, {
        key: 'loadLushu',
        value: function loadLushu(opt) {
            return MapLib.loadJs('$baidulushu', opt.lushu || './lib/LuShu/LuShu.js');
        }
    }, {
        key: 'setMap',
        value: function setMap(map, opt) {
            map.enableScrollWheelZoom();
            MapLib.pointImg = opt.pointImg || './build/img/blue_dot.png';
            MapLib.carImg = opt.carImg || './build/img/car.png';
            MapLib.startImg = opt.startImg || './build/img/map_start.png';
            MapLib.finishImg = opt.finishImg || './build/img/map_finish.png';
            var topLeftControl = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            });
            var topLeftNavigation = new BMap.NavigationControl();
            var mapType = new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
            });
            map.addControl(topLeftControl);
            map.addControl(topLeftNavigation);
            map.addControl(mapType);
        }
    }, {
        key: 'drawPoint',
        value: function drawPoint(pointArray, map, maxLen) {
            var myIcon = new BMap.Icon(MapLib.pointImg, new BMap.Size(12, 12));
            var startIcon = new BMap.Icon(MapLib.startImg, new BMap.Size(36, 36));
            var finishIcon = new BMap.Icon(MapLib.finishImg, new BMap.Size(36, 36));
            var carIcon = new BMap.Icon(MapLib.carImg, new BMap.Size(36, 36));

            function addMarker(bdPoint, point, pointIcon) {
                var marker = null;
                if (pointIcon) {
                    marker = new BMap.Marker(bdPoint, {
                        icon: pointIcon
                    });
                } else {
                    marker = new BMap.Marker(bdPoint);
                }
                marker.addEventListener('mouseover', function() {
                    MapLib.showBdInfo(point, map);
                });
                marker.addEventListener('mouseout', function() {
                    MapLib.hideBdInfo(map);
                });
                map.addOverlay(marker);
            }
            var len = pointArray.length;
            var defaultPoint = new BMap.Point(pointArray[0].lng, pointArray[0].lat);
            var startPoint = new BMap.Point(pointArray[0].lng, pointArray[0].lat);
            var finishPoint = new BMap.Point(pointArray[len - 1].lng, pointArray[len - 1].lat);
            map.centerAndZoom(defaultPoint, 14);
            addMarker(startPoint, pointArray[0], carIcon);
            addMarker(startPoint, pointArray[0], startIcon);
            addMarker(finishPoint, pointArray[len - 1], finishIcon);
            if (maxLen && maxLen < len) {
                var interval = Math.floor(len / maxLen);
                for (var i = 1; i < len - 1; i += 1) {
                    var bdPointMax = new BMap.Point(pointArray[i].lng, pointArray[i].lat);
                    if (pointArray[i].stop_time) {
                        addMarker(bdPointMax, pointArray[i]);
                    } else if (i % interval === 0) {
                        addMarker(bdPointMax, pointArray[i], myIcon);
                    }
                    bdPointMax = null;
                }
            } else {
                for (var _i = 1; _i < len - 1; _i += 1) {
                    var bdPoint = new BMap.Point(pointArray[_i].lng, pointArray[_i].lat);
                    if (pointArray[_i].stop_time) {
                        addMarker(bdPoint, pointArray[_i]);
                    } else {
                        addMarker(bdPoint, pointArray[_i], myIcon);
                    }
                }
            }
        }
    }, {
        key: 'linkPoint',
        value: function linkPoint(pointArray, map) {
            var bdPoint = [];
            var len = pointArray.length;
            for (var i = 0; i < len; i += 1) {
                bdPoint.push(new BMap.Point(pointArray[i].lng, pointArray[i].lat));
            }
            var polyline = new BMap.Polyline(bdPoint, {
                strokeColor: 'blue',
                strokeWeight: 3,
                strokeOpacity: 0.5
            });
            map.addOverlay(polyline);
            map.setViewport(bdPoint);
        }
    }, {
        key: 'countDistance',
        value: function countDistance(pointA, pointB, map) {
            var point1 = new BMap.Point(pointA.lng, pointA.lat);
            var point2 = new BMap.Point(pointB.lng, pointB.lat);
            var distance = map.getDistance(point1, point2) / 1000;
            return distance;
        }
    }, {
        key: 'removeLushuIcon',
        value: function removeLushuIcon(map) {
            var allOverlay = map.getOverlays();
            var len = allOverlay.length;
            for (var i = 0; i < len - 1; i += 1) {
                if (allOverlay[i].getIcon) {
                    if (allOverlay[i].getIcon().imageUrl === MapLib.carImg && i === 0) {
                        map.removeOverlay(allOverlay[i]);
                        return;
                    }
                }
            }
        }
    }, {
        key: 'showLuShuInfo',
        value: function showLuShuInfo(point, lushu) {
            var html = void 0;
            var count = 0;
            var len = point.length;
            var distance = 0;
            var handler = function hander() {
                if (count === len - 1) {
                    count = 0;
                    return false;
                }
                if (count === 0) {
                    distance = 0;
                }
                distance += Number(mapTool.distance(point[count].lat, point[count].lng, point[count + 1].lat, point[count + 1].lng)) / 1000;
                lushu.showInfoWindow();
                count += 1;
                html = '<div style="text-align: left;"><span>\u5F53\u524D\u91CC\u7A0B\uFF1A</span>' + distance.toFixed(2) + '\u516C\u91CC</div>';
                html += '<div style="text-align: left;"><span>\u5F53\u524D\u901F\u5EA6\uFF1A</span>' + (point[count].speed ? point[count].speed : 0) + 'km/\u5C0F\u65F6</div>';
                html += '<div style="text-align: left;"><span>\u5F53\u524D\u65F6\u95F4\uFF1A</span>' + point[count].record_time + '</div>';
                if (point.truckLicenseNo) {
                    html += '<div style="text-align: left;"><span>\u8F66\u724C\u53F7\uFF1A</span>' + point.truckLicenseNo + '</div>';
                }
                if (point.hz) {
                    html += '<div style="text-align: left;"><span>\u8D27\u4E3B\uFF1A</span>' + point.hz + '</div>';
                }
                if (point.tdh) {
                    html += '<div style="text-align: left;"><span>\u63D0\u5355\u53F7\uFF1A</span>' + point.tdh + '</div>';
                }
                if (point.hpxx) {
                    html += '<div style="text-align: left;"><span>\u8D27\u54C1\u4FE1\u606F\uFF1A</span>' + point.hpxx + '</div>';
                }
                lushu.setHtml(html);
            };
            document.removeEventListener('moveNext', handler, false);
            document.addEventListener('moveNext', handler, false);
        }
    }, {
        key: 'showBdInfo',
        value: function showBdInfo(point, map) {
            var html = '';
            if (point.stop_time) {
                html = '<div><span>\u505C\u7559\u65F6\u95F4\uFF1A</span>' + mapTool.stopTime(point.record_time, point.stop_time) + '</div><div><span>\u5F00\u59CB\u65F6\u95F4\uFF1A</span>' + point.record_time + '</div>';
                html += '<div><span>\u7ED3\u675F\u65F6\u95F4\uFF1A</span>' + point.stop_time + '</div><div><span>\u505C\u7559\u4F4D\u7F6E\uFF1A</span>' + getAddress(point.lng, point.lat) + '</div>';
            } else {
                html = '<div><span>\u5F53\u524D\u65F6\u95F4\uFF1A</span>' + point.record_time + '</div>';
                html += '<div><span>\u5F53\u524D\u4F4D\u7F6E\uFF1A</span>' + mapTool.getPostion(point.lng, point.lat) + '</div>';
                html += '<div><span>\u5F53\u524D\u901F\u5EA6\uFF1A</span>' + point.speed + 'km/\u5C0F\u65F6</div>';
            }
            if (point.truckLicenseNo) {
                html += '<div style="text-align: left;"><span>\u8F66\u724C\u53F7\uFF1A</span>' + point.truckLicenseNo + '</div>';
            }
            if (point.hz) {
                html += '<div style="text-align: left;"><span>\u8D27\u4E3B\uFF1A</span>' + point.hz + '</div>';
            }
            if (point.tdh) {
                html += '<div style="text-align: left;"><span>\u63D0\u5355\u53F7\uFF1A</span>' + point.tdh + '</div>';
            }
            if (point.hpxx) {
                html += '<div style="text-align: left;"><span>\u8D27\u54C1\u4FE1\u606F\uFF1A</span>' + point.hpxx + '</div>';
            }
            var infoWindow = new BMap.InfoWindow(html, null);
            var bdPoint = new BMap.Point(point.lng, point.lat);
            map.openInfoWindow(infoWindow, bdPoint);
        }
    }, {
        key: 'hideBdInfo',
        value: function hideBdInfo(map) {
            map.closeInfoWindow();
        }
    }]);

    return MapLib;
}();

window.mapTool = mapTool;
window.MapLib = MapLib;