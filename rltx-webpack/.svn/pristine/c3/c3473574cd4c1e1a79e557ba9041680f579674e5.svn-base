/**
 * Created by zyc on 17/7/12.
 */
var url  = window.ctx;
var environment = window.environment;
var opt = {
    pointImg: window.lbsImgDomain + '/blue_dot.png',
    carImg: '/img/car/car.png',
    startImg: '/img/car/map_start.png',
    finishImg: '/img/car/map_finish.png',
    lushu: '/ex/js/LuShu.js',
    initLongitude: window.initLongitude,
    initLatitude: window.initLatitude
};
$('.truckNo').html(decodeURI(window.location.search.replace('?','')));
var mapLib = new MapLib('map', opt);
mapLib.init();
util.dateTimePicker();  
var todaybeginTime = moment().format('YYYY-MM-DD')+' '+ moment().utc().startOf('day').format('HH:mm:ss');
var todayendTime = moment().format('YYYY-MM-DD') +' '+ moment().utc().endOf('day').format('HH:mm:ss');
$('#vehicleTrackSTime').val('2017-03-21 0:00:00');
$('#vehicleTrackETime').val('2017-03-24 23:59:59');
setData(todaybeginTime, todayendTime);
var handler;
var myChart;
var xAxisData =[];
var yAxisData =[];
myChart = echarts.init(document.getElementById('dateMap'),'macarons');
myChart.showLoading({
    text: '正在努力的加载数据中...',
    effect: 'bubble',
    textStyle: {
        fontSize: 22
    }
});
var winH = $(window).height(),
    headH = $(".header").outerHeight(),
    listH=0;

//模拟演示功能 start
var hz = ""; //货主
var tdh = ""; //提单号
var hpxx = ""; //货品信息
var truckLicenseNo = ""; //车牌号
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return "";
}
function initOtherParams() {
    if(window.token) {
        hz = getQueryString("hz");
        tdh = getQueryString("tdh");
        hpxx = getQueryString("hpxx");
        truckLicenseNo = getQueryString("truckLicenseNo");
    }
}
initOtherParams();
function transDemoPoint(point) {
    var pointArray = point;
    var len = pointArray.length;
    for (var i = 0; i < len; i += 1) {
        pointArray[i].hz = hz;
        pointArray[i].tdh = tdh;
        pointArray[i].hpxx = hpxx;
        pointArray[i].truckLicenseNo = truckLicenseNo;
    }
    return pointArray;
}
//模拟演示功能 end

function setMapH(){
    if(!$('#trajectory').hasClass('hide')&&!$('#dateMap').hasClass('hide')){
        listH = 400;
    }
    if((!$('#dateMap').hasClass('hide')&&$('#trajectory').hasClass('hide'))||($('#dateMap').hasClass('hide')&&!$('#trajectory').hasClass('hide'))){
        listH = 200;
    }
    if($('#dateMap').hasClass('hide')&&$('#trajectory').hasClass('hide')){
        listH = 0;
    }
    $("#map").css({"height":winH-headH-listH});
}
$('#dateMap').addClass('hide');
$('#trajectoryDetail').on('click', function(){
    $('#trajectory').toggleClass('hide');
    setMapH();
});
$('#dateMapDetail').on('click', function(){
    $('#dateMap').toggleClass('hide');
    setMapH();
});
function clearData(){
    xAxisData =[];
    yAxisData =[];
    $('.fix-table-wrap').scrollTop(0);
}
$('#trackSearchId').on('click', function(){
    var $this = $(this);
    $this.attr('disabled','disabled').find('span').text('搜索中');
    var beginTime = $('#vehicleTrackSTime').val();
    var endTime = $('#vehicleTrackETime').val();
    if(Date.parse(endTime) - Date.parse(beginTime)>431999666){
        alert('请查询5天以内数据！');
        $('#trackSearchId').removeAttr('disabled').find('span').text('搜索');
        return false;
    }
    document.removeEventListener('moveNext', handler, false);
    $('#pause').trigger('click');
    $('#run, #stop').prop('disabled', true);
    setData(beginTime, endTime);
    $('.mapTpl').empty();
    $('#pause').addClass('hidden');
    $('#run').removeClass('hidden');
    //速度初始化
    $(".wdauto a[data-speed=1]").click();
});

function dateFormat(time) {
  const Cdate = new Date(time),
    returnString = Cdate.getFullYear() + '-' + (Cdate.getMonth()+1) + '-' + Cdate.getDate() + ' ' + Cdate.getHours() + ":" + Cdate.getMinutes() + ":" + Cdate.getSeconds();
  return returnString;
}

function setData(beginTime, endTime){
    var url = document.domain.indexOf('test') > -1 ? 'http://gateway.rltxtest.xyz/lbs/lbs/location/history/' + window.location.search.replace('?', '') : 'http://gateway.rltx.xyz/lbs/lbs/location/history/' + window.location.search.replace('?', '');
    $.ajax({
        // url: 'http://gateway.rltx.xyz/lbs/lbs/location/history/' + window.location.search.replace('?', ''),
        url: url,
        cache: false,
        method: 'GET',
        xhrFields:{
            withCredentials:true
        },
        data: {
            beginTime:$('#vehicleTrackSTime').val(),
            endTime:$('#vehicleTrackETime').val(),
            token: window.token || ''
        }
    }).done(function(data){
        if(data.code === 200){
            $('#trackSearchId').removeAttr('disabled').find('span').text('搜索');
            var dataPoint = data.data;
            if(dataPoint.length > 0){
                myChart.hideLoading();
                myChart.clear();
                clearData();
                var point = mapTool.delRepeat(dataPoint);
                console.log(point);
                point = mapTool.transformPoint(point);
                console.log(point);
                point = transDemoPoint(point);
                console.log(point);
                for (var i = data.data.length - 1; i >= 0; i--) {
                    data.data[i]['create_time'] = dateFormat(data.data[i]['createTime']);
                    data.data[i]['record_time'] = dateFormat(data.data[i]['recordTime']);
                };
                mapLib.initLu(point, 200);
                $('#run, #stop').prop('disabled', false);
                var count = 0;
                var len = point.length;
                var interval = Math.floor(len/20);
                var tpl = '';
                handler = function hander() {
                    if (count === len - 1) {
                        count = 0;
                        xAxisData.push(point[count].record_time);
                        yAxisData.push(point[count].speed?point[count].speed:0);
                        drawChart(interval, xAxisData, yAxisData);
                        $(".blackmask,.lushuDialog").removeClass("hide");
                        $('#pause').addClass('hidden');
                        $('#run').removeClass('hidden');
                        return false;
                    }
                    count += 1;
                    xAxisData.push(point[count].record_time);
                    yAxisData.push(point[count].speed?point[count].speed:0);
                    drawChart(interval, xAxisData, yAxisData);
                    $('#trajectory').scrollTop(count * 23);
                };
                $('#run').off('click').on('click', function(){
                    mapLib.startLushu();
                    $('#run').addClass('hidden');
                    $('#pause').removeClass('hidden');
                    if(count === 0){
                        myChart.clear();
                        clearData();
                        xAxisData.push(point[count].record_time);
                        yAxisData.push(point[count].speed?point[count].speed:0);
                        drawChart(interval, xAxisData, yAxisData);
                    }
                    document.addEventListener('moveNext', handler, false);
                });
                $('#pause').off('click').on('click', function(){
                    mapLib.pauseLushu();
                    $('#pause').addClass('hidden');
                    $('#run').removeClass('hidden');
                });
                $('#stop').off('click').on('click', function(){
                    document.removeEventListener('moveNext', handler, false);
                    mapLib.returToStart();
                    $('#pause').addClass('hidden');
                    $('#run').removeClass('hidden');
                    count=0;
                });
                $('.carSpeed').off('click').on('click', function(){
                    var times = $(this).data('speed');
                    $(this).addClass('btn-org').removeClass('btn-line');
                    $(this).siblings().addClass('btn-line').removeClass('btn-org');
                    // mapLib.setSpeed(times);
                    var value = times * 2000;
                    mapLib.lushu._opts.speed = value;

                });
                var distance = 0;
                for(var i=0;i<len;i+=1){
                    tpl += '<tr><td>'+ (i+1)+'</td><td>'+point[i].record_time+'</td><td>'+point[i].lng+'</td>';
                    tpl+='<td>'+point[i].lat+'</td><td>'+(point[i].speed?point[i].speed:0)+'</td>';
                    tpl+='<td>'+mapTool.getDirection(point[i].direction)+'</td><td><span class="getAddress btn-link curhand" data-lng="'+point[i].lng+'" data-lat="'+point[i].lat+'">查看位置</span></td></tr>';
                    xAxisData.push(point[i].record_time);
                    yAxisData.push(point[i].speed?point[i].speed:0);
                    if(i>0){
                        distance += Number(mapTool.distance(point[i - 1].lat, point[i - 1].lng, point[i].lat, point[i].lng)) / 1000;
                    }
                }
                $('.mapTpl').html(tpl);
                drawChart(interval, xAxisData, yAxisData);
                var avgSpeed = (distance/((Date.parse(point[len-1].record_time)-Date.parse(point[0].record_time ))/1000/60/60)).toFixed(2);
                $('#v-p-start-time').text(point[0].record_time);
                $('#v-p-end-time').text(point[len-1].record_time);
                $('#v-p-running-mil').text(distance.toFixed(2) + '公里');
                $('#v-p-running-time').text(mapTool.stopTime(point[0].record_time, point[len-1].record_time ));
                $('#v-p-avg-speed').text(avgSpeed + 'km/小时');
                $('.lushuDialog .confirm').on('click', function(){
                    $(".blackmask,.showdialog").addClass("hide");
                    $('#run').trigger('click');
                });
            }else{
                alert('查询范围内无数据！请重新选择时间！')
            }
        }else{
            alert(data.data.msg);
            $('#trackSearchId').removeAttr('disabled').find('span').text('搜索');
        }
    });
}

function drawChart(interval, xAxisData, yAxisData){
    var option = {
        title : {
            text: '速度曲线图',
            subtext: '',
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (!isNaN(Number(params.value))) {
                    return params.name + '<br>' + '速度：' + params.value + 'km/小时';
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
        xAxis: [
            {
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
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '速度',
                axisLabel: {
                    formatter: '{value} km/小时'
                }
            }
        ],
        series: [
            {
                name: '速度',
                type:'line',
                data: yAxisData
            },
        ]
    };
    myChart.setOption(option);
}

$(document).on('click', '.getAddress', function(){
    var $this = $(this);
    var lat = $this.data('lat');
    var lng = $this.data('lng');
    var address = getAddress(lng, lat);
    $this.text(address);
});
