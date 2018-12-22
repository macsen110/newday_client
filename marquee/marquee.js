define([
], function () {
    'use strict';
    function __marquee(dom, options) {
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
            var _titleBox = '<div class="marquee-title">'+options.title+'</div>'
            dom.innerHTML = _titleBox + _ul ;
            this.curMarqueeBox = dom.querySelector('.marquee-box');
            for (var _i = 0; _i < _boxNums; _i++) {
                var _startPos = _i * 5;
                var _endPos = (_i + 1) * 5 >= _rowNums ? _rowNums : (_i + 1) * 5;
                this.__contentArr.push(_content.slice(_startPos, _endPos))
            }
            this.__renderRowItems(this.curMarqueeBox, 0)

        },
        __renderRowItems: function (curMarqueeBox, curListIdx) {
            
            var _this = this;
            console.log(_this.limit)
            var curMarqueeList = _this.__contentArr[curListIdx]
            var _items = '';
            for (var _i = 0; _i < curMarqueeList.length; _i++) {
                _items += '<li class="marquee-row">'
                    + '<div class="marquee-item-wrap">'
                    +   '<div class="marquee-row-item">'
                    +       '<i class="row-item-index">'+(curListIdx * _this.options.limit + (_i+1))+'.</i>' 
                    +       curMarqueeList[_i].row 
                    +   '</div>'
                    + '</div>'
                    + '<div class="marquee-item-shadow"></div>'
                    + '</li>'
            }
            curMarqueeBox.innerHTML = _items;
            this.__bindUI(curMarqueeBox, curListIdx)
        },
        __bindUI: function (curMarqueeBox, curListIdx) {
            this.__marqueeRowAddVisible(curMarqueeBox, curListIdx);
        },
        __marqueeRowAddVisible: function (curMarqueeBox, curListIdx) {
            var _this = this;
            this.__loopRowTimeList = []
            setTimeout(function () {
                curMarqueeBox.querySelectorAll('.marquee-row-item').forEach(function (element, idx) {
                    var _w = element.scrollWidth;
                    if (_w > element.parentElement.clientWidth) {
                        
                        _this.__loopRowTimeList.push({ idx: idx,  element })
                    }

                });
                if (_this.__loopRowTimeList.length > 0) _this.__startScrollLeft(_this.__loopRowTimeList[0], 0, curListIdx)
                else {

                    setTimeout(function () {
                        if (_this.__contentArr.length > 1) {
                            _this.__loopScrollUp(curListIdx)
                        }
                    }, 2000)
                }
            }, 1000)
        },
        __loopRowTimeList: [],
        __loopScrollUp: function (curListIdx) {
            var _this = this;
            var __contentArrLen = _this.__contentArr.length
            var nextListIdx = curListIdx + 1 === __contentArrLen ? 0 : curListIdx + 1;
            if (__contentArrLen === 1) return _this.__startScrollLeft(_this.__loopRowTimeList[0], 0, curListIdx)
            var nextLoopList = _this.__contentArr[nextListIdx];
            [].forEach.call(_this.curMarqueeBox.children, function (item, idx) {
                setTimeout(function () {
                    var element = item.querySelector('.marquee-row-item');
                    var _newCon = ''
                    if (nextLoopList[idx] && nextLoopList[idx].row) {
                        _newCon =  '<i class="row-item-index">'+(nextListIdx * _this.options.limit + (idx+1))+'.</i>' + nextLoopList[idx].row
                    }
                    element.style.width = '100%'
                    setTimeout(function () {
                        
                        if (!_newCon) {
                            // element.innerHTML = _newCon
                            // item.classList.add('hidden');
                        }
                        else {
                            item.classList.remove('hidden')
                            
                        }
                        _this.__startFlip(item, element, _newCon)
                        //
                    }, 500)
                    if (idx === _this.curMarqueeBox.children.length -1) {
                        setTimeout(function () {
                            _this.__marqueeRowAddVisible(_this.curMarqueeBox, nextListIdx)
                        }, 1000)
                    }
                }, (idx + 1) * 1000)
            })
        },
        __startFlip: function (item, element, _newCon) {
            var start = null;
            var numbers = Number(item.dataset.numbers) || 0; 
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = timestamp - start;
                item.style.transform = 'rotateX(-' + Math.min((numbers+1)*360, progress / (1000 / (((numbers+1)*360)))+numbers * 360) + 'deg)';
                if (progress < 1000) {
                    window.requestAnimationFrame(step);
                }
                else {
                    window.cancelAnimationFrame(step)
                    if (!_newCon) {
                        item.classList.add('hidden');
                    }
                    element.innerHTML = _newCon
                    item.dataset.numbers = numbers + 1
                }
            }
            window.requestAnimationFrame(step)
        },
        __resetScrollLeft: function (options, idx, curListIdx) {
            var _this = this;
            var element = options.element;
            var _marqueeItem = element.parentElement.parentElement;
            setTimeout(function () {
                _marqueeItem.classList.remove('cur');
                element.style.transform = 'translateX(0)';
                if ((idx + 1) !== _this.__loopRowTimeList.length) _this.__startScrollLeft(_this.__loopRowTimeList[idx + 1], idx + 1, curListIdx)
                else _this.__loopScrollUp(curListIdx)
            }, 2000)
        },
        __startScrollLeft: function (options, idx, curListIdx) {
            var start = null;
            var element = options.element;
            var _marqueeItem = element.parentElement.parentElement;
            var _this = this;
            _marqueeItem.classList.add('cur');
            var _w = element.scrollWidth;
            element.style.width = _w + 'px'
            var diffWidth = _w - element.parentElement.clientWidth
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = timestamp - start;
                element.style.transform = 'translateX(-' + Math.min(progress / (1000 / diffWidth), diffWidth) + 'px)';
                if (progress < 1000) {
                    window.requestAnimationFrame(step);
                }
                else {
                    window.cancelAnimationFrame(step)
                   _this.__resetScrollLeft(options, idx, curListIdx)
                }
            }
            setTimeout(function () {
                window.requestAnimationFrame(step)
            }, 2000);
        }

    }
    return __marquee

});

