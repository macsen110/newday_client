/**
 * Created by wudi on 15/11/30.
 */
 define(['zepto','template', 'EXIF'], function($, template,EXIF){  
	 var pageInitObj = {
		$rootDom: $('#page_container'),
		ui: {},
		ready: function (stateObj, childData) {
			var tplScript = require('./tpl/declare_safety.html');
			if (APP.router.curPathName == stateObj.pageName) {
				APP.router.setRouter(stateObj, this)
				this.show(tplScript, childData)
			}
		},
		show: function (tplScript, childData) {
			
			APP.tools.pageCount();
			this.$rootDom.html(tplScript);
			if (APP.profileInfo.childState == 0 && localStorage.babyInfoObj) {
				this.imgData = 1;
				childData = JSON.parse(localStorage.babyInfoObj);
				if (childData.dateBorn) {
					var dateArr = this._getSerializeDate(childData.dateBorn);
					childData.dateBornText = dateArr[0] + '年' + dateArr[1]+'月' + dateArr[2] +'日';
				}
				childData.babyPictures = childData.pictureInputStream;
			}
			var html = template('declare_safety_template', childData);
			this.$rootDom.prepend(html);
			this.bindUI();
			APP.selectBottomNav(-2);
		},
		bindUI: function () {
			var self = this;
			self.$rootDom.addClass('page-declare-safety visibile');
			$('body').find('.logobg').css('visibility', 'hidden');
			var $uploadIpt = self.$rootDom.find('.upload-avatar');
			$('input[type=file]').on('change',function(){
				var files = this.files;
				if(files.length) {
					APP.router.startLoading();
					self._renderFile(files);
				}
			});
			self.$rootDom.find('.gener-btn').on('click', function(e) {
				e.preventDefault();
				self._validData();
			})
			if(APP.tools.platform() == 2) self.$rootDom.find('.birth').addClass('ios')
			self._setPageInfo();
			self._bindClipImg();
			APP.tools.selectValueChange(self.$rootDom.find('.birth'), self._changeChildBirth.bind(self))
		},
		_bindClipImg: function () {
			var self = this;
			self.clip = {};
			self.clip.$clipContainer = self.$rootDom.find('.clip-image-container');
			self.clip.$img = self.clip.$clipContainer.find('.clip-img');
			self.clip.$overLay = self.clip.$clipContainer.find('.overlay');
			self.clip.originImgSizeObj = {};
			var $btn_ok = self.clip.$clipContainer.find('.ok');
			var $btn_cancel = self.clip.$clipContainer.find('.cancel');
			var wrapImg = $('.img-move')[0];
			var deltaX;
			var deltaY;
			var startPos = {};
			self.clip.$img[0].addEventListener('touchstart', function (e) {
				deltaX = e.touches[0].pageX;
				deltaY = e.touches[0].pageY;
				startPos.X = self.clip.$img.offset().left -self.clip.$clipContainer.width() / 2;
				startPos.Y = self.clip.$img.offset().top - self.clip.$clipContainer.height() / 2;
			})        
			self.clip.$img[0].addEventListener('touchmove', function (e) {
				e.preventDefault();
				var moveX = startPos.X + (e.touches[0].pageX - deltaX);
				var moveY = startPos.Y + (e.touches[0].pageY - deltaY);
				this.style.MozTransform = this.style.webkitTransform = 'translate3d(' + moveX + 'px,'+moveY+'px,0)';
				//e.preventDefault();
			})
			$btn_ok.on('click', function (e) {
				self._previewImg(createImageData());
				self._resetClipImgStatus();
				
			})
			$btn_cancel.on('click', function () {
				self._resetClipImgStatus();
			})
			function createImageData() {
				try{
					var radion = (self.clip.originImgSizeObj.width / self.clip.overLayWidth) > 1 ? (self.clip.originImgSizeObj.width / self.clip.overLayWidth) : 1;
					var imgPointY = (-self.clip.$overLay.offset().top + self.clip.$img.offset().top) * radion;
					var imgPointX =  self.clip.$img.offset().left * radion;
					var width = self.clip.originImgSizeObj.width;
					var height =  self.clip.originImgSizeObj.height; 
					var crop_canvas = document.createElement('canvas');  
					var cvsPointX;
					var cvsPointY;
					crop_canvas.width = self.clip.originImgSizeObj.width > self.clip.overLayWidth ? self.clip.originImgSizeObj.width : self.clip.overLayWidth;  
					crop_canvas.height = crop_canvas.width; 
					var context = crop_canvas.getContext("2d");
					context.fillStyle="#ffffff";
					context.fillRect(0,0,crop_canvas.width,crop_canvas.height);
					//alert('imgPointX: ' + imgPointX +' imgPointY: ' + imgPointY + 'width: '+ width+' imgHeight:'+height+' cvsPointX: ' + cvsPointX+' cvsPointY: ' + cvsPointY);
					if (width < self.clip.overLayWidth) {
						if (imgPointY > 0) height = self.clip.overLayWidth - imgPointY > height ? height : self.clip.overLayWidth - imgPointY;
						else height = height - Math.abs(imgPointY);
						if (imgPointX > 0) width = self.clip.overLayWidth - imgPointX > width ?  width : width - (imgPointX - self.clip.overLayWidth);
						if (imgPointX < 0 ) width = width - Math.abs(imgPointX);
					}
					else {
						if (width < height) height = height - Math.abs(imgPointY) > width ? width : height - Math.abs(imgPointY)
						else {
							if (imgPointY > 0) height = width - Math.abs(imgPointY) > height ? height : width - imgPointY;
							else height = height + imgPointY
						}
						//height = width - Math.abs(imgPointY) > height ? height : (imgPointY > 0 ? height - Math.abs(width - imgPointY) : height + imgPointY)
						width = width - Math.abs(imgPointX);
					}
					cvsPointX =  imgPointX > 0 ?  imgPointX : 0;
					cvsPointY =  imgPointY > 0 ?  imgPointY : 0;
					imgPointX = imgPointX > 0 ?  0 : -imgPointX;
					imgPointY = imgPointY > 0 ? 0: -imgPointY;
					var img = new Image;
					img.src = self.clip.$img[0].src;
					//alert(crop_canvas.width)
				   // alert('imgPointX: ' + imgPointX +' imgPointY: ' + imgPointY + 'width: '+ width+' imgHeight:'+height+' cvsPointX: ' + cvsPointX+' cvsPointY: ' + cvsPointY);
					crop_canvas.getContext("2d").drawImage(img, imgPointX, imgPointY, width, height, cvsPointX, cvsPointY, width, height);  
					return crop_canvas.toDataURL("image/png");
				  
				  //return drawImageIOSFix(crop_canvas, img, imgPointX, imgPointY, width, self.clip.originImgSizeObj.height - 2*imgPointY, 0, 0, 375, 375);
				}
				catch(e) {
					alert(e)
				}
			}
			/**
			 * Detecting vertical squash in loaded image.
			 * Fixes a bug which squash image vertically while drawing into canvas for some images.
			 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
			 * 
			 */
			function detectVerticalSquash(img) {
				var iw = img.naturalWidth, ih = img.naturalHeight;
				var canvas = document.createElement('canvas');
				canvas.width = 1;
				canvas.height = ih;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				var data = ctx.getImageData(0, 0, 1, ih).data;
				// search image edge pixel position in case it is squashed vertically.
				var sy = 0;
				var ey = ih;
				var py = ih;
				while (py > sy) {
				var alpha = data[(py - 1) * 4 + 3];
				if (alpha === 0) {
				ey = py;
				} else {
				sy = py;
				}
				py = (ey + sy) >> 1;
				}
				var ratio = (py / ih);
				return (ratio===0)?1:ratio;
			}

			/**
			 * A replacement for context.drawImage
			 * (args are for source and destination).
			 */
			function drawImageIOSFix(canvas, img, sx, sy, sw, sh, dx, dy, dw, dh) {
				var vertSquashRatio = detectVerticalSquash(img);
				// Works only if whole image is displayed:
				// ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
				// The following works correct also when only a part of the image is displayed:
				canvas.getContext('2d').drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio, 
							sw * vertSquashRatio, sh * vertSquashRatio, 
							dx, dy, dw, dh );
							alert(canvas.toDataURL("image/png"));
							return canvas.toDataURL("image/png")
				
			}
			//drawImageIOSFix(context, img, sx, sy, sw, sh, dx, dy, dw, dh);
		},
		_resetClipImgStatus: function () {
			var self = this;
			self.clip.$clipContainer.hide();
			self.clip.$img[0].removeAttribute('style');
			self.clip.$img[0].src = '';
		},
		_setPageInfo: function () {
			var self = this;
			$('body').addClass('bg-color-common');
			
			APP.tools.setPageTitle(self.origin == '2' ? '怀孕日记' :'报平安')
		},
		_validData: function () {
			var self = this;
			var form = self.$rootDom.find('form')[0];
			if (!self.imgData) {
				APP.ui.showPrompt('请选择一张图片上传');
				return;
			}
			var babySex = form.sex;
			if (babySex.value == 0) {
				APP.ui.showPrompt('请选择婴儿性别');
				return;
			}
			var babyBirth = form.birth;
			if (babyBirth.value == '') {
				APP.ui.showPrompt('请选择婴儿生日');
				return;
			}
			var babyWeight = form.weight;
			var babyWeightVal = $.trim(babyWeight.value);
			if (babyWeightVal == '') {
				APP.ui.showPrompt('请输入婴儿体重');
				babyWeight.focus();
				return;
			}
			
			if (babyWeightVal.length !=4 || babyWeightVal < 1000) {
				APP.ui.showPrompt('请输入合法体重');
				babyWeight.focus();
				return;
			}
			var type = self.origin == 2 ? 2 : 1;
			self._saveData(type, babySex.value, babyWeight.value, babyBirth.value, self.imgData);
		},
		_saveData: function (type, sex, weight, dateBorn, imgData) {
			var self = this;
			var getImageData = function () {
				var newImgData;
				if (APP.profileInfo.childState == 0) newImgData = self.$rootDom.find('.avatar-container .pic').attr('src');
				else newImgData = self.isImgChange ? imgData : '';
				return newImgData
			}
			var babyInfoObj = {
				customerId:  APP.profileInfo.customerId,
				appType:  APP.openType,
				uid: APP.uid,                    
				sex: sex,
				weight: weight,
				dateBorn: dateBorn,
				pictureInputStream: getImageData(),
				tellSafyPictureStream: '',
				type: type,
			} 
			if (APP.profileInfo.childState == 0) {
				localStorage.setItem('babyInfoObj', JSON.stringify(babyInfoObj))
				APP.router.gotoPage({pageName: 'create_safety'});
				return;
			}
			var data = {
				request_context: babyInfoObj,
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
						if (type == 1) {
							var obj = {
								pageName: 'create_safety',
								sex: encodeURIComponent(sex),
								weight: weight,
								dateBorn: dateBorn,
								pic: encodeURIComponent(res.data.babyPicturesPath)
							}
							APP.router.gotoPage(obj);
						}
						else APP.router.gotoPage({pageName: 'pregnant_record', pregnantStatus: 2})
					}

				}
			})
			// $('#holder_data').attr('src', imgData);
			// return;
		},
		_getSerializeDate: function (date) {
			var newArr = date.split('-');
			return newArr
		},
		_changeChildBirth: function (val) {
			var self = this;
			var $childVal = self.$rootDom.find('.child-val-label');
			if (val) {
				var dateArr = self._getSerializeDate(val);
				$childVal.text(dateArr[0] + '年' + dateArr[1]+'月' + dateArr[2] +'日')
			}
		},
		_renderFile: function (files) {
			var self = this;
			var file = files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				//判断图片大小,不得超过3M
				var size = Math.floor(e.total / 1024 / 1024);
				if (size >= 3) {
					APP.router.endLoading();
					APP.ui.showPrompt('图片过大, 请重新选择图片上传');
					return;
				} 
				//创建截图过程,裁剪图片
				self._clipImage(e.target.result);
			}
			reader.readAsDataURL(file);
		},
		_previewImg: function (imgData) {
			var self = this;
			var $targetDom = self.$rootDom.find('.pic');
			var wrapTargetDom = self.$rootDom.find('.wrap-pic');
			wrapTargetDom.addClass('active');
			self.imgData = imgData;
			self.isImgChange = true;
			$targetDom[0].src = imgData;
			
		},
		_clipImage: function (src) {
			var self = this;
			self.clip.$clipContainer.show();
			self.clip.fullWidth = self.clip.$clipContainer.width();
			self.clip.fullHeight = self.clip.$clipContainer.height();
			self.clip.overLayWidth =  self._getRectWidth(self.clip.fullWidth, self.clip.fullHeight);
			self.clip.$overLay.css({
				width: self.clip.overLayWidth,
				height: self.clip.overLayWidth
			})
			var img = new Image();
			img.src = src;
			img.onload = function () {
				APP.router.endLoading();
				self.clip.originImgSizeObj.width = this.width;
				self.clip.originImgSizeObj.height = this.height;
				//alert('width: ' + self.clip.originImgSizeObj.width + ' height: ' + self.clip.originImgSizeObj.height)
				self.clip.$img.attr('src', src);
				EXIF.getData(img, function() {
					imgExif=EXIF.getAllTags(this);
					var scale = img.width/img.height;
					if(imgExif.Orientation==6){
						scale = img.height/img.width;
						if (scale < 1) {self.clip.$img.css({width: '100%','height':self.clip.originImgSizeObj.height/ (self.clip.originImgSizeObj.width/self.clip.fullWidth)+'px'});}
					}
					// alert(scale);
					// if(scale>1){
					//     self.clip.$img.css({'width':'auto','height':'100%'});
						
					// } else {
					//     self.clip.$img.css({'width':'100%','height':'auto'});
						
					// } 

				});
			}
			img.onerror = function () {
				APP.router.endLoading();
				APP.ui.showPrompt('图片渲染失败,请稍后重试!')
				self.clip.$clipContainer.hide();
			}
		},
		_getRectWidth: function (w, h) {
			return Math.min.call(null, w, h)
		},
		
		init: function (stateObj) {
			var self = this;
			self.isImgChange = false;
			self.origin = stateObj.pregnantStatus ? stateObj.pregnantStatus : null;
			self._getChildInfo(stateObj)
		},
		_getChildInfo: function (stateObj) {
			var self = this;
			if (APP.profileInfo.childState == 0) {
				self.ready(stateObj, {})
				return;
			}
			localStorage.removeItem('babyInfoObj')
			var data = {
				 request_context: {
					customerId:  APP.profileInfo.customerId,
					appType:  APP.openType,
					uid: APP.uid                    
				},
				access_token: localStorage.getItem('token'),
				system: 'mch'
			}
			$.ajax({
				url : APP.host.api + '/infanthospital/v1/getChildInfo',
				data: JSON.stringify(data),
				type : 'post',
				contentType : 'application/json',
				success: function (res) {
					if (res.ret == 1) {
						var result = self._todoData(res.data)
						self.ready(stateObj, result) 
					}
					else APP.ui.showPrompt(res.msg)
				}
			})
		},
		_todoData: function (data) {
			var self = this;
			if (data.dateBorn) {
				var dateArr = self._getSerializeDate(data.dateBorn);
				data.dateBornText = dateArr[0] + '年' + dateArr[1]+'月' + dateArr[2] +'日';
			}
			if (data.babyPictures) self.imgData = data.babyPictures;
			if (parseInt(data.weight) < 10)  data.weight = data.weight * 1000;
			return data
		},
		destroy: function () {
			//如果有事件绑定的话, 解除事件绑定
			this.$rootDom.html('');
			this.$rootDom.removeClass('page-declare-safety visibile');
			//$('body').find('.logobg').show();
			$('body').find('.logobg').css('visibility', 'visible')
			$('body').removeClass('bg-color-common');
		} 
	}
	
	return pageInitObj

	
})
