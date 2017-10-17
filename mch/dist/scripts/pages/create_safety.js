/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto', 'template'], function($, template){  
	
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj) {
			var html = require('./tpl/create_safety.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this);
				this.show(html, stateObj)
			}
		},
		show: function (tplScript, stateObj) {
			APP.tools.pageCount();
			this.$rootDom.addClass('page-create-safety visibile');
			this.$rootDom.append(tplScript);
			if (APP.profileInfo.childState == 0) {
				stateObj = JSON.parse(localStorage.babyInfoObj);
				stateObj.pic = stateObj.pictureInputStream;
			}
			stateObj.dateBorn = stateObj.dateBorn.replace(/-/g, '.');
			if (APP.profileInfo.childState == 1) stateObj.pic = decodeURIComponent(stateObj.pic);
			if (APP.profileInfo.childState == 1) stateObj.sex = decodeURIComponent(stateObj.sex);
			stateObj.name = APP.profileInfo.name;
			var starName = this._getStarSign(parseInt(stateObj.dateBorn.split('.')[1]),parseInt(stateObj.dateBorn.split('.')[2]))
			this.chageWordsArr = [
				'我是无敌的'+starName+'宝宝',
				'我是萌萌哒'+starName+'宝宝',
				starName+'宝宝最讨人喜欢',
				starName+'宝宝都很有钱哦',
				starName+'的宝宝最聪明呢',
				'我是妈妈的小心肝',
				(stateObj.sex == "小王子" || stateObj.sex == "兄弟连") ? ' 我是建设银行哦' : ' 我是招商银行哦',
				' 我是妈妈的小棉袄',
				' 我是爸妈的小确幸',
				' 我是爸妈的小天使',
				' 我是爸妈的熊孩子',
				' 我是家里的大明星',
				' 我是爸妈的骄傲',
			]
			this.initSelectIndex = Math.floor(Math.random() * this.chageWordsArr.length);
			stateObj.words =  this.chageWordsArr[this.initSelectIndex].replace(/\s/g,'\u00A0');
			var html = template('create_safety_template', stateObj);
			this.$rootDom.prepend(html);
			this.bindUI(stateObj);
			APP.selectBottomNav(-2);
		},
		bindUI: function (obj) {
			var self = this;
			var $btn = self.$rootDom.find('.btn');
			var $changeWordsBtn = self.$rootDom.find('.change-words-btn');
			var $words = self.$rootDom.find('.words');
			var babyIamg = self.$rootDom.find('#baby');
			babyIamg.on('load', function () {
				self.babyWidth = this.width;
				self.babyHeight = this.height;
				$(this).hide()
			})
			$btn.on('click', function () {
				self._createCanvas(obj.sex, obj.weight, obj.dateBorn, obj.pic)
				APP.tools.recordBehavior('/infanthospital/v1/superShare', {shareType: 3, clickType:1})
			})
			$changeWordsBtn.on('click', function () {
				var totalLen = self.chageWordsArr.length
				var initIndex = Math.floor(Math.random() * self.chageWordsArr.length);
				initIndex = self._getValidIndex(self.initSelectIndex, initIndex, totalLen);
				self.initSelectIndex = initIndex;
				$words.html(self.chageWordsArr[initIndex].replace(/\s/g,'\u00A0'))
			})
		},
		_getValidIndex: function (cur, passIdx, total) {
			if (cur == passIdx) {
				passIdx = passIdx == total -1 ? passIdx -1 : passIdx + 1;   
			}
			return passIdx
		},
		_saveData: function (sex, weight, dateBorn, imgData) {
			var self = this;
			var data = {
				request_context: {
					customerId:  APP.profileInfo.customerId,
					appType:  APP.openType,
					uid: APP.uid,                    
					sex: sex,
					weight: weight,
					dateBorn: dateBorn,
					pictureInputStream: '',
					tellSafyPictureStream: imgData,
					type: APP.profileInfo.childState == 1 ? 1 : 3,
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			};
			
			$.ajax({
				url : APP.host.api + '/infanthospital/v1/childInfo',
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json',
				success: function (res) {
					if (res.ret == 1) {
						APP.router.gotoPage({
							pageName: 'create_safety_share',
							pic: encodeURIComponent(res.data.safyPicturesPath)
						})
						
					}
				}
			})
		},
		_createCanvas: function (sex, weight, dateBorn, imgUrl) {
			var self = this;
			var imgArr = [
				{
					name: 'baby',
					value: imgUrl
				},
				{
						name:　'avatar',
						value: 'icon_select_pregnant_2'
				}, 
				{
						name: 'wrapBaby',
						value: 'bg_wrap_baby_'+((sex == "小王子" || sex == "兄弟连") ? 'boy' : 'girl'),
						height: 582,
						width: 535
				}, 
				
				{
						name:　'testTitle',
						value: 'bg_canvas_title',
						width: 464,
						height: 78
				},
				{
						name: 'logo',
						value: 'logo_white',
						width: 186,
						height: 45
				}
			];
			var newImgArr = [];

			imgArr.forEach(function (item, idx) {
					var img = new Image();
					img.crossOrigin="Anonymous";
					if (idx == 0) img.src = item.value;
					else img.src = './images/'+item.value+'.png';
					img.onload = function () {
						var obj = {
								name: item.name,
								value: this,
								height: item.height ? item.height : this.height,
								width: item.width ? item.width : this.width       
						};
						newImgArr.push(obj);
						if (newImgArr.length == imgArr.length) {
							var imgData = createCanvas(sex, weight, dateBorn);
						   
							self._saveData(sex, weight, dateBorn, imgData);
						}
					}
			})
			function createCanvas(babySex, babyWeight, babyDateBorn) {
				var cvs = document.createElement('canvas');
				cvs.width = 640;
				cvs.height = 1016;
				var ctx = cvs.getContext('2d');
				var grad = ctx.createLinearGradient(0, 0, 640, 1016);
				var baby = newImgArr.filter(function (item) {return item.name == 'baby'} )[0];
				var avatar = newImgArr.filter(function (item) {return item.name == 'avatar'} )[0];
				var wrapBaby = newImgArr.filter(function (item) {return item.name == 'wrapBaby'} )[0];
				var testBoy = self.$rootDom.find('.pic')[0];
				var testTitle = newImgArr.filter(function (item) {return item.name == 'testTitle'} )[0];
				var logo = newImgArr.filter(function (item) {return item.name == 'logo'} )[0];
				grad.addColorStop(0,'#8753e7');
				grad.addColorStop(1,'#e05bc1');
				ctx.fillStyle = grad;
				ctx.fillRect(0, 0, 640, 1016);
				ctx.drawImage(avatar.value, 0, 0, avatar.width, avatar.height, 34, 24, 100, 100);
				ctx.font='24px Arial';
				ctx.fillStyle = '#fff';
				var title = '辣妈 '+APP.profileInfo.name+'  向你扔来了一个小宝宝';
				ctx.fillText(title,188,86);
				ctx.font = '40px fzzh';
				ctx.fillStyle = '#fff';
				var t2 = babyDateBorn.replace(/-/g, '.');
				ctx.fillText(t2, 188, 166);
				ctx.font = '32px fzzh';
				var t3 = 'wuli'+babySex+'在一妇婴平安诞生啦';
				ctx.fillText(t3, 76, 216);
				ctx.font = '32px fzzh';
				ctx.drawImage(baby.value, 0, 0, baby.width, baby.height, 126, 290, 400, 400);
				ctx.drawImage(wrapBaby.value, 0, 0, wrapBaby.width, wrapBaby.height, 58, 230, wrapBaby.width, wrapBaby.height);
				ctx.drawImage(testTitle.value, 0, 0, testTitle.width, testTitle.height, 150, 36, testTitle.width, testTitle.height);
				ctx.drawImage(logo.value, 0, 0, logo.width, logo.height, 228, 914, logo.width, logo.height);
				ctx.font = '32px fzzh';
				ctx.fillStyle = "#5e555a";
				var t4 = self.chageWordsArr[self.initSelectIndex];
				ctx.fillText(t4, 164, 720);
				ctx.fillStyle = (babySex == "小王子" || babySex == "兄弟连") ? '#4181e2' : '#e76f43';
				ctx.font = '46px fzzh';
				ctx.fillText(babyWeight+'g', 134, 336);
				var urlData = cvs.toDataURL('image/jpeg');
				return urlData;
			}
			
		},
		_getStarSign: function (month, date) {
			var value;
			if (month == 1 && date >=20 || month == 2 && date <=18) {value = '水瓶座';}
			if (month == 2 && date >=19 || month == 3 && date <=20) {value = '双鱼座';}
			if (month == 3 && date >=21 || month == 4 && date <=19) {value = '白羊座';}
			if (month == 4 && date >=20 || month == 5 && date <=20) {value = '金牛座';}
			if (month == 5 && date >=21 || month == 6 && date <=21) {value = '双子座';}
			if (month == 6 && date >=22 || month == 7 && date <=22) {value = '巨蟹座';}
			if (month == 7 && date >=23 || month == 8 && date <=22) {value = '狮子座';}
			if (month == 8 && date >=23 || month == 9 && date <=22) {value = '处女座';}
			if (month == 9 && date >=23 || month == 10 && date <=22) {value = '天秤座';}
			if (month == 10 && date >=23 || month == 11 && date <=21) {value = '天蝎座';}
			if (month == 11 && date >=22 || month == 12 && date <=21) {value = '人马座';}
			if (month == 12 && date >=22 || month == 1 && date <=19) {value = '摩羯座';}
			return value;
		},
		init: function (stateObj) {
			
			this.ready(stateObj);
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.removeClass('page-create-safety visibile');
			this.$rootDom.html('');
		} 
	};
	
	return pageInitObj

	
});
