/**
 * Created by chenhuawei on 2016/11/29.
 */
var SYS_MESSAGE_GPS_ALARM = 1004;
var _rlGpsAlarm;
var COORD_TYPE = {
    GPS: 0,
    BAIIDU: 1
};

function RLGpsAlarmPlugin(name, linkMap) {
    RLPlugin.call(this, name, linkMap);
    _rlGpsAlarm = this;
}

RLGpsAlarmPlugin.prototype = new RLPlugin();

RLGpsAlarmPlugin.prototype.isSupport = function (objId, type) {
    if (SYS_MESSAGE_GPS_ALARM == objId)return true;
    return false;
};

RLGpsAlarmPlugin.prototype.isSupportParse = function (objId, contentStyle) {
    return false;
};


/**
 * 接收到消息
 * @param sender
 * @param receiver
 * @param msgType
 * @param refMessageId
 * @param messageId
 * @param appData
 */
var count = 0;
var title = document.title;
var iconNew = '';
var iconChange = false;
var environment = window.environment;
var listArray=[];
var len;
RLGpsAlarmPlugin.prototype.receiveMessage = function (sender, receiver, msgType, refMessageId, messageId, appData) {
    //var msgContent = appData.data;
    var newTitle = '('+ count + ')';
    if(!iconChange){
//        document.getElementById('favicon').href = iconNew;
        iconChange = true;
    }
    document.title = newTitle;
    notifyMessage();
    getList();
};
getList();
var infoList = null;
function getList(){
    $.ajax({
        contentType:"application/json",
        dataType: "json",
        url: ctx + '/gps/alarm/list',
        cache: false,
        method: 'GET',
        data: {
            isRead: false
        }
    }).done(function(data){
        if(data.code ===200){
            len = (data.content.total<99)?data.content.total:'99+';
            var list = data.content.rows;
            infoList = list;
            $('.tj-warning').find('.badge').removeClass('hide').text(len);
            var tpl='';
            for(var i=0;i<list.length;i+=1){
                listArray.push(list[i].id);
                tpl += '<tr><td>'+(list[i].alarmType==1?'进出围栏':'超时停留')+'</td><td>'+truckNo(list[i])+'</td>';
//                tpl +='<td><p class="tj-info">'+getText(list[i])+'</p></td></tr>';
                tpl +='<td><p class=" text-center text-info curhand getInfoList" style="white-space: normal" data-index="'+i+'">查看位置</p></td></tr>';
            }
            $('.tj-tpl').html(tpl);
        }
    });
}
$(document).on('click','.getInfoList',function(){
    var index = $(this).data('index');
    var listText = getText(infoList[index]);
    $(this).text(listText);

});
$('.clear-read').on('click', function(){
    $.ajax({
        contentType:"application/json",
        dataType: "json",
        url: ctx + '/gps/alarm/info',
        cache: false,
        method: 'PUT',
        data: JSON.stringify({
            alarmIdList: listArray
        })
    }).done(function(data){
        $('.tj-tpl').html('');
        alert('已清空');
    });
});
$('.setTime .confirm').on('click', function(){
    var type = $('input[name=setType]').filter(':checked').data('type');
    var value = $('.'+type).find('option:selected').val();
    var configValueType;
    switch (type){
        case 'minute':
            configValueType =1;
            break;
        case 'hour':
            configValueType =2;
            break;
        case 'day':
            configValueType =3;
            break;
    }
    $.ajax({
        contentType:"application/json",
        dataType: "json",
        url: ctx + '/gps/alarm/config/arrest/time',
        cache: false,
        method: 'POST',
        data: JSON.stringify({
            configValue: value,
            configValueType: configValueType
        })
    }).done(function(data){
        alert('设置成功！');
        $(".blackmask,.showdialog").addClass("hide");
    });
});
function  truckNo(list) {
    var alarmType = list.alarmType;
    var truckNo ='';
    switch(alarmType){
        case 1:
            truckNo = list.polygonTruckNo?list.polygonTruckNo:'';
            break;
        case 2:
            truckNo = list.arrestTruckNo?list.arrestTruckNo:'';
            break;
        // no default
    }
    return truckNo;
}
function getTime(start, end){
    var totalTime = (end - start) / 1000 / 60;
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
}
function getText(list){
    var str='';
    var gcj;
    var baidu;

    switch (list.alarmType) {
        case 1:
            gcj = mapTool.gcj_encrypt(list.polygonLatitude, list.polygonLongitude);
            baidu = mapTool.bd_encrypt(gcj.lat, gcj.lng);
            str = moment(list.accessTime).format('YYYY-MM-DD HH:mm:ss')
                + (list.accessType==1?'，进入':'，出')
                + list.polygonName + '，'
                + getAddress(baidu.lng, baidu.lat);
            break;
        case 2:
            gcj = mapTool.gcj_encrypt(list.arrestLatitude, list.arrestLongitude);
            baidu = mapTool.bd_encrypt(gcj.lat, gcj.lng);
            str = '停留' + getTime(list.startTime, list.endTime)
                + '，在 '
                + getAddress(baidu.lng/*list.arrestLongitude*/, baidu.lat/*list.arrestLatitude*/)
                + '( ' + moment(list.startTime).format('YYYY-MM-DD HH:mm:ss') + ' - '
                + moment(list.endTime).format('YYYY-MM-DD HH:mm:ss') +' )';
            break;
        // no default
    }
    return str;
}
function getAddress(lng, lat) {
    var address ='';
    $.ajax({
        url: window.lbsDomain + 'getAddressByCoor',
        cache: false,
        method: 'GET',
        async: false,
        data: {
            lon: lng,
            lat: lat,
            coordType: COORD_TYPE.BAIIDU
        }
    }).done(function(data){
        if(data.status===0){
            address = data.result.formatted_address+' ， '+data.result.sematic_description;
        }
    });
    return address;
}
function notifyMessage() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification('您有'+len+'条报警消息');
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var notification = new Notification('您有'+len+'条报警消息');
            }
        });
    }
}
