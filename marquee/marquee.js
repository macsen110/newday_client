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
            this.__renderUI(dom, options)
        },
        __renderUI: function (dom, options) {
            var _content = options.content;
            var _rowNums = _content.length;
            var _limit = options.limit;
            var _boxNums = Math.ceil(_rowNums / _limit);
            var _html = '';
            for (var _i = 0; _i < _boxNums; _i++) {
                var _ul = '<ul class="marquee-box">';
                var _items = ''
                for (var _j = _i * 5; _j < (_i + 1) * 5; _j++) {
                    if (_j >= _rowNums) break;
                    _items += '<li class="marquee-row">'
                        + '<div class="marquee-row-inner">'
                        + '<div class="marquee-row-item">' + _content[_j].row + '</div>'
                        + '<div class="marquee-row-item-last">' + _content[_j].row + '</div>'
                        + '</div>'
                        + '</li>'
                }
                _ul = _ul + _items + '</ul>';
                _html = _html + _ul;
            }
            dom.innerHTML = _html;
            this.__bindUI(dom, options, _boxNums)
        },
        __bindUI: function (dom, options, _boxNums) {
            if (_boxNums > 1) this.__loopScrollUp(this.__container, options, _boxNums)
            this.__marqueeRowAddVisible(dom.querySelectorAll('.marquee-box')[0], options.slideSpeed);
        },
        __marqueeRowAddVisible: function (curMarqueeBox, speed) {
            var _this = this;
            setTimeout(function () {
                curMarqueeBox.querySelectorAll('.marquee-row-item').forEach(function (element, idx) {
                    var _w = element.clientWidth;
                    if (_w > _this.__container.clientWidth) {
                        element.parentElement.classList.add('visible')
                        _this.__loopRowTimeList.push(setInterval(_this.__startScrollLeft.bind(null, curMarqueeBox.children[idx], _w), speed))
                    }

                });
            }, 1000)
        },
        __loopRowTimeList: [],
        __loopScrollUp: function (o, options, _boxNums) {
            var _this = this;
            var _n = 0;
            var p = false;
            var t;
            var sh;
            var lh = o.offsetHeight;
            //o.innerHTML += o.innerHTML;
            o.style.marginTop = 0;
            //_boxNums = _boxNums * 2;
            var _start = function () {
                sh = o.offsetHeight;
                o.style.height = sh + 'px';
                t = setInterval(_scrolling, options.carousel.speed);

                if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            }
            var _scrolling = function () {
                if (parseInt(o.style.marginTop) % lh != 0) {
                    _this.__stopScrollLeft(_n)
                    o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
                    if (Math.abs(parseInt(o.style.marginTop)) >= sh * (_boxNums - 1)) {
                        clearInterval(t);
                        _this.__marqueeRowAddVisible(o.querySelectorAll('.marquee-box')[_boxNums - 1], options.slideSpeed)
                        setTimeout(function () {
                            _this.__stopScrollLeft(_boxNums - 1)
                            o.style.marginTop = 0
                            _n = 0;
                            setTimeout(_start, options.carousel.delay);
                            _this.__marqueeRowAddVisible(o.querySelectorAll('.marquee-box')[_n], options.slideSpeed)
                        }, options.carousel.delay)
                    }
                }
                else {
                    clearInterval(t);
                    _n++
                    setTimeout(_start, options.carousel.delay);
                    _this.__marqueeRowAddVisible(o.querySelectorAll('.marquee-box')[_n], options.slideSpeed)
                }
            }
            setTimeout(_start, options.carousel.delay);
        },
        __stopScrollLeft: function (idx) {
            if (this.__loopRowTimeList.length == 0) return;
            this.__resetScrollLeft(idx)
            this.__loopRowTimeList.forEach(function (item) {
                clearInterval(item)
            })
            this.__loopRowTimeList = []
        },
        __resetScrollLeft: function (idx) {
            [].forEach.call(this.__container.querySelectorAll('.marquee-box')[idx].children, function (_item) {
                _item.scrollLeft && (_item.scrollLeft = 0)
            })

        },
        __startScrollLeft: function (area, _w) {
            if (area.scrollLeft >= _w) {
                area.scrollLeft = 0;
            } else {
                area.scrollLeft += 5;
            }
        }

    }
    return __marquee

});

