/**
 * menu.js
 * Created by zhangyc on 17/6/7.a
 */

/* globals BMap, BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_LEFT, BMAP_NAVIGATION_CONTROL_SMALL, mapTool */

import { getCarType, getPosition, getAddress } from '../../api/carServer';
import { dateFormat } from '../../api/Utils';
import { removeClass } from '../../api/classUtil';
// import { truckSize, truckCarry } from '../../api/DataSourceService';
import * as ApiConst from '../../api/ApiConst';

const map = new BMap.Map('mapContent'),
  axios = require('axios'),
  lengthUnit = {},
  carryUnit = {},
  TRUCK_MODEL_DATA = require('../../api/TruckModelData').list;

require('./labMap.js');
require('../public.js');

let sideList = [];

// 计算左侧列表和地图的高度
function initHeight() {
  const mapTruckList = document.getElementsByClassName('ml-bd')[0],
    mapContent = document.getElementById('mapContent'),
    listRealheight = window.innerHeight - 168,
    MapRealHeight = window.innerHeight - 70,
    Unit = 'px',
    ListHeight = listRealheight + Unit,
    MapHeight = MapRealHeight + Unit;
  mapTruckList.style.height = ListHeight;
  mapContent.style.height = MapHeight;
}

window.onresize = initHeight;
initHeight();

function initCarType() {
  getCarType((success) => {
    const renderList = success.content,
      truckType = document.getElementById('truckType');
    renderList.forEach((element) => {
      const option = document.createElement('option');
      option.innerHTML = element.tag;
      option.value = element.tag;
      truckType.appendChild(option);
    });
  });
}

initCarType();

// 初始化地图控件
function initMap(lat, lng) {
  // 默认指到北京
  const lat1 = lat || '39.915',
    lng1 = lng || '116.404',
    point = new BMap.Point(lng1, lat1),
    topLeftControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }),
    topLeftNavigation = new BMap.NavigationControl(),
    topRightNavigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL });
  map.centerAndZoom(point, 6);
  map.addControl(topLeftControl);
  map.addControl(topLeftNavigation);
  map.addControl(topRightNavigation);
  map.enableScrollWheelZoom(true);
}

// 设置覆盖物
function showMask(list) {
  list.forEach((element) => {
    const pt = new BMap.Point(element.lng, element.lat),
      myIcon = new BMap.Icon('../static/img/truck_alarm.png', new BMap.Size(20, 32), {
        anchor: new BMap.Size(10, 30)
      }),
      marker = new BMap.Marker(pt, { icon: myIcon }),
      obj = element,
      opts = {
        width: 250,     // 信息窗口宽度
        height: 180     // 信息窗口高度
      },
      recordTime = dateFormat(obj.recordTime),
      template = `<div class='content'>
        <div class='map-header'>
          <a class="truck_detail" target="_blank">${obj.handle}</a>
          <span class='truck-tag'>自有</span>
          <span class="truck-tag ts-grey">GPS</span>
        </div>
        <div class='map-content'>
          <ul>
            <li><em class="truck-role">主</em></li>
            <li class="copilot"><em class="truck-role">副</em></li>
          </ul>
          <div class="carDetail">
            <p>车型：</p><p>车辆位置:</p><p>定位时间:${recordTime}</p>
          </div>
        </div>
        <div class='map-footer'>
          <a class="btn-grey" target="_blank" href="/car/track.html?${element.handle}">车辆轨迹</a>
          <a class="btn-grey" target="_blank" href="javascript:;">车辆详情</a>
        </div>
      </div>`,
      infoWindow = new BMap.InfoWindow(template, opts);
    // 将标注添加到地图中
    getAddress({
      type: '1',
      lat: element.lat,
      lng: element.lng
    }, (success) => {
      console.log(success);
    });
    map.addOverlay(marker);
    // 获取左侧列表的点击控件
    // sideList.forEach((listElement) => {
    for (let i = 0, len = sideList.length; i < len; i++) {
      if (sideList[i].truckLicenseNo === element.handle) {
        const truckLicenseNo = sideList[i].truckLicenseNo,
          querypre = 'truckCode',
          clickTarget = document.getElementById(querypre + truckLicenseNo);
        clickTarget.addEventListener('click', () => {
          map.openInfoWindow(infoWindow, pt);
        });
        break;
      }
    }
    // });
    marker.addEventListener('click', () => {
      map.openInfoWindow(infoWindow, pt);
    });
  });
}

// 获取左侧车辆列表
function refreshList() {
  const listObj = {},
    pageNumber = document.getElementById('pageNumber').value,
    searchName = document.getElementById('truckLicenseNo').value,
    truckType = document.getElementById('truckType').value;
  listObj.size = 10;
  listObj.page = pageNumber || 1;
  if (searchName) {
    listObj.truckLicenseNo = searchName;
    listObj.page = 1;
  }
  if (truckType) {
    listObj.truckTagList = truckType;
    listObj.page = 1;
  }
  // getSideList(listObj, (res) => {
  //   const appendBox = document.getElementById('map-truck-list'),
  //     searchList = [],
  //     reslist = res.content,
  //     totlePage = document.getElementById('totlePage');
  //   sideList = res.content;
  //   totlePage.value = Math.ceil(res.total / listObj.size);
  //   appendBox.innerHTML = '';
  //   // 生成左侧列表
  //   for (let i = 0, len = reslist.length; i < len; i++) {
  //     searchList.push(reslist[i].truckLicenseNo);
  //     const li = document.createElement('li'),
  //       span = document.createElement('span'),
  //       span1 = document.createElement('span'),
  //       a = document.createElement('span'),
  //       p1 = document.createElement('p'),
  //       p2 = document.createElement('p'),
  //       em1 = document.createElement('em'),
  //       em2 = document.createElement('em'),
  //       strong = document.createElement('strong'),
  //       d = ',',
  //       f = '-',
  //       pre = 'truckCode';
  //     let model = '-,',
  //       model1 = '-,',
  //       model2 = '-';
  //     if (reslist[i].truckModelName) {
  //       model = reslist[i].truckModelName ? reslist[i].truckModelName + d : f + d;
  //     }
  //     console.log(model);
  //     if (reslist[i].truckLength || reslist[i].truckLengthUnitCode) {
  //       model1 = reslist[i].truckLength ? reslist[i].truckLength : f;
  //       console.log(`model1:${model1}`);
  //       if (model1 !== '-') {
  //         model1 += reslist[i].truckLengthUnitCode ? reslist[i].truckLengthUnitCode : f;
  //         console.log(unit[reslist[i].truckLengthUnitCode]);
  //         console.log(unit[1]);
  //         console.log(`1model1:${model1}`);
  //       } else {
  //         model1 += reslist[i].truckLengthUnitCode ? reslist[i].truckLengthUnitCode : '';
  //         console.log(`2model1:${model1}`);
  //       }
  //       model1 += d;
  //       console.log(`3model1:${model1}`);
  //     }
  //     if (reslist[i].regTonnage || reslist[i].regTonnageUnitCode) {
  //       model2 = reslist[i].regTonnage ? reslist[i].regTonnage : '-';
  //       if (model2 !== '-') {
  //         model2 += reslist[i].regTonnageUnitCode ? reslist[i].regTonnageUnitCode : f;
  //       } else {
  //         model2 += reslist[i].regTonnageUnitCode ? reslist[i].regTonnageUnitCode : '';
  //       }
  //       model2 += d;
  //     }
  //     li.id = pre + reslist[i].truckLicenseNo;
  //     a.className = 'truck_detail';
  //     // a.target = '_blank';
  //     // a.href = `/truck/add.html?${reslist[i].code}`;
  //     /* eslint no-script-url: "error"*/
  //     // a.href = 'javascript:void(0);';
  //     a.setAttribute('data-link', `/truck/add.html?${reslist[i].code}`);
  //     a.setAttribute('data-title', '车辆详情');
  //     a.innerHTML = reslist[i].truckLicenseNo;
  //     span.className = 'sequence';
  //     span.innerHTML = i + 1;
  //     p1.className = 'truck-id';
  //     p1.setAttribute('data-truck-license', reslist[i].truckLicenseNo);
  //     p2.className = 'truck-info';
  //     // p2.innerHTML = model + model1 + model2;
  //     em1.className = 'truck-tag';
  //     // em1.innerHTML = '自有';
  //     em1.innerHTML = reslist[i].truckTag ? reslist[i].truckTag : '';
  //     em2.className = 'truck-tag ts-grey hide';
  //     em2.innerHTML = 'gps';
  //     span1.className = 'running-status fr';
  //     span1.appendChild(strong);
  //     p1.appendChild(span1);
  //     p1.appendChild(a);
  //     if (reslist[i].truckTag) {
  //       p1.appendChild(em1);
  //     }
  //     p1.appendChild(em2);
  //     li.appendChild(span);
  //     li.appendChild(p1);
  //     li.appendChild(p2);
  //     appendBox.appendChild(li);
  //   }
  //   document.getElementById('pageNumber').value = listObj.page;
  //   // 获取坐标地址
  //   // todo []时不请求
  //   if (searchList.length > 0) {
  //     getPosition(searchList, (res1, err) => {
  //     // 获取的坐标转换成百度坐标
  //       const list = mapTool.transformPoint(res1.content);
  //       let lat = 0,
  //         lng = 0;
  //       list.forEach((element) => {
  //       // 遍历坐标
  //         lat += parseFloat(element.lat);
  //         lng += parseFloat(element.lng);
  //       // 修改相关属性
  //         const dom = document.getElementById(`truckCode${element.handle}`);
  //         if (element.source === 'gps') {
  //           removeClass(dom.getElementsByClassName('hide')[0], 'hide');
  //         }
  //         if (element.status) {
  //           const targetDom = dom.getElementsByClassName('running-status')[0].getElementsByTagName('strong')[0];
  //           switch (element.status) {
  //             case 1:
  //               targetDom.innerHTML = '正常';
  //               break;
  //             case 2:
  //               targetDom.innerHTML = '停留';
  //               break;
  //             case 3:
  //               targetDom.innerHTML = '异常';
  //               break;
  //             default:
  //               break;
  //           }
  //         }
  //       });
  //       lat /= res1.content.length;
  //       lng /= res1.content.length;
  //       initMap(lat, lng);
  //       showMask(list);
  //       if (err) {
  //         console.log(err);
  //       }
  //     });
  //   } else {
  //     document.getElementById('pageNumber').value = '0';
  //     initMap(null, null);
  //   }
  // });

  listObj.page = document.getElementById('pageNumber').value;
  function getSide() {
    return axios({
      method: 'get',
      url: `${ApiConst.BaseDomain}/truck/truck/list`,
      params: listObj
    });
  }
  function getSizeUnit() {
    return axios({
      method: 'get',
      url: `${ApiConst.apiOrgConfigDomain}/measure_unit/truck.size/get`,
      headers: { 'Accept': 'application/json' }
    });
  }

  function getCarryUnit() {
    return axios({
      method: 'get',
      url: `${ApiConst.apiOrgConfigDomain}/measure_unit/truck.carry/get`,
      headers: { 'Accept': 'application/json' }
    });
  }
  axios.all([getSide(), getSizeUnit(), getCarryUnit()])
    .then(axios.spread((response, sizeUnitResult, carryUnitResult) => {
      // 解析单位信息
      sizeUnitResult.data.content.forEach((element) => {
        lengthUnit[element.code] = element.codeName;
      });
      carryUnitResult.data.content.forEach((element) => {
        carryUnit[element.code] = element.codeName;
      });
      const appendBox = document.getElementById('map-truck-list'),
        searchList = [],
        res = response.data,
        reslist = res.content,
        totlePage = document.getElementById('totlePage');
      sideList = res.content;
      totlePage.value = Math.ceil(res.total / listObj.size);
      appendBox.innerHTML = '';
      // 生成左侧列表
      for (let i = 0, len = reslist.length; i < len; i++) {
        searchList.push(reslist[i].truckLicenseNo);
        const li = document.createElement('li'),
          span = document.createElement('span'),
          span1 = document.createElement('span'),
          a = document.createElement('span'),
          p1 = document.createElement('p'),
          p2 = document.createElement('p'),
          em1 = document.createElement('em'),
          em2 = document.createElement('em'),
          strong = document.createElement('strong'),
          d = ',',
          f = '-',
          pre = 'truckCode';
        let model = '-,',
          model1 = '-,',
          model2 = '-',
          truckModelName = '';
        for (let k = 0, len1 = TRUCK_MODEL_DATA.length; k < len1; k++) {
          if (reslist[i].truckModelCode === TRUCK_MODEL_DATA[k].id) {
            truckModelName = TRUCK_MODEL_DATA[k].value;
            break;
          }
        }
        if (truckModelName) {
          model = truckModelName ? truckModelName + d : f + d;
        }
        if (reslist[i].truckLength || reslist[i].truckLengthUnitCode) {
          model1 = reslist[i].truckLength ? reslist[i].truckLength : f;
          if (model1 !== '-') {
            model1 += reslist[i].truckLengthUnitCode ? (lengthUnit[reslist[i].truckLengthUnitCode] || f) : f;
          } else {
            model1 += reslist[i].truckLengthUnitCode ? (lengthUnit[reslist[i].truckLengthUnitCode] || '') : '';
          }
          model1 += d;
        }
        if (reslist[i].regTonnage || reslist[i].regTonnageUnitCode) {
          model2 = reslist[i].regTonnage ? reslist[i].regTonnage : '-';
          if (model2 !== '-') {
            model2 += reslist[i].regTonnageUnitCode ? (carryUnit[reslist[i].regTonnageUnitCode] || f) : f;
          } else {
            model2 += reslist[i].regTonnageUnitCode ? (carryUnit[reslist[i].regTonnageUnitCode] || '') : '';
          }
        }
        li.id = pre + reslist[i].truckLicenseNo;
        a.className = 'truck_detail';
        // a.target = '_blank';
        // a.href = `/truck/add.html?${reslist[i].code}`;
        /* eslint no-script-url: "error"*/
        // a.href = 'javascript:void(0);';
        a.setAttribute('data-link', `/truck/add.html?code=${reslist[i].code}&editable=false`);
        a.setAttribute('data-title', '车辆详情');
        a.innerHTML = reslist[i].truckLicenseNo;
        span.className = 'sequence';
        span.innerHTML = i + 1;
        p1.className = 'truck-id';
        p1.setAttribute('data-truck-license', reslist[i].truckLicenseNo);
        p2.className = 'truck-info';
        p2.innerHTML = model + model1 + model2;
        em1.className = 'truck-tag';
        // em1.innerHTML = '自有';
        em1.innerHTML = reslist[i].truckTag ? reslist[i].truckTag : '';
        em2.className = 'truck-tag ts-grey hide';
        em2.innerHTML = 'gps';
        span1.className = 'running-status fr';
        span1.appendChild(strong);
        p1.appendChild(span1);
        p1.appendChild(a);
        if (reslist[i].truckTag) {
          p1.appendChild(em1);
        }
        p1.appendChild(em2);
        li.appendChild(span);
        li.appendChild(p1);
        li.appendChild(p2);
        appendBox.appendChild(li);
      }
      document.getElementById('pageNumber').value = listObj.page;
      // 获取坐标地址
      // todo []时不请求
      if (searchList.length > 0) {
        getPosition({
          truckLicenseNo: searchList.join(',')
        }, (res1, err) => {
        // 获取的坐标转换成百度坐标
          if (res1) {
            const list = mapTool.transformPoint(res1.content);
            let lat = 0,
              lng = 0;
            list.forEach((element) => {
            // 遍历坐标
              lat += parseFloat(element.lat);
              lng += parseFloat(element.lng);
            // 修改相关属性
              const dom = document.getElementById(`truckCode${element.handle}`);
              if (element.source === 'gps') {
                removeClass(dom.getElementsByClassName('hide')[0], 'hide');
              }
              if (element.status) {
                const targetDom = dom.getElementsByClassName('running-status')[0].getElementsByTagName('strong')[0];
                switch (element.status) {
                  case 1:
                    targetDom.innerHTML = '正常';
                    break;
                  case 2:
                    targetDom.innerHTML = '停留';
                    break;
                  case 3:
                    targetDom.innerHTML = '异常';
                    break;
                  default:
                    break;
                }
              }
            });
            lat /= res1.content.length;
            lng /= res1.content.length;
            initMap(lat, lng);
            showMask(list);
            if (err) {
              console.log(err);
            }
          } else {
            initMap(null, null);
          }
        });
      } else {
        document.getElementById('pageNumber').value = '0';
        initMap(null, null);
      }
    }));
}

refreshList();
document.getElementById('search').onclick = function () {
  refreshList();
};

document.getElementById('ucp-pre').onclick = function () {
  const nowPage = parseInt(document.getElementById('pageNumber').value, 10);
  if (nowPage > 1) {
    document.getElementById('pageNumber').value -= 1;
    document.getElementById('search').onclick();
  }
};

document.getElementById('ucp-next').onclick = function () {
  const nowPage = parseInt(document.getElementById('pageNumber').value, 10),
    totlePage = parseInt(document.getElementById('totlePage').value, 10);
  if (nowPage < totlePage) {
    document.getElementById('pageNumber').value = nowPage + 1;
    document.getElementById('search').onclick();
  }
};
