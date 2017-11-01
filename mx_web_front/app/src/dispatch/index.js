
var events = {
	clientList: [],
	register: function (key, fn) {
			 if (!this.clientList[key]) {
						this.clientList[key] = [];
			 }
			 this.clientList[key].push(fn)  //订阅的消息添加进缓存列表
	},
	trigger: function () {
			 var key = Array.prototype.shift.call(arguments),
						fns = this.clientList[key];
			 if(!fns || fns.length === 0) {   //如果没有绑定对应的消息
						return false
			 }
			 for (var i = 0, fn ; fn = fns[i++]) {
						fn.apply(this, arguments)  // arguments 是trriger时带上的参数
			 }
	},
	remove: function (key, fn) {
			 var fns = this.clientList[key];
			 if (!fns) { //如果key对应的消息没有被人订阅,则直接返回
						return false
			 }
			 if (!fn) {  //如果没有传入具体的回调函数,表示需要取消key对应消息的所有订阅
						fns && (fns.length = 0)
			 }else {
						for (var l = fns.length -1; l >= 0; l--) {
								 var _fn = fns[l];
								 if(_fn === fn) {
											fns.splice(l, 1)
								 }
						}
			 }

	}
}

export default events;