/*
 * Created by Henrietta Su on 16.11.30.
 * common function we need in gps module of member project
 * inputEvent for create input event
 * initTable function will initialize the table as bootstrap-table and return a object
 * dateFormat function would format date as yyyy-mm-dd hh;mm;ss. it receive two params that date and time. time control spilt of date
 * dateTimePicker function will initialize dateTimePicker
 * alertMsg function would verify whether the date from server is normal or not and alert the message as util.alertModal and return that
 * alertModal function would create a modal of bootstrap with custom style and return the $(modal) that would be bound events of "bs.modal"
 */
(function($, udf) {
    var ns = ".inputEvent ",
    // A bunch of data strings that we use regularly
        dataBnd = "bound.inputEvent",
        dataVal = "value.inputEvent",
        dataDlg = "delegated.inputEvent",
    // Set up our list of events
        bindTo = [
            "input", "textInput",
            "propertychange",
            "paste", "cut",
            "keydown", "keyup",
            "drop",
            ""].join(ns),
    // Events required for delegate, mostly for IE support
        dlgtTo = [ "focusin", "mouseover", "dragstart", "" ].join(ns) + bindTo,
    // Elements supporting text input, not including contentEditable
        supported = {TEXTAREA:udf, INPUT:udf},
    // Events that fire before input value is updated
        delay = { paste:udf, cut:udf, keydown:udf, drop:udf, textInput:udf };

    // this checks if the tag is supported or has the contentEditable property
    function isSupported(elem) {
        return $(elem).prop('contenteditable') == "true" ||
            elem.tagName in supported;
    };

    $.event.special.txtinput = {
        setup: function(data, namespaces, handler, onChangeOnly) {
            var timer,
                bndCount,
            // Get references to the element
                elem  = this,
                $elem = $(this),
                triggered = false;

            if (isSupported(elem)) {
                bndCount = $.data(elem, dataBnd) || 0;

                if (!bndCount)
                    $elem.bind(bindTo, handler);

                $.data(elem, dataBnd, ++bndCount);
                $.data(elem, dataVal, elem.value);
            } else {
                $elem.bind(dlgtTo, function (e) {
                    var target = e.target;
                    if (isSupported(target) && !$.data(elem, dataDlg)) {
                        bndCount = $.data(target, dataBnd) || 0;

                        if (!bndCount) {
                            $(target).bind(bindTo, handler);
                            handler.apply(this, arguments);
                        }

                        // make sure we increase the count only once for each bound ancestor
                        $.data(elem, dataDlg, true);
                        $.data(target, dataBnd, ++bndCount);
                        $.data(target, dataVal, target.value);
                    }
                });
            }
            function handler (e) {
                var elem = e.target;

                // Clear previous timers because we only need to know about 1 change
                window.clearTimeout(timer), timer = null;

                // Return if we've already triggered the event
                if (triggered)
                    return;

                // paste, cut, keydown and drop all fire before the value is updated
                if (e.type in delay && !timer) {
                    // ...so we need to delay them until after the event has fired
                    timer = window.setTimeout(function () {
                        if (elem.value !== $.data(elem, dataVal)) {
                            $(elem).trigger("txtinput");
                            $.data(elem, dataVal, elem.value);
                        }
                    }, 0);
                }
                else if (e.type == "propertychange") {
                    if (e.originalEvent.propertyName == "value") {
                        $(elem).trigger("txtinput");
                        $.data(elem, dataVal, elem.value);
                        triggered = true;
                        window.setTimeout(function () {
                            triggered = false;
                        }, 0);
                    }
                }
                else {
                    var change = onChangeOnly !== undefined ? onChangeOnly :
                        $.fn.input.settings.onChangeOnly;
                    if ($.data(elem, dataVal) == elem.value && change)
                        return;

                    $(elem).trigger("txtinput");
                    $.data(elem, dataVal, elem.value);
                    triggered = true;
                    window.setTimeout(function () {
                        triggered = false;
                    }, 0);
                }
            }
        },
        teardown: function () {
            var elem = $(this);
            elem.unbind(dlgtTo);
            elem.find("input, textarea").andSelf().each(function () {
                bndCount = $.data(this, dataBnd, ($.data(this, dataBnd) || 1)-1);

                if (!bndCount)
                    elem.unbind(bindTo);
            });
        }
    };

    // Setup our jQuery shorthand method
    $.fn.input = function (handler) {
        return handler ? $(this).bind("txtinput", handler) : this.trigger("txtinput");
    }

    $.fn.input.settings = {
        onChangeOnly: false
    };

})(jQuery);

var util = jQuery.prototype = {
    /*基于bootstarp-table封装的生成table方法
    *   option: 同bootstarp-table的option
    *  合并传入参数和默认参数，传入bootstarp-table中
    */
    initTable: function (option) {
        var newOption = option,
            ele = option.ele,
            table;
        //设置没有数据的情况下显示的内容，不删除该属性会报错
        var formatNoMatches = option.formatNoMatches;
        delete option.formatNoMatches;
        newOption = $.extend(
            {
                dataType: 'json',
                method: 'GET',
                contentType: 'application/json',
                accept: 'application/json',
                cache : false,
                responseHandler: function (res) {
                    if(res.content){
                        res.content.code = res.code;
                        return res.content;
                    }
                    if((res.code===200)&&res.data){
                        return res.data;
                    }else{
                        util.alertModal({
                            msg: res.data.msg
                        });
                    }
                },
                /*
                * 参数文档地址
                * http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/
                * */
                silent : true,
                toolbar: '.search-box',
                pagination: true,
                sidePagination : 'server',
                strictSearch: false,
                paginationHAlign: 'left',
                paginationDetailHAlign: 'right',
                classes: option.editableExcel ? 'member-list table-bordered editable-table' : 'member-list table-bordered',
                onLoadSuccess: function (data) {
                    var code = data.code;
                    if(code){
                        switch (code) {
                            case 200:
                                $('.fixed-table-header-columns, .fixed-table-header, .fixed-table-body-columns').removeClass('hidden');
                                break;
                            default:
                                util.alertModal({
                                    msg: data.content
                                });
                        }
                    }
                    $('.fixed-table-body-columns tbody tr').on('click', function(){
                        var index = $(this).index();
                        $(ele).children('tbody').find('tr').eq(index).toggleClass('ckd');
                        $(this).toggleClass('ckd');
                    });
                },
                onClickRow: function(row, $element){
                    var index = $($element).index();
                    $('.fixed-table-body-columns tbody tr').eq(index).toggleClass('ckd');
                    $($element).toggleClass('ckd');
                }
            },
            newOption || {}
        );
        //往中文提示中添加提示
        $.fn.bootstrapTable.locales['zh-CN'] = {
            formatLoadingMessage: function () {
                return '正在努力地加载数据中，请稍候……';
            },
            formatRecordsPerPage: function (pageNumber) {
                return '，每页显示 ' + pageNumber + ' 条记录';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
//                return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
                return '总共 ' + totalRows + ' 条记录';
            },
            formatSearch: function () {
                return '搜索';
            },
            formatNoMatches: function () {
                if(formatNoMatches){
                    return formatNoMatches;
                }else{
                    return '没有找到匹配的记录';
                }
            },
            formatPaginationSwitch: function () {
                return '隐藏/显示分页';
            },
            formatRefresh: function () {
                return '刷新';
            },
            formatToggle: function () {
                return '切换';
            },
            formatColumns: function () {
                return '列';
            },
            formatExport: function () {
                return '导出数据';
            },
            formatClearFilters: function () {
                return '清空过滤';
            }
        };
        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
        table = $(ele).bootstrapTable(newOption);
        table.on('editable-shown.bs.table', function () { // editable彈出框展開後
            var $datetimepicker = $(ele).find('.datetimepicker');
            if ($datetimepicker.length) {
                $datetimepicker.attr('readonly', 'readonly');
                $datetimepicker.attr('name', 'readonly');
                $datetimepicker.parent().addClass('input-group date');
                util.dateTimePicker();
            }
        });
        // editable初始化，即生成<a>後
        table.on('editable-init.bs.table', function () {
            if (option.editableExcel) {
                util.excelTable();
            }
        });
        // editable保存後
        table.on('editable-save.bs.table', function () {
            if (option.editableExcel) {
                util.excelTable('enable');
            }
        });
        return table;
    },
    //判断是否全选
    checkIsAllSelect:function(ele){
        var ckbox = ele.parents('.fixed-table-body').find('.ck-single');
        var ckboxlength = ckbox.length;
        var checkednum = 0;
        if(ckboxlength > 0){
            for(var i=0;i < ckbox.length; i++){
                if(ckbox[i].checked){
                    checkednum++;
                }
            }
            if(checkednum == ckboxlength){
                $(".ck-all")[0].checked = true;
            }else{
                $(".ck-all")[0].checked = false;
            }
        }
    },
    initTable1HoverFlag:false,
    initTable1RowClick:function($element){
        var $element = $($element);
        $element.toggleClass('ckd');
        var checkStatus = $element.data('checkstatus');
        var checkBox = $element.find('input[type=checkbox]')[0];
        if(checkStatus==undefined||checkStatus=='false'){
            if(checkBox){
                checkBox.checked = true;
            }
            $element.addClass('ckd');
            $element.data('checkstatus','true');
        }else{
            if(checkBox){
                checkBox.checked = false;
            }
            $element.removeClass('ckd');
            $element.data('checkstatus','false');
        }
        util.checkIsAllSelect($element);
    },
    initTable1hover:function(){
        var fixedTableBody = $('.fixed-table-body');

        $(document).on('mouseenter','.fixed-table-body tbody tr',function(){
            var checkBox = $(this).find('input[type=checkbox]')[0];
            if(checkBox && !checkBox.checked){
                $(this).addClass('ckd');
            }
        });
        $(document).on('mouseleave','.fixed-table-body tbody tr',function(){
            var checkBox = $(this).find('input[type=checkbox]')[0];
            if(checkBox && !checkBox.checked){
                $(this).removeClass('ckd');
            }
        });
        $(document).on("click",".ck-all",function(){
            var checktype = this.checked;
            var root = $(this).parents(".uc-list-mode");
            var targettr = root.find(".fixed-table-body tbody tr");
            if(checktype){
                targettr.addClass('ckd');
                targettr.data('checkstatus','true');
                for(var i=0;i<targettr.length;i++){
                    $(targettr[i]).find('input')[0].checked = true;
                }
            }else{
                targettr.removeClass('ckd');
                targettr.data('checkstatus','false');
                for(var i=0;i<targettr.length;i++){
                    $(targettr[i]).find('input')[0].checked = false;
                }
            }
        });
    },
    /*
     *   与initTable功能差不多
     *   修复同页面两个表的时候选择会出现两个表的相同列被选中
     *   修复checkbox的复选框点击之后造成反选
     * */
    initTable1: function (option) {
        //绑一次
        if(util.initTable1HoverFlag==false){
            util.initTable1hover();
            util.initTable1HoverFlag = true;
        }
        var newOption = option,
            ele = option.ele,
            table;
        newOption = $.extend(
            {
                dataType: 'json',
                method: 'GET',
                contentType: 'application/json',
                accept: 'application/json',
                cache : false,
                responseHandler: function (res) {
                    if(res.content){
                        res.content.code = res.code;
                        return res.content;
                    }
                    if((res.code===200)&&res.data){
                        return res.data;
                    }else{
                        util.alertModal({
                            msg: res.data.msg
                        });
                    }
                },
                /*
                 * 参数文档地址
                 * http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/
                 * */
                silent : true,
                toolbar: '.search-box',
                pagination: true,
                sidePagination : 'server',
                strictSearch: false,
                paginationHAlign: 'left',
                paginationDetailHAlign: 'right',
                classes: option.editableExcel ? 'member-list table-bordered editable-table' : 'member-list table-bordered',
                onLoadSuccess: function (data) {
                    var code = data.code;
                    if(code){
                        switch (code) {
                            case 200:
                                $('.fixed-table-header-columns, .fixed-table-header, .fixed-table-body-columns').removeClass('hidden');
                                break;
                            default:
                                util.alertModal({
                                    msg: data.content
                                });
                        }
                    }
                },
                onClickRow: function(row, $element){
                    util.initTable1RowClick($element);
                }
            },
            newOption || {}
        );
        //往中文提示中添加提示
        $.fn.bootstrapTable.locales['zh-CN'] = {
            formatLoadingMessage: function () {
                return '正在努力地加载数据中，请稍候……';
            },
            formatRecordsPerPage: function (pageNumber) {
                return '，每页显示 ' + pageNumber + ' 条记录';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
//                return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
                return '总共 ' + totalRows + ' 条记录';
            },
            formatSearch: function () {
                return '搜索';
            },
            formatNoMatches: function () {
                return '没有找到匹配的记录';
            },
            formatPaginationSwitch: function () {
                return '隐藏/显示分页';
            },
            formatRefresh: function () {
                return '刷新';
            },
            formatToggle: function () {
                return '切换';
            },
            formatColumns: function () {
                return '列';
            },
            formatExport: function () {
                return '导出数据';
            },
            formatClearFilters: function () {
                return '清空过滤';
            }
        };
        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
        table = $(ele).bootstrapTable(newOption);
        table.on('editable-shown.bs.table', function () { // editable彈出框展開後
            var $datetimepicker = $(ele).find('.datetimepicker');
            if ($datetimepicker.length) {
                $datetimepicker.attr('readonly', 'readonly');
                $datetimepicker.attr('name', 'readonly');
                $datetimepicker.parent().addClass('input-group date');
                util.dateTimePicker();
            }
        });
        // editable初始化，即生成<a>後
        table.on('editable-init.bs.table', function () {
            if (option.editableExcel) {
                util.excelTable();
            }
        });
        // editable保存後
        table.on('editable-save.bs.table', function () {
            if (option.editableExcel) {
                util.excelTable('enable');
            }
        });
        return table;
    },
    excelTable: function (evt) {
        var $td = $('a.editable').parent();
        $td.addClass('editable-td');
        switch (evt) {
            case 'enable':
                $(document).off('click.excel.table');
                $(document).off('keyup.excel.table');
                break;
            case undefined:
                $(document).on('click.excel.table', '.editable-td', function (e) { // 單元格
                    var $this = $(this),
                        $a = $this.children('a');
                    $('.editable-td').removeClass('active');
                    $this.addClass('active');
                    $a.editable('show');
                    e.stopPropagation();
                });
                $(document).on('click.excel.table', 'a.editable', function (e) { // 超鏈接
                    var $this = $(this),
                        $td = $this.parent();
                    $('.editable-td').removeClass('active');
                    $td.addClass('active');
                    $('a.editable').not(this).editable('hide');
                    e.stopPropagation();
                    e.preventDefault();
                });
                $(document).on('keyup.excel.table', function (e) { // 鍵盤控制
                    var $currTd = $('.editable-td.active'),
                        $nextTd,
                        $tr = $currTd.parent(),
                        index = $currTd.index(),
                        keyMap = {
                            left: 37,
                            right: 39,
                            up: 38,
                            down: 40,
                            tab: 9,
                            enter: 13
                        },
                        key = e.keyCode;
                    switch (key) {
                        case keyMap.left:
                            $nextTd = $currTd.prevAll('.editable-td').first();
                            directionChange();
                            break;
                        case keyMap.right:
                            $nextTd = $currTd.nextAll('.editable-td').first();
                            directionChange();
                            break;
                        case keyMap.up:
                            $nextTd = $currTd.parent().prev().find('td').eq(index);
                            directionChange();
                            break;
                        case keyMap.down:
                            $nextTd = $currTd.parent().next().find('td').eq(index);
                            directionChange();
                            break;
                        case keyMap.tab:
                            $nextTd = $currTd.parent().next().find('.editable-td').first();
                            directionChange();
                            break;
                        case keyMap.enter:
                            $currTd.children('a').editable('show');
                            break;
                    }
                    function directionChange() {
                        $currTd.removeClass('active');
                        $currTd.children('a').editable('hide');
                        if ($nextTd.length) {
                            $nextTd.addClass('active');
                        } else {
                            $currTd.addClass('active');
                        }
                    }
                });
        }
    },
    /*
    *   通过时间戳生成对应的时间格式
    *   params:zeit 可输入，默认为当前的时间
    *          time 可输入，对应的输出格式
    *   return string
    * */
    dateFormat: function (zeit, time) {
        var date = zeit ? new Date(zeit) : null;
        if (date !== null) {
            var strYear,
                strMonth,
                strDate,
                strHour,
                strMinute,
                strSecond,
                dateFormat,
                str1,
                str2,
                month = date.getMonth() + 1;
            str1 = '-';
            str2 = ':';
            strMonth = month <= 9 ? '0' + month : month;
            strDate = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
            strYear = date.getFullYear();
            strHour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
            strMinute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
            strSecond = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();
            switch (time) {
                case 'notime':
                    dateFormat = strYear + str1 + strMonth + str1 + strDate;
                    break;
                case 'month':
                    dateFormat = strYear + str1 + strMonth;
                    break;
                case 'withoutSecond':
                    dateFormat =  strYear + str3 + strMonth + str3 + strDate + ' ' + strHour + str2 + strMinute;
                    break;
                default:
                    dateFormat = strYear + str1 + strMonth + str1 + strDate + ' ' + strHour + str2 + strMinute + str2 + strSecond;
            }
            return dateFormat;
        }
        return null;
    },
    //返回两位小数并加上千分位，
    moneyFormat: function (num, back) {
        if (num) {
            return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        if (back === 'null') {
            return null;
        }
        return '0.00';
    },
    //基于bootstarp和datetimepicker来生成时间选择器
    dateTimePicker: function () {
        $('.datetimepicker').datetimepicker({
            useCurrent: false,
            showClear: true,
            showTodayButton: true,
            format: 'YYYY-MM-DD H:mm:ss',
            ignoreReadonly: true,
            showClose: true,
            tooltips: {
                today: '选择今天',
                clear: '清除时间',
                selectMonth: '选择月份',
                prevMonth: '前一个月',
                nextMonth: '后一个月',
                selectYear: '选择年份',
                prevYear: '前一年',
                nextYear: '后一年',
                selectTime: '选择时间',
                close: '关闭'
            }
        });
        $('.datetimepicker').on('dp.show', function () {
            var $this = $(this),
                isSecond,
                isDay;
            isSecond = $this.data('second');
            isDay = $this.data('day');
            if (isSecond === 'no') {
                $this.find('.glyphicon-time').hide();
                $this.data('DateTimePicker').format('YYYY-MM-DD');
            }
            if (isDay === 'no') {
                $this.find('.glyphicon-time').hide();
                $this.data('DateTimePicker').viewMode('months').format('YYYY-MM');
            }
        });
        $('.datetimepicker').on('dp.change', function (e) {
            var $this = $(this),
                $par,
                date,
                dateRange;
            $par = $this.parents('.datetimepicker_moudle');
            if ($('.datetimepicker').length > 1 && $par) {
                date = e.date;
                dateRange = $this.data('datetimepicker');
                switch (dateRange) {
                    case 'start' :
                        $par.find('.datetimepicker').eq(1).data('DateTimePicker').minDate(date);
                        break;
                    case 'end' :
                        $par.find('.datetimepicker').eq(0).data('DateTimePicker').maxDate(date);
                        break;
                }
            }
        });
    },
    /*
    *  生成弹出框
    *  params: data      使用返回状态码不为200的时候，返回弹出框内容
    *          message   使用自定义提示文字
    *  return：Dom
    * */
    alertMsg: function (data, message) {
        var code = data.code,
            msg = message ? message : '保存成功',
            modal;
        switch (code) {
            case 200:
                break;
            default:
                msg = data.content;
        }
        modal = util.alertModal({
            msg: msg
        });
        return modal;
    },
    /*
    *  生成提示框方法
    *  option：type  confirm/form/custom/default
    *          msg   显示的提示信息
    *          title        form/custom  显示的标题
    *          customBody   form/custom  显示的内容
    *  return  Dom
    * */
    alertModal: function (option) {
        var type = option.type,
            $modal,
            $title,
            $body,
            $footer,
            temp = '<div class="modal fade alert-modal">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                '<h2 class="modal-title text-stress">提示</h2>' +
                '</div>' +
                '<div class="modal-body">' +
                '</div>' +
                '<div class="modal-footer">' +
                '<p class="text-stress pull-left hidden"></p>' +
                '<button type="button" class="nbtn btn-default" data-dismiss="modal">关闭</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            defaultContent = '<div class="content-box clearfix">' +
                '<i class="i48 inoti"></i>' +
                '<h3>' + option.msg + '</h3>' +
                '</div>',
            confirmBtn = '<button type="button" class="nbtn btn-primary ml-8" data-btn="confirm" data-dismiss="modal">确定</button>',
            submitBtn = '<button type="button" class="nbtn btn-primary ml-8" data-btn="submit">保存</button>';
        $('body').append(temp);
        $modal = $('.alert-modal');
        $title = $('.modal-title');
        $body = $('.alert-modal .modal-body');
        $footer = $('.alert-modal .modal-footer');
        switch (type) {
            case 'confirm':
                $body.append(defaultContent);
                $footer.append(confirmBtn);
                $('[data-btn="confirm"]').click(function () {
                    $modal.on('hidden.bs.modal', function () {
                        option.confirmCallback();
                    });
                });
                break;
            case 'form':
                $('.alert-modal .modal-dialog').wrap('<form class="cmxform"></form>');
                $title.html(option.title);
                $body.append(option.customBody);
                $footer.append(submitBtn);
                $('[data-btn="submit"]').click(function () {
                    option.submitCallback();
                });
                break;
            case 'custom':
                $title.html(option.title);
                $body.append(option.customBody);
                break;
            default:
                $body.append(defaultContent);
        }
        $modal.modal('show');
        $modal.on('hidden.bs.modal', function () {
            var $this = $(this);
            $this.remove();
        });
        return $modal;
    },
    select2: function (option) {
        var newOption = option,
            event;
        (function () {
            if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
                event = jQuery.fn.select2.amd;
            }
            return (event.define('select2/i18n/zh-CN', [],
                function () {
                    return {
                        errorLoading: function () {
                            return '无法载入结果。';
                        },
                        inputTooLong: function (e) {
                            var t = e.input.length - e.maximum,
                                n = '请删除' + t + '个字符';
                            return n;
                        },
                        inputTooShort: function (e) {
                            var t = e.minimum - e.input.length,
                                n = '请再输入至少' + t + '个字符';
                            return n;
                        },
                        loadingMore: function () {
                            return '载入更多结果…';
                        },
                        maximumSelected: function (e) {
                            var t = '最多只能选择' + e.maximum + '个项目';
                            return t;
                        },
                        noResults: function () {
                            return '未找到结果';
                        },
                        searching: function () {
                            return '搜索中…';
                        }
                    };
                }
            ),
            {
                define: event.define,
                require: event.require
            });
        }());
        var select = $(option.ele).select2(newOption = $.extend(
            {
                language: 'zh-CN'
            },
                newOption || {}
        ));
        $(document).off('click.select2').on('click.select2', '.select2-container input', function () {
            return false;
        });
        return select;
    },
    /*
    *   初始化验证表单
    *   params： option  ele        绑定的元素
    *                    type       提示的类型  default/popover  默认使用tooltip,popover使用自己的模板
    *                    message    同bootstarp-table中的message配置
    *                    rules      同bootstarp-table中的rules配置
    *                    submitType 提交之后的处理方式  submit/post/auto
    * */
    initValidatorFrom: function (option) { // 初始化配置
        var _this = this,
            _popover,
            _tooltip,
            i,
            cnt,
            elements,
            validator;
        // handle elements with the same name
        jQuery.validator.addMethod('phone', function (phoneNumber, element) {
            var newPhoneNumber = phoneNumber.replace(/\s+/g, '');
            return this.optional(element) || newPhoneNumber.match(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/);
        }, '请输入有效号码');
        jQuery.validator.addMethod('otherValidate', function (value, element, param) {
            if ($(param).val() && $(param).val() === 'unpass') {
                return false;
            }
            return true;
        }, '验证不通过');
        // 验证值小数位数不能超过两位
        jQuery.validator.addMethod("decimal2", function (value, element) {
            var decimal = /^-?\d+(\.\d{1,2})?$/;
            return this.optional(element) || (decimal.test(value));
        }, $.validator.format("小数位数不能超过两位!"));
        // 验证值小数位数不能超过四位
        jQuery.validator.addMethod("decimal4", function (value, element) {
            var decimal = /^-?\d+(\.\d{1,4})?$/;
            return this.optional(element) || (decimal.test(value));
        }, $.validator.format("小数位数不能超过四位!"));
        jQuery.validator.prototype.checkForm = function () {
            this.prepareForm();
            for (i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                if (this.findByName(elements[i].name).length !== undefined && this.findByName(elements[i].name).length > 1) {
                    for (cnt = 0; cnt < this.findByName(elements[i].name).length; cnt++) {
                        this.check(this.findByName(elements[i].name)[cnt]);
                    }
                } else {
                    this.check(elements[i]);
                }
            }
            return this.valid();
        };
        validator = $(option.ele).validate({
            validClass: 'success',
            // onkeyup: true,
            onfocusout: function (element) {
                this.element(element);
            },
            showErrors: function (errorMap, errorList) {
                $.each(this.successList, function (index, value) {
                    $(value).removeClass('error').addClass('success');
                    // if(option.type === 'handleconflict'){
                    //     return false;
                    // }
                    return $(value).tooltip('hide');
                });
                return $.each(errorList, function (index, value) {
                    $(value.element).removeClass('success').addClass('error');
                    switch (option.type) {
                        case 'popover':
                            _popover = $(value.element).popover({
                                trigger: 'manual',
                                placement: 'bottom',
                                content: value.message,
                                template: '<div class=\"popover\" style="width: auto !important;"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>'
                            });
                            _popover.data('bs.popover').options.content = value.message;
                            return $(value.element).popover('show');
                            break;
                        // case 'handleconflict':
                        //     $(value.element).addClass('error').after('<strong class="tooltip br3 pa">必填字段</strong>');
                        //     break;
                        default: // 默認使用tooltip
                            _tooltip = $(value.element).tooltip({
                                trigger: 'manual',
                                placement: 'bottom',
                                title: value.message
                            });
                            _tooltip.data('bs.tooltip').options.title = value.message;
                            return $(value.element).tooltip('show');
                    }
                });
            },
            rules: option.rules,
            messages: option.messages,
            submitHandler: function (form) { // 验证完成进行提交
                switch (option.submitType) {
                    case 'submit':
                        _this.onValidatorFormSubmit(form);
                        break;
                    case 'post':
                        _this.onValidatorFormPost(option);
                        break;
                    case 'auto':
                        option.validateDone(form);
                        break;
                    // no default
                }
            }
        });
        return validator;
    },
    /*
    *   initValidatorFrom中提交后处理的一种
    *   params: form 表单元素
    * */
    onValidatorFormSubmit: function (form) { // 提交from
        form.submit();
    },
    /*
     *   initValidatorFrom中提交后处理的一种
     *   params: option ele 表单元素
     * */
    onValidatorFormPost: function (option) {
        $.post(option.postUrl, $(option.ele).serialize())
            .done(function (data) {
                option.postDone(data);
            });
    },
    //判断validation中的必填字段
    validatorRequired: function (ele) {
        if ($(ele).val()) {
            return true;
        } else {
            return false;
        }
    },
    tooltip: function (ele, mes ,state) {
        var _tooltip;
        _tooltip = ele.tooltip({
            trigger: 'manual',
            placement: 'bottom',
            title: mes
        });
        _tooltip.data('bs.tooltip').options.title = mes;
        if (state === 'show') {
            return ele.tooltip('show');
        }
        return ele.tooltip('hide');
    },
    /*
    *  数字转换成大写汉字金额
    *  params: cashString  现金数量
    *  return  string   返回的大写字符
    * */
    returnUpperNum: function (cashString) {
        var MAXIMUM_NUMBER = 99999999999.99;
        var CN_ZERO = "零";
        var CN_ONE = "壹";
        var CN_TWO = "贰";
        var CN_THREE = "叁";
        var CN_FOUR = "肆";
        var CN_FIVE = "伍";
        var CN_SIX = "陆";
        var CN_SEVEN = "柒";
        var CN_EIGHT = "捌";
        var CN_NINE = "玖";
        var CN_TEN = "拾";
        var CN_HUNDRED = "佰";
        var CN_THOUSAND = "仟";
        var CN_TEN_THOUSAND = "万";
        var CN_HUNDRED_MILLION = "亿";
        var CN_SYMBOL = "人民币";
        var CN_DOLLAR = "元";
        var CN_TEN_CENT = "角";
        var CN_CENT = "分";
        var CN_INTEGER = "整";
        var integral;    // Represent integral part of digit number.
        var decimal;    // Represent decimal part of digit number.
        var outputCharacters;    // The output result.
        var parts;
        var digits, radices, bigRadices, decimals;
        var zeroCount;
        var i, p, d;
        var quotient, modulus;

        // Validate input string:
        cashString = cashString.toString();
        if (cashString == "") {
            alert("请输入小写金额！");
            return "";
        }
        if (cashString.match(/[^,.\d]/) != null) {
            alert("小写金额含有无效字符！");
            return "";
        }
        if ((cashString).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            alert("小写金额的格式不正确！");
            return "";
        }

        // Normalize the format of input digits:
        cashString = cashString.replace(/,/g, "");    // Remove comma delimiters.
        cashString = cashString.replace(/^0+/, "");    // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(cashString) > MAXIMUM_NUMBER) {
            alert("金额过大，应小于1000亿元！");
            return "";
        }

        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        parts = cashString.split(".");
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2);
        }
        else {
            integral = parts[0];
            decimal = "";
        }
        // Prepare the characters corresponding to the digits:
        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);
        // Start processing:
        outputCharacters = "";
        // Process integral part if it is larger than 0:
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d == "0") {
                    zeroCount++;
                }
                else {
                    if (zeroCount > 0)
                    {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                    zeroCount = 0;
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        // Process decimal part if there is:
        if (decimal != "") {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d != "0") {
                    outputCharacters += digits[Number(d)] + decimals[i];
                }
            }
        }
        // Confirm and return the final output string:
        if (outputCharacters == "") {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal == "") {
            outputCharacters += CN_INTEGER;
        }
        outputCharacters = outputCharacters;
        return outputCharacters;
    }
}