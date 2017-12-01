/**
 * Created by zyc on 17/7/4.
 */
// var environment = window.environment;
import { hasClass, addClass, removeClass } from '../../api/classUtil';

const axios = require('axios'),
  url  = window.ctx,
  opt = {
    pointImg: `${window.lbsImgDomain}/blue_dot.png`,
    carImg: `${url}/static/img/car.png`,
    startImg: `${window.lbsImgDomain}/map_start.png`,
    finishImg: `${window.lbsImgDomain}/map_finish.png`,
    lushu: '/ex/js/LuShu.js',
    initLongitude: window.initLongitude,
    initLatitude: window.initLatitude
  },
  mapLib = new MapLib('map', opt);
mapLib.init();
const todaybeginTime = moment().format('YYYY-MM-DD')+' '+ moment().utc().startOf('day').format('HH:mm:ss'),
  todayendTime = moment().format('YYYY-MM-DD') +' '+ moment().utc().endOf('day').format('HH:mm:ss');

// util.dateTimePicker();
document.getElementById('vehicleTrackSTime').value = todaybeginTime;
document.getElementById('vehicleTrackETime').value = todayendTime;
setData(todaybeginTime, todayendTime);
let handler,
  xAxisData = [],
  yAxisData = [];
const myChart = echarts.init(document.getElementById('dateMap'), 'macarons');
myChart.showLoading({
  text: '正在努力的加载数据中...',
  effect: 'bubble',
  textStyle: {
    fontSize: 22
  }
});
const winH = window.innerHeight,
  headH = document.getElementsByClassName('header')[0].offsetHeight;
let listH = 0;

//模拟演示功能 start
let hz = "", //货主
  tdh = "", //提单号
  hpxx = "", //货品信息
  truckLicenseNo = ""; //车牌号

function getQueryString(name) {
  const exp1 = "(^|&)",
    exp2 = "=([^&]*)(&|$)",
    reg = new RegExp(exp1 + name + exp2),
    r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return "";
}

function initOtherParams() {
  if (window.token) {
    hz = getQueryString("hz");
    tdh = getQueryString("tdh");
    hpxx = getQueryString("hpxx");
    truckLicenseNo = getQueryString("truckLicenseNo");
  }
}

initOtherParams();

function transDemoPoint(point) {
  let pointArray = point,
    len = pointArray.length;
  for (var i = 0; i < len; i += 1) {
    pointArray[i].hz = hz;
    pointArray[i].tdh = tdh;
    pointArray[i].hpxx = hpxx;
    pointArray[i].truckLicenseNo = truckLicenseNo;
  }
  return pointArray;
}
//模拟演示功能 end

function setMapH() {
  const istHide = hasClass(document.getElementById('trajectory'), 'hide'),
    isdHide = hasClass(document.getElementById('dateMap'), 'hide');
  if(!istHide && !isdHide){
    listH = 400;
  }
  if((!isdHide && istHide) || (isdHide && !istHide)){
    listH = 200;
  }
  if(isdHide && istHide){
    listH = 0;
  }
  document.getElementById('map').style.height = winH - headH - listH;
}

addClass(document.getElementById('dateMap'), 'hide');
document.getElementById('trajectoryDetail').onclick = () => {
  toggleClass(document.getElementById('trajectory'), 'hide');
  setMapH();
}

document.getElementById('dateMapDetail').onclick = () => {
  toggleClass(document.getElementById('dateMap'), 'hide');
  setMapH();
}

function clearData() {
  xAxisData = [];
  yAxisData = [];
  // $('.fix-table-wrap').scrollTop(0);
  document.querySelectorAll('.fix-table-wrap')[0].scrollTop = 0;
}

document.getElementById('trackSearchId').onclick = function () {
  // $this.attr('disabled','disabled').find('span').text('搜索中');
  this.setAttribute('disabled', 'disabled');
  this.getElementsByTagName('span')[0].innerHTML = '搜索中';
  const beginTime = document.getElementById('vehicleTrackSTime').value,
    endTime = document.getElementById('vehicleTrackETime').value;
  if (Date.parse(endTime) - Date.parse(beginTime) > 431999666) {
    alert('请查询5天以内数据！');
    const trackSearchId = document.getElementById('trackSearchId');
    // $('#trackSearchId').removeAttr('disabled').find('span').text('搜索');
    trackSearchId.setAttribute('disabled', false);
    trackSearchId.getElementsByTagName('span')[0] = '搜索';
    return false;
  }
  document.removeEventListener('moveNext', handler, false);
  // $('#pause').trigger('click');
  // $('#run, #stop').prop('disabled', true);
  document.getElementById('pause').click();
  document.getElementById('run').setAttribute('disabled', true);
  document.getElementById('stop').setAttribute('disabled', true);
  setData(beginTime, endTime);
  // $('.mapTpl').empty();
  document.querySelectorAll('.mapTpl')[0].innerHTML = '';
  addClass(document.getElementById('pause'), 'hidden');
  removeClass(document.getElementById('run'), 'hidden');
  //速度初始化
  // $(".wdauto a[data-speed=1]").click();
  document.querySelectorAll('carSpeed')[1].click();
};

function setData(beginTime, endTime) {
  const url = 'http://lbs.rltx.xyz/lbs/location/history/' + '沪A12345';
  axios.get(url, {
    params: {
      objId: document.querySelectorAll('.truckNo').innerHTML.trim(),
      type: 'truck',
      beginTime: beginTime,
      endTime: endTime,
      token: window.token || ''
    }
  }).then((data) => {
    if (data.code === 200) {
      // $('#trackSearchId').removeAttr('disabled').find('span').text('搜索');
      const trackSearchId = document.getElementById('trackSearchId');
      trackSearchId.removeAttribute('disabled');
      trackSearchId.getElementsByTagName('span')[0].innerHTML = '搜索';
      const dataPoint = data.data;
      if (dataPoint.length > 0) {
        myChart.hideLoading();
        myChart.clear();
        clearData();
        let point = mapTool.delRepeat(dataPoint);
        point = mapTool.transformPoint(point);
        point = transDemoPoint(point);
        mapLib.initLu(point, 200);
        // $('#run, #stop').prop('disabled', false);
        document.getElementById('run').setAttribute('disabled', false);
        document.getElementById('stop').setAttribute('disabled', false);
        let count = 0,
          len = point.length,
          interval = Math.floor(len/20),
          tpl = '';
        handler = function hander() {
          if (count === len -1) {
            count = 0;
            xAxisData.push(point[count].record_time);
            yAxisData.push(point[count].speed?point[count].speed:0);
            drawChart(interval, xAxisData, yAxisData);
            removeClass(document.getElementsByClassName('blackmask')[0], 'hide');
            removeClass(document.getElementsByClassName('lushuDialog')[0], 'hide');
            addClass(document.getElementById('pause'), 'hidden');
            removeClass(document.getElementById('run'), 'hidden');
            return false;
          }
          count += 1;
          xAxisData.push(point[count].record_time);
          yAxisData.push(point[count].speed?point[count].speed:0);
          drawChart(interval, xAxisData, yAxisData);
          document.getElementById('tarjectory').scrollTop = count * 23;
        };
        // $('#run').off('click').on('click', function(){
        document.getElementById('run').onclick = () => {
          mapLib.startLushu();
          addClass(document.getElementById('run'), 'hidden');
          removeClass(document.getElementById('pause'), 'hidden');
          if (count === 0) {
            myChart.clear();
            clearData();
            xAxisData.push(point[count].record_time);
            yAxisData.push(point[count].speed?point[count].speed:0);
            drawChart(interval, xAxisData, yAxisData);
          }
          document.addEventListener('moveNext', handler, false);
        };
        // $('#pause').off('click').on('click', function(){
        document.getElementById('pause').onclick = () => {
          mapLib.pauseLushu();
          addClass(document.getElementById('pause'), 'hidden');
          removeClass(document.getElementById('run'), 'hidden');
        };
        // $('#stop').off('click').on('click', function(){
        document.getElementById('stop').onclick = () => {
          document.removeEventListener('moveNext', handler, false);
          mapLib.returToStart();
          addClass(document.getElementById('pause'), 'hidden');
          removeClass(document.getElementById('run'), 'hidden');
          count = 0;
        };


        // $('.carSpeed').off('click').on('click', function(){
        document.getElementById('.carSpeed').onclick = () => {
          const times = this.getAttribute('data-speed'),
            value = times * 2000;

          // $(this).addClass('btn-org').removeClass('btn-line');
          // $(this).siblings().addClass('btn-line').removeClass('btn-org');
            // mapLib.setSpeed(times);
          mapLib.lushu._opts.speed = value;
        };
        let distance = 0;
        for (let i = 0; i < len; i += 1) {
          // tpl += '<tr><td>'+ (i+1)+'</td><td>'+point[i].record_time+'</td><td>'+point[i].lng+'</td>';
          // tpl+='<td>'+point[i].lat+'</td><td>'+(point[i].speed?point[i].speed:0)+'</td>';
          // tpl+='<td>'+mapTool.getDirection(point[i].direction)+'</td><td><span class="getAddress btn-link curhand" data-lng="'+point[i].lng+'" data-lat="'+point[i].lat+'">查看位置</span></td></tr>';
          const tmp = `<tr><td>'+ (i+1)+'</td><td>${point[i].record_time}</td><td>${point[i].lng}</td>
            <td>${point[i].lat}</td><td>${(point[i].speed?point[i].speed:0)}</td>
            <td>${mapTool.getDirection(point[i].direction)}</td><td><span class="getAddress btn-link curhand" data-lng="${point[i].lng}" data-lat="${point[i].lat}">查看位置</span></td></tr>`;
          xAxisData.push(point[i].record_time);
          yAxisData.push(point[i].speed?point[i].speed:0);
          if (i > 0) {
            distance += Number(mapTool.distance(point[i - 1].lat, point[i - 1].lng, point[i].lat, point[i].lng)) / 1000;
          }
        }
        document.getElementsByClassName('mapTpl')[0].innerHTML = tpl;
        drawChart(interval, xAxisData, yAxisData);
        const avgSpeed = (distance/((Date.parse(point[len-1].record_time)-Date.parse(point[0].record_time ))/1000/60/60)).toFixed(2),
          kilm = '公里',
          kmPreHour = 'km/小时';
        // $('#v-p-start-time').text(point[0].record_time);
        // $('#v-p-end-time').text(point[len-1].record_time);
        // $('#v-p-running-mil').text(distance.toFixed(2) + kilm);
        // $('#v-p-running-time').text(mapTool.stopTime(point[0].record_time, point[len-1].record_time));
        // $('#v-p-avg-speed').text(avgSpeed + kmPreHour);
        document.getElementById('v-p-start-time').innerHTML = point[0].record_time;
        document.getElementById('v-p-end-time').innerHTML = point[len-1].record_time;
        document.getElementById('v-p-running-mil').innerHTML = distance.toFixed(2) + kilm;
        document.getElementById('v-p-running-time').innerHTML = mapTool.stopTime(point[0].record_time, point[len-1].record_time);
        document.getElementById('v-p-avg-speed').innerHTML = avgSpeed + kmPreHour;
        // $('.lushuDialog .confirm').on('click', () => {
        document.getElementById('playback').onclick = () => {
          // $(".blackmask,.showdialog").addClass('hide');
          // $('#run').trigger('click');
          addClass(document.querySelectorAll('.blackmask')[0], 'hide');
          addClass(document.querySelectorAll('.showdialog')[0], 'hide');
          document.getElementById('run').click();
        };
      } else {
        alert('查询范围内无数据！请重新选择时间！');
      }
    } else {
      alert(data.data.msg);
      // $('#trackSearchId').removeAttr('disabled').find('span').text('搜索');
      const trackSearchId = document.getElementById('trackSearchId');
      trackSearchId.removeAttribute('disabled');
      trackSearchId.getElementsByTagName('span')[0].innerHTML = '搜索';
    }
  });
}
// 绘图
function drawChart(interval, xAxisData, yAxisData) {
  const option = {
    title: {
      text: '速度曲线图',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (!isNaN(Number(params.value))) {
          return `${params.name}<br>速度：${params.value}km/小时`;
        } else {
          return params.name;
        }
      }
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    grid: {
      borderWidth: 0,
      y: 40,
      y2: 70,
      x: 90,
      x2: 30
    },
    xAxis: [{
      type: 'category',
      name: '时间',
      data: xAxisData,
      axisLabel: {
        show: true,
        interval: interval,    // {number}
        rotate: 15,
        margin: 8,
        formatter: '{value}'
      }
    }],
    yAxis: [{
      type: 'value',
      name: '速度',
      axisLabel: {
        formatter: '{value} km/小时'
      }
    }],
    series: [{
      name: '速度',
      type: 'line',
      data: yAxisData
    }]
  };
  myChart.setOption(option);
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (hasClass(target.className, 'getAddress')) {
    const lat = this.getAttribute('data-lat'),
      lng = this.getAttribute('data-lng'),
      address = getAddress(lng, lat);
    this.innerHTML = address;
  }
});
