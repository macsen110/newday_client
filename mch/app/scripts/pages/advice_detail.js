/**
 * Created by knowthis on 16/6/29.
 */

define(['zepto','template'], function($, template) {

    //init page
    var pageInitObj = {
        $rootDom: $('#page_container'),
        hasInput:0,
        ready: function (stateObj, data) {
            var self = this;
            var tplScript = require("./tpl/advice_detail.html");
            if (APP.router.curPathName == stateObj.pageName) {
                APP.router.setRouter(stateObj, self);
                self.show(tplScript, data)
            }
        },
        show: function (tplScript, data) {
            var self = this;
            APP.tools.pageCount();
            self.$rootDom.html(tplScript);
            var html = template('advice_detail_template', data);
            self.$rootDom.prepend(html);
            self.bindUI(tplScript, data);

        },
        setPageInfo: function (type) {
            var obj = {
                "1": "产检报告相关",
                "2": "候诊相关",
                "3": "我的信息有误",
                "4": "建议新增功能",
                "5": "超级妈咪相关",
                "6": "其他"
            }
            APP.tools.setPageTitle(obj[type]);
        },
        bindUI: function (tplScript, data) {
            var self = this;
            self.setPageInfo(data.type);
            APP.selectBottomNav(-2);
            self.$rootDom.addClass('page-advice-detail visibile'); 
            self.ele = {}
            self.$eles = {
                $ipt: self.$rootDom.find('.advice-textarea'),
                $btn: self.$rootDom.find('.comm-btn'),
                $tags: self.$rootDom.find('.wrap-tags'),
                $mobile: self.$rootDom.find('.mobile-ipt') 
            };
            
            self.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            self.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
            self._listenId = self.requestAnimationFrame.call(null, self._listenBtnStatus.bind(self));

            self.$eles.$ipt.on('input', function () {
			    self._listenIpt($(this))
		    });
            self.$eles.$tags.find('.tag').on('click', function () {
                self._toggleTag($(this))
            })
            self.$eles.$btn.on('click', function () {
                self._submit(data.type)
            })
                         
        },
        _listenIpt: function ($this) {
            var val = $.trim($this.val());
			var curLen = val.length;
			var maxLen = $this.data('max');
			var $leftNum = $this.next().find('span');
            curLen = curLen > maxLen ? maxLen : curLen;
			if (curLen > maxLen) $this.val(val.slice(0, maxLen))			
			$leftNum.text(curLen)

        },
        _toggleTag: function ($this) {
            var self = this;
            if ($this.hasClass('select')) $this.removeClass('select');
            else {
                self.$eles.$tags.find('.tag').removeClass('select')
                $this.addClass('select');
            }
        },
        _submit: function (type) {
            var self = this;
            var mobile = $.trim(self.$eles.$mobile.val());
            if (mobile == '') {
                APP.ui.showPrompt('请填写电话号码!');
                self.$eles.$mobile.focus()
                return
            }
            if (!APP.tools.regExpObj.mobile.test(mobile)) {
                APP.ui.showPrompt('电话号码格式不正确!');
                self.$eles.$mobile.focus()
                return
            }
            var data = {
                request_context: {
                    customerId: APP.profileInfo.customerId,
                    uid : APP.uid,
                    appType: APP.openType,
                    changeMobile: mobile,
                    classify1: type,
                    tag: self.$eles.$tags.find('.select').data('index'),
                    feedBack: $.trim(self.$eles.$ipt.val())
                },
                access_token: localStorage.getItem('token'),
                system: 'mch'

            }
            $.ajax({
                url: APP.host.api + '/infanthospital/v1/customerFeedBack',
                data: JSON.stringify(data),
                type : 'post',
                contentType : 'application/json',
                success : function(response) {
                    if (response.ret == 1) {
                        self._saveAdvicemobile(data.changeMobile, data.uid)
                        APP.ui.showPrompt('提交成功',  function () {
                            APP.router._gotoPage({pageName: 'profile'});
                        });
                        return;
                    }
                    APP.ui.showPrompt(response.msg)
                }
            })

        },
        _saveAdvicemobile: function (mobile, uid) {
            localStorage.setItem('adviceMobileObj', JSON.stringify({uid: uid, mobile: mobile}))
        },
        init: function (stateObj) {
            var self = this;
            var mobile;
            var adviceMobileObj;
            if (localStorage.adviceMobileObj) adviceMobileObj = JSON.parse(localStorage.adviceMobileObj);
            if (adviceMobileObj) mobile = adviceMobileObj.uid == APP.uid ? adviceMobileObj.mobile : APP.profileInfo.mobile;
            var data = {
                type: stateObj.classify1,
                mobile: mobile
            }
            self.ready(stateObj, data);
            
        },
        _listenBtnStatus: function () {
            var self = this;
            if ($.trim(self.$eles.$ipt.val()) != '' || self.$eles.$tags.find('.select').length) self.$eles.$btn.removeAttr('disabled');
            else self.$eles.$btn.attr('disabled',true) 
            self._listenId = self.requestAnimationFrame.call(null, self._listenBtnStatus.bind(self));
        },
        destroy: function () {
            //如果有事件绑定的话, 解除事件绑定
            this.$rootDom.removeClass('page-advice-detail visibile');
            this.$rootDom.html('');
            this.cancelAnimationFrame.call(null, this._listenId)
        }
    };
    return pageInitObj;
});