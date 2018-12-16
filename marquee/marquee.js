define([
], function () {
    'use strict';
    function __marquee (dom, options) {
        this.__init(dom, options)
    }
    __marquee.prototype = {
        constructor: __marquee,
        __container: null,
        __init: function (dom, options) {
            this.__container = dom;
            this.options = options;
            this.__contentArr = []
            this.__renderUI(dom, options)
        },
        __renderUI: function (dom, options) {
            var _content = options.content;
            var _rowNums = _content.length;
            var _limit = options.limit;
            var _boxNums = Math.ceil(_rowNums / _limit);
            var _ul = '<ul class="marquee-box"></ul>';
            dom.innerHTML = _ul;
            for (var _i = 0; _i < _boxNums; _i++) {
                var _startPos = _i * 5;
                var _endPos = (_i+ 1) * 5 >= _rowNums ? _rowNums : (_i+ 1) * 5;
                this.__contentArr.push(_content.slice(_startPos, _endPos))
            }
            this.__renderRowItems(dom.querySelector('.marquee-box'), 0)
            
        },
        __renderRowItems: function (curMarqueeBox, curListIdx) {
            if (curListIdx === this.__contentArr.length) curListIdx = 0
            var _this = this;
            var curMarqueeList = _this.__contentArr[curListIdx]
            var _items = '';
            for (var _i = 0; _i < curMarqueeList.length; _i++) {
                _items += '<li class="marquee-row">'
                    + '<div class="marquee-row-item">' + curMarqueeList[_i].row + '</div>'
                    + '</li>'
            }
            curMarqueeBox.innerHTML = _items;
            this.__bindUI(curMarqueeBox, curListIdx)
        },
        __bindUI: function (curMarqueeBox, curListIdx) {
            this.__loopRowTimeList = []
            this.__marqueeRowAddVisible(curMarqueeBox, curListIdx);
        },
        __marqueeRowAddVisible: function (curMarqueeBox, curListIdx) {
            var _this = this;
            _this.curMarqueeBox = curMarqueeBox;
            setTimeout(function () {
                curMarqueeBox.querySelectorAll('.marquee-row-item').forEach(function (element, idx) {
                    var _w = element.scrollWidth;
                    if (_w > element.parentElement.clientWidth) {
                        element.style.width = _w + 'px'
                        var diffWidth = _w - element.parentElement.clientWidth
                        _this.__loopRowTimeList.push({idx: idx, diffWidth: diffWidth, element})
                    }

                });
                if (_this.__loopRowTimeList.length > 0) _this.__startScrollLeft(_this.__loopRowTimeList[0], 0,curListIdx)
            }, 1000)
        },
        __loopRowTimeList: [],
        __loopScrollUp: function (curListIdx) {
            this.__renderRowItems(this.__container.querySelector('.marquee-box'), curListIdx+1)
        },
        __resetScrollLeft: function (options, idx, curListIdx) {
            var _this = this;
            var element = options.element;
            element.style.transform = 'translateX(0)';
            if ((idx + 1) !== _this.__loopRowTimeList.length) this.__startScrollLeft(_this.__loopRowTimeList[idx+1], idx+1, curListIdx)
            else this.__loopScrollUp(curListIdx)
        },
        __nextScrollLeft: function (idx) {
            

        },
        __startScrollLeft: function (options, idx, curListIdx) {
            var start = null;
            var element = options.element;
            var _this = this;
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = timestamp - start;
                element.style.transform = 'translateX(-' + Math.min(progress / (1000/options.diffWidth), options.diffWidth) + 'px)';
                if (progress < 1000) {
                    window.requestAnimationFrame(step);
                }
                else {
                    window.cancelAnimationFrame(step)
                    _this.__resetScrollLeft(options, idx, curListIdx)
                }
            }

            window.requestAnimationFrame(step);
        }

    }
    return __marquee

});

