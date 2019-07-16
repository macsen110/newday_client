
//module ...
/****************
tab 切换插件
参数:
tabNav:表示tab click item
tabCon: 内容区域显示
tabNavItems 触发切换的element
tabConItems  显示区域的内容elements
curIndex 当前显示的index
*****/
function TabWidget(this:any,args:any) {
	if (args && ("object" == typeof args)) {
		for (var arg in args) {
			this[arg] = args[arg];
		}
	}
	this.tabNavContainer = this.tabNavContainer || document.querySelector('.tab-nav-container');
	this.tabConContainer = this.tabConContainer || document.querySelector('.tab-con-container');
	this.tabNavItems = this.tabNavItems || this.tabNavContainer.children;
	this.tabConItems = this.tabConItems || this.tabConContainer.children;
	this.curIdex = this.curIdex || 0;
	this.activeClass = this.activeClass || 'on'
	this.init()
	return this;
}

TabWidget.prototype = {
	constructor: TabWidget,
	init: function () {
		var self = this;
		self.change(this.curIdex);
		var className = this.tabNavItems[0].classList[0];
		if (self.tabNavItems) {
			_degegateDomFun(this.tabNavContainer, '.' + className, 'click', () => {
				self.change([].indexOf.call(self.tabNavItems, this))
			})
		}
	},
	change: function (index) {
		var self = this;
		var activeClass = this.activeClass;
		self.curIdex = index;
		if (self.tabNavItems) {
			[].forEach.call(self.tabNavItems, function (item, i) {
				if (i !== index) {
					item.classList.remove(activeClass);
					self.tabConItems[i].classList.remove(activeClass)
				}
				else {
					item.classList.add(activeClass);
					self.tabConItems[i].classList.add(activeClass)
				}
			})

		}
		else {
			[].forEach.call(self.tabConItems, function (item, i) {
				if (i !== index) item.classList.remove(activeClass)
				else item.classList.add(activeClass)
			})

		}
		if (self.callback) self.callback(index);
	}

}
/***
 * *dialog 页面弹框组件
 * *
 * *****/
//弹框
function Dialog(this: any, options: any) {
	this.title = null;
	this.content = null;
	this.foot = null;
	this.canMaskClose = true;
	this.className = ''
	this.type = 'dialog';
	this.container = document.createElement('div');
	this.isMask = true;
	this.config(options);
	this.mask = this.isMask ? '<div class="dialog-mask-bg"></div>' : '';
	this.open();
	return this;
}
Dialog.prototype = {
	constructor: Dialog,
	config: function (options) {
		if (typeof options === 'object') {
			for (var i in options) {
				this[i] = options[i]
			}
		}
		return this;
	},
	handleEvent: function (e) {
		var target = e.target;
		var classList = target.classList;

		//点击遮罩层,不做任何事情,直接摧毁弹框
		if (classList.contains('dialog-mask-bg')) {
			this.canMaskClose ? (this.maskAction ? this.maskAction() : this.close()) : null;
			return
		}
		//点击确定按钮
		if (classList.contains('btn-dialog-ok')) {
			this.afterOk();
			return
		}
		//点击取消按钮,或者关闭的图标
		if (classList.contains('btn-dialog-cancel') || classList.contains('icon-dialog-cancel')) {
			this.close()
		}
	},
	open: function () {
		this.container.className = "widget-dialog " + this.className;
		this.title = this.title ? '<div class="title">' + this.title + '</div>' : '';
		this.content = this.content ? '<div class="content">' + this.content + '</div>' : '';
		this.foot = this.foot ? '<div class="foot">' + this.foot + '</div>' : '';
		this.main = this.title + this.content + this.foot;
		this.container.innerHTML = '<div class="main">' + this.main + '</div>' + this.mask;
		var body = this.parentNode || document.body;
		var self = this;
		body.appendChild(this.container);
		//remeber do not write like this
		//this.container.addEventLister('click', this.close) 
		//this replay for the current object in the event callback functions

		this.afterOpen();

		this.container.addEventListener('click', this)

	},
	afterOpen: function () {
		//do something after the dialog open;
	},
	afterOk: function () {
		//default event is destory;
		this.destory()
	},
	close: function () {
		this.afterClose();
		this.destory();

	},
	afterClose: function () {
		//do something after the dialog close;
	},
	destory: function () {
		var body = this.parentNode || document.body;
		if (this.container) {
			body.removeChild(this.container);
			this.container = null;
		}
	}
};
/**
 * *easy Move
 * *页面滑动插件
 * *******/
function easyMove(this: any, element, options) {
	var isTouch = 'ontouchstart' in window;
	if (!element) return null;
	this.element = element;
	this.parentEle = options.parentEle || this.element;
	this.autoPlay = options.autoPlay;
	this.paginationList = options.paginationList;
	this.moveDomArr = [];
	this.originLength = element.children.length;
	this.index = options.index ? options.index : 0;
	this.duration = options.duration || 2000
	if (this.autoPlay) {
		for (var i = 0; i < this.originLength; i++) {
			this.moveDomArr[i + 1] = i;
		}
		this.moveDomArr[0] = this.originLength - 1;
		this.moveDomArr[this.originLength + 1] = 0;
		this.appendDom();
		this.index = this.index + 1;
	}
	this.child = element.children[0]; //选取一个子元素,以便可以随时获取其宽度
	this.length = element.children.length;
	this.focusIndex = options.focusIndex || 0;
	this.speed = options.speed || 300; //矫正动画时间ms
	this.offset = options.offset || 0; //选中点偏移
	this.limitBorder = options.limitBorder || false; //滑动后是否会回顶到边界，优先级高于offset
	this.showNum = options.showNum || this.length; //显示的元素个数（可选,只在limitBorder为true时需要）
	this.deltaX = 0;
	this.deltaY = 0;
	this.callback = options.callback || function () { }; //矫正动画完成后的回调函数
	this.touchMoveCb = options.touchMoveCb || function () { }; //监听动画滑动
	this.hasMoved = false; //是否触发过onTouchMove，用以区分点击与滑动
	this.orientation = options.orientation || 1; //滑动的方向,1为横向, 2为纵向
	this.distance = options.distance;//自定义滑动距离,

	if (this.parentEle.addEventListener) {
		this.parentEle.addEventListener(isTouch ? 'touchstart' : 'mousedown', this, false);
		this.element.addEventListener('webkitTransitionEnd', this, false);
		this.element.addEventListener('transitionend', this, false);
	}
	//判断横向还是竖向滑动,设置相应的宽或高
	if (this.orientation == 1) {
		this.childWidth = options.childWidth || this.child.clientWidth;
		this.parentWidth = options.parentWidth || this.childWidth * this.length;
	}
	else {
		this.childHeight = options.childHeight || this.child.clientHeight;
		this.parentHeight = options.parentHeight || this.childHeight * this.length;
	}
	setTimeout(this.init.bind(this), 100);
	return this;
}
easyMove.prototype = {
	constructor: easyMove,
	init: function () {
		var self = this;
		//设置item和container的宽度
		[].forEach.call(self.element.children, function (item) {
			if (self.orientation == 1) item.style.width = self.childWidth + 'px';
			else item.style.height = self.childHeight + 'px';
		})
		if (self.orientation == 1) self.element.style.width = self.parentWidth + 'px';
		else self.element.style.height = self.parentHeight + 'px';
		if (self.orientation == 1) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + (-(self.index - self.focusIndex) * self.childWidth) + 'px,0,0)';
		if (self.orientation == 2) self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + (-(self.index - self.focusIndex) * self.childHeight) + 'px,0)';
		self.move(self.index)
		self.paginationList && self.filterPagination(self.index)
		if (this.autoPlay) self._autoPlay()
	},
	appendDom: function () {
		var firstDom = this.element.children[0];
		var firstDomClone = firstDom.cloneNode(true);
		var lastDom = this.element.children[this.element.children.length - 1];
		var lastDomClone = lastDom.cloneNode(true);
		this.element.appendChild(firstDomClone);
		this.element.insertAdjacentElement('afterbegin', lastDomClone);
	},
	handleEvent: function (e) {
		var self = this;
		switch (e.type) {
			case 'mousedown':
				self.element.addEventListener('mousemove', self, false);
				self.element.addEventListener('mouseup', self, false);
				self.element.addEventListener('mouseout', self, false);
				self.onTouchStart(e);
				break;
			case 'mousemove':
				self.onTouchMove(e);
				break;
			case 'mouseup':
				self.element.removeEventListener('mousemove', self, false);
				self.element.removeEventListener('mouseup', self, false);
				self.element.removeEventListener('mouseout', self, false);
				self.onTouchEnd(e);
				break;
			case 'mouseout':
				self.element.removeEventListener('mousemove', self, false);
				self.element.removeEventListener('mouseup', self, false);
				self.element.removeEventListener('mouseout', self, false);
				self.onTouchEnd(e);
				break;
			case 'touchstart':
				self.parentEle.addEventListener('touchmove', self, false);
				self.parentEle.addEventListener('touchend', self, false);
				self.onTouchStart(e);
				break;
			case 'touchmove':
				self.onTouchMove(e);
				break;
			case 'touchend':
				self.parentEle.removeEventListener('touchmove', self, false);
				self.parentEle.removeEventListener('touchend', self, false);
				self.onTouchEnd(e);
				break;
			case 'webkitTransitionEnd':
			case 'msTransitionEnd':
			case 'oTransitionEnd':
			case 'transitionend':
				self.transitionEnd(e);
				break;
		}
	},
	onTouchStart: function (e) {
		var self = this;
		if (this.autoMove) this.clearAutoPlay()
		self.start = {
			pageX: e.touches ? e.touches[0].pageX : e.pageX,
			pageY: e.touches ? e.touches[0].pageY : e.pageY
		};
		//将动画时间设为0，以便在按下时马上结束尚在进行的动画
		self.element.style.webkitTransition = "-webkit-transform 0ms";
		self.autoPlay && self.touchStartResetTargetIndex(this.index);
	},
	onTouchMove: function (e) {
		var self = this;
		//若有多个touch或者被缩放则不滑动		
		if (e.touches && (e.touches.length > 1 || e.scale && e.scale !== 1)) return;
		var movePageX = e.touches ? e.touches[0].pageX : e.pageX;
		var movePageY = e.touches ? e.touches[0].pageY : e.pageY;
		self.deltaX = movePageX - self.start.pageX;
		self.deltaY = movePageY - self.start.pageY;
		//判断滑动方向
		//横向
		if (self.orientation == 1 && Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
			e.preventDefault();
			if (!self.hasMoved) self.touchMoveCb && self.touchMoveCb(self.index)
			self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(' + (self.deltaX - (self.index - self.focusIndex) * self.childWidth) + 'px,0,0)';
		}
		//纵向
		if (self.orientation == 2 && Math.abs(self.deltaY) > Math.abs(self.deltaX)) {
			e.preventDefault();
			if (!self.hasMoved) self.touchMoveCb && self.touchMoveCb(self.index)
			self.element.style.MozTransform = self.element.style.webkitTransform = 'translate3d(0,' + (self.deltaY - (self.index - self.focusIndex) * self.childHeight) + 'px,0)';
		}
		self.hasMoved = true;

	},
	onTouchEnd: function (e) {
		var self:any = this;

		if (!self.hasMoved) {
			if (self.orientation == 1) self.deltaX = 0; //若没有滑动过，重置值
			if (self.orientation == 2) self.deltaY = 0
		}
		self.hasMoved = false;
		//矫正位置到最贴近目标处
		if (self.orientation == 1) {
			var width = self.childWidth;
			var targetIndex;
			var Distance:string = (self.deltaX / width).toString()
			if (self.distance) {
				var remainderDistance = self.deltaX - parseInt(Distance) * width;
				if (remainderDistance > 0) {
					targetIndex = self.index - parseInt(Distance + (remainderDistance - self.distance > 0 ? 1 : 0))
				}
				else {
					targetIndex = self.index - (parseInt(Distance) + (Math.abs(remainderDistance) - self.distance > 0 ? -1 : 0));
				}
			}
			else targetIndex = self.index - Math.round(self.deltaX / width);

		}
		if (self.orientation == 2) {


			var height = self.childHeight;
			var targetIndex;
			var Distance = (self.deltaY / height).toString()
			if (self.distance) {
				var remainderDistance = self.deltaY - parseInt(Distance) * height;

				if (remainderDistance > 0) {
					targetIndex = self.index - (parseInt(Distance) + (remainderDistance - self.distance > 0 ? 1 : 0));
				}
				else {

					targetIndex = self.index - (parseInt(Distance) + (Math.abs(remainderDistance) - self.distance > 0 ? -1 : 0));
				}
			}
			else targetIndex = self.index - Math.round(self.deltaY / height);

		}
		targetIndex = self.limitIndex(targetIndex);

		self.autoMove(targetIndex);
		if (self.callback) {
			var choseId = self.index + self.offset;
			self.callback(self.index);
		}
		if (self.autoPlay) self._autoPlay()
	},
	transitionEnd: function (e) {
		this.paginationList && this.filterPagination(this.index)
	},
	autoMove: function (targetIndex) {

		var self = this;
		var style = this.element.style;
		style.webkitTransition = "-webkit-transform " + self.speed + "ms";
		if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + (-targetIndex * self.childWidth) + 'px,0,0)';
		if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + (-targetIndex * self.childHeight) + 'px,0)';
		self.index = targetIndex + self.focusIndex;
	},
	move: function (targetIndex) {
		var self = this;
		targetIndex -= self.offset;
		targetIndex = self.limitIndex(targetIndex);
		var style = this.element.style;
		setTimeout(function () {
			style.webkitTransition = "-webkit-transform " + self.speed + "ms";
			if (self.orientation == 1) style.MozTransform = style.webkitTransform = 'translate3d(' + (-targetIndex * self.childWidth) + 'px,0,0)';
			if (self.orientation == 2) style.MozTransform = style.webkitTransform = 'translate3d(0,' + (-targetIndex * self.childHeight) + 'px,0)';
		}, 0)
		self.index = targetIndex + self.focusIndex;
		if (self.callback) self.callback(self.index);
	},
	limitIndex: function (targetIndex) {
		var self = this;

		if (this.autoPlay && targetIndex == this.length) targetIndex = this.autoMoveResetTargetIndex()
		if (!self.limitBorder) {
			if (targetIndex < -self.offset) targetIndex = -self.offset;
			else if (targetIndex > self.length - 1 - self.offset) targetIndex = self.length - 1 - self.offset;
		}
		else {
			if (targetIndex < 0) targetIndex = 0;
			else if ((targetIndex > self.length - self.showNum + self.focusIndex)) targetIndex = self.length - (self.showNum - self.focusIndex);
		}

		targetIndex = targetIndex - self.focusIndex;
		return targetIndex;
	},
	autoMoveResetTargetIndex: function (targetIndex) {
		var self = this;
		self.resetTransformStyle(1)
		self.index = targetIndex = 2;
		return targetIndex
	},
	resetTransformStyle: function (idx) {
		var self = this;
		var style = this.element.style;
		style.MozTransform = style.webkitTransform = 'translate3d(' + (-idx * self.childWidth) + 'px,0,0)';
		style.webkitTransition = "-webkit-transform " + 0 + "ms";
	},
	touchStartResetTargetIndex: function (index) {
		if (index == 0) {
			this.resetTransformStyle(this.length - 2)
			this.index = this.length - 2;
		}
		if (index === this.length - 1) {
			this.resetTransformStyle(1)
			this.index = 1;
		}

	},
	clearAutoPlay: function () {
		clearInterval(this.autoPlayId)
	},
	_autoPlay: function () {
		this.autoPlayId = setInterval(() => { this.move(this.index + 1) }, this.duration)
	},
	filterPagination: function (index) {
		var curPaginationIndex = this.moveDomArr[index];
		[].forEach.call(this.paginationList.children, function (item, index) {
			item.classList.remove('active');
			if (index === curPaginationIndex) item.classList.add('active')
		})
	},

}

function showPrompt(this:any, args) {
	if (typeof args === 'object') {
		Object.keys(args).forEach((key) =>{
			this[key] = args[key]
		})
	}
	if (typeof args === 'string' || typeof args === 'number') this.msg = args;
	this.parentNode = this.parentNode || document.body;
	this.init()
	return this;
}
showPrompt.prototype = {
	constructor: showPrompt,
	init: function () {
		this._container = document.querySelector('.widget-prompt');
		if (this._container) { this.destory() }
		this.open()
	},
	open: function () {
		this._container = document.createElement('div');
		this._container.className = this.className ? this.className + ' widget-prompt' : 'widget-prompt';
		this._container.innerHTML = this.msg;
		this.parentNode.appendChild(this._container)
		this.promptTimer = setTimeout(() => {
			this.destory();
			if (this.cb) this.cb()
		}, this.duration || 3000);
	},
	destory: function () {
		this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container)
		this._container = null;
	}
}

function Loading(this:any, args) {
	if (typeof args === 'object') {
		Object.keys(args).forEach((key) => {
			this[key] = args[key]
		})
	}
	var tpl =
		'<div class="mask"></div>' +
		'<div class="widget-loading-inner">' +
		'<div class="loading-box">' +
		'<div class="block" id="rotate_01"></div>' +
		'<div class="block" id="rotate_03"></div>' +
		'<div class="block" id="rotate_05"></div>' +
		'<div class="block" id="rotate_07"></div>' +
		'</div>' +
		'<div class="loading-box">' +
		'<div class="block" id="rotate_02"></div>' +
		'<div class="block" id="rotate_04"></div>' +
		'<div class="block" id="rotate_06"></div>' +
		'<div class="block" id="rotate_08"></div>' +
		'</div>' +
		'</div>'

	this.html = this.html || tpl;
	this.parentNode = this.parentNode || document.body;
	return this;
}
Loading.prototype = {
	constructor: Loading,
	start: function () {
		if (!this._container) {
			this._container = document.createElement('div');
			this._container.innerHTML = this.html;
			this._container.className = this.className ? this.className + ' widget-loading' : 'widget-loading';
			this.parentNode.appendChild(this._container)
		}
		this._container.style.display = 'block';
		return this;
	},
	end: function () {
		this._container && (this._container.style.display = 'none');
	}
}


/**
 * private fun
 * delegate fun
 */
function _degegateDomFun(parentEle, selector, eventType, fun) {
	parentEle.addEventListener(eventType, function (e) {
		var targetDom = _getDomByEle(e.target, selector)
		if (targetDom) fun.bind(targetDom)()
	})
}
/**
 * getDombyEle
 */
function _getDomByEle(curentEl, selector) {
	var sign = selector[0];
	function getId() {
		while (curentEl) {
			if (curentEl.id === selector.slice(1)) return curentEl
			curentEl = curentEl.parentNode;
		}
		return undefined
	}
	function getClass() {
		while (curentEl) {
			if (curentEl.classList && curentEl.classList.contains(selector.slice(1))) return curentEl;
			curentEl = curentEl.parentNode;
		}
		return undefined
	}
	function getEleName() {
		while (curentEl) {
			if (curentEl.tagName === selector.toUpperCase()) return curentEl;
			curentEl = curentEl.parentNode;
		}
		return undefined
	}
	switch (sign) {
		case '.':
			return getClass()
		case '#':
			return getId()
		default:
			return getEleName();
	}
};
var _loading = new (Loading as any)()
export default {
	TabWidget: function (args) { return new (TabWidget as any)(args) },
	Dialog: function (args) { return new (Dialog as any) (args) },
	easyMove: function (dom, args) { return new (easyMove as any)(dom, args) },
	showPrompt: function (args) { return new (showPrompt as any)(args) },
	Loading: function (args) { return new (Loading as any)(args) },
	startLoading: function () { _loading && _loading.start() },
	endLoading: function () { _loading && _loading.end() }
}
