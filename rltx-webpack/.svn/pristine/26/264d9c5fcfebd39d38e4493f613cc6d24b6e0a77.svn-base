var listCommonJs = function(){
    //table checked
    var tableChecked = {
        init: function(opt){
            $(opt.checkChildEle).on("click",function(e){
                if(e.target.nodeName === 'A'){
                    return ;
                }else {
                    if(!$(this).hasClass(opt.cls)){
                        $(this).addClass(opt.cls);
                        $(this).children("td:first").children('input[type="checkbox"]').prop("checked",true);
                    }
                    else
                    {
                        $(this).removeClass(opt.cls);
                        $(this).children("td:first").children('input[type="checkbox"]').prop("checked",false);
                    }
                }
            })
        },
        // 全选
        checkAll: function(e){
            var checkedBoxStatus = $(e.data.checkAllEle).prop("checked");
            var checkCHIld = $(e.data.checkChildEle);
            for(var i=0,l=checkCHIld.length;i<l;i++){
                checkCHIld.eq(i).find('td').eq(0).children('input:checkbox').prop("checked", checkedBoxStatus);
            }
            // 选择高亮
            checkedBoxStatus ? $(e.data.checkChildEle).addClass(e.data.cls) : $(e.data.checkChildEle).removeClass(e.data.cls);
        },
        CheckBoxList: function(e) {
            var allCks = $(e.data.checkChildEle).find("td:first-child input").length;   // 全部复选框集合
            var $parent = $(this).parent().parent();
            $parent.hasClass(e.data.cls)? $parent.removeClass(e.data.cls) : $parent.addClass(e.data.cls);
            var checkedCks = $(e.data.tableBody).find('tr.'+e.data.cls).length; // 已选中的复选框集合
            checkedCks == allCks ? $(e.data.checkAllEle).prop("checked", true) : $(e.data.checkAllEle).prop("checked", false);
        }

    };
    // 相关属性对象
    var checkOption = {
        checkAllEle: '#column-header-1 input:checkbox',
        checkChildEle: '.rl-fix-table tbody tr',
        cls:'ckd'
    }
    tableChecked.init(checkOption);
    // 全选|取消
    $(checkOption.checkAllEle).on(
        "click",
        {
            checkAllEle:checkOption.checkAllEle,
            checkChildEle:checkOption.checkChildEle,
            cls: checkOption.cls
        },
        tableChecked.checkAll);
    // 子级是否全选影响父一级
    $(checkOption.checkChildEle)
        .on("click",
        {
            checkAllEle:checkOption.checkAllEle,
            checkChildEle:checkOption.checkChildEle,
            cls: checkOption.cls,
            tableBody:'.rl-fix-table tbody'
        },
        tableChecked.CheckBoxList
    );
};

var toAnchor = function($el){
    var top = $el.offset().top;
    $(window).scrollTop(top);
};

var closeCurrentWin = function(){
    $(window.top.document).find(".page-tab-list .active").find(".page-tab-close").click();
};

var refreshCurrentWin = function(){
    $(window.top.document).find(".page-wrapper").not(".hide").find("iframe").prop("src", $(window.top.document).find(".page-wrapper").not(".hide").find("iframe").prop("src"));
};

$(function(){
    //iframe link open in tab
    $("body").on("click","a",function(e){
        var dataLink = $(this).data("link"),
            dataText = $(this).data("title"),
            dataFrom = $(window.top.document).find(".page-tab-list .active").data("url"),
            parentTab = '<li class="active" data-url="' + dataLink + '" title="' + dataText + '" data-from="' + dataFrom + '" ><span class="ellipsis">' + dataText + '</span><span class="page-tab-close" title="关闭">×</span></li>',
            parentCont = '<div class="page-wrapper">' + '<iframe src="' + dataLink + '" allowtransparency="true" frameborder="0" name="" class="iframe" id=""></iframe>' + '</div>';
        if(dataLink)
        {
            if (top == self)
            {
                var a = '<a class="hide" id="frameworkLink" href="' + dataLink + '" target="_blank"><span id="redirectLink">跳转</span></a>';
                if($("#frameworkLink").length){
                    $("#frameworkLink").prop("href", dataLink);
                }else{
                    $("body").append(a);
                }
                $("#redirectLink").click();
            }else{
                $(window.top.document).find(".page-tab-list li").each(function(){
                    if($(this).data("url") === dataLink)
                    {
                        var index = $(this).index();
                        $(this).addClass("active").attr("data-from", dataFrom);
                        $(window.top.document).find(".page-wrapper").eq(index).removeClass("hide").siblings(".page-wrapper").addClass("hide");
                        $(window.top.document).find(".page-wrapper").eq(index).find("iframe").prop("src", $(window.top.document).find(".page-wrapper").eq(index).find("iframe").prop("src"));
                    }
                    else
                    {
                        $(this).removeClass("active");
                    }
                });
                if($(window.top.document).find(".page-tab-list .active").length == 0){
                    $(window.top.document).find(".page-tab-list li").removeClass("active");
                    $(window.top.document).find(".page-tab-list").append(parentTab);
                    $(window.top.document).find(".page-wrapper").addClass("hide");
                    $(window.top.document).find(".main").append(parentCont);
                }
                parent.tabCal();
                //sub menu active
                $(window.top.document).find(".lm-lv2 a").each(function(){
                    var url = $(this).data("link");
                    if (dataLink === url)
                    {
                        $(this).parent().addClass("active");
                    }
                    else
                    {
                        $(this).parent().removeClass("active");
                    }
                });
            }
        }

        //fix firefox more info
        if($(".more-info").length>0)
        {
            $(".more-info").hide();
        }
    });

    $("#refreshWindow").on("click", function(){ window.location.reload() })
});