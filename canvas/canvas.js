;(function () {
  var page = {
    init: function () {
      this.bindUI()
    },
    $rootDom: $('body'),
    bindUI: function () {
      var iptFile = document.querySelector('.upload-pic')
      iptFile.addEventListener('change',function () {
        var files = this.files;
        if(files.length) {
          page._renderFile(files);
        }
      });
      this._bindClipImg()
    },
    _renderFile: function (files) {
			var self = this;
			var file = files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				//判断图片大小,不得超过3M
				var size = Math.floor(e.total / 1024 / 1024);
				if (size >= 3) {
					alert('图片过大, 请重新选择图片上传');
					return;
				} 
				try {

				
					EXIF.getData(file, function(){

						var orientation = this.exifdata.Orientation,
								rotateDeg = 0;
						if(typeof orientation === "undefined" || orientation === 1){ 
								//原本的readImgFile，添加一个rotateDeg的参数
								//handler.doReadImgFile(file, $img, $container, rotateDeg);
						}   
						//否则用canvas旋转一下
						else{
								rotateDeg = orientation === 6 ? 90*Math.PI/180 : 
																orientation === 8 ? -90*Math.PI/180 :
																orientation === 3 ? 180*Math.PI/180 : 0;
							//	handler.doReadImgFile(file, $img, $container, rotateDeg);
						} 
						self._clipImage(e.target.result, rotateDeg);  
					});
				}
				catch (e) {
					console.log(e)
				}
				//创建截图过程,裁剪图片
				//self._clipImage(e.target.result);
			}
			reader.readAsDataURL(file);
    },
    _getRectWidth: function (w, h) {
			return Math.min.call(null, w, h)
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
					console.log(crop_canvas.width)
					console.log(crop_canvas.height)
					console.log(imgPointX, imgPointY, width, height, cvsPointX, cvsPointY, width, height)
					crop_canvas.getContext("2d").drawImage(img, imgPointX, imgPointY, width, height, cvsPointX, cvsPointY, width, height);  
					return crop_canvas.toDataURL("image/png");
				}
				catch(e) {
					alert(e)
				}
			}
		},
		_resetClipImgStatus: function () {
			var self = this;
			self.clip.$clipContainer.hide();
			self.clip.$img[0].removeAttribute('style');
			self.clip.$img[0].src = '';
		},
    _clipImage: function (src, rotateDeg) {
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
				//APP.router.endLoading();
				self.clip.originImgSizeObj.width = this.width;
				self.clip.originImgSizeObj.height = this.height;
				var cvs = document.createElement('canvas');
				var ctx = cvs.getContext('2d');
				var destX;
				var destY;
				var width = img.naturalWidth,
				maxWidth = window.innerWidth,
        height = img.naturalHeight,
				imgRatio = width / height;
				//如果图片维度超过了给定的maxWidth 1500，
				//为了保持图片宽高比，计算画布的大小
				// if(width > maxWidth){
				// 		width = maxWidth;
				// 		height = width / imgRatio;
				// }   
				cvs.width = width;
				cvs.height = height;
				if (rotateDeg) {
						ctx.translate(cvs.width / 2, cvs.height / 2);
						ctx.rotate(rotateDeg);
						destX = -width / 2,
						destY = -height / 2;
				}
				
				try {
					ctx.drawImage(img, 0, 0);
				} catch (e) {
					alert(e)
				}				
				self.clip.$img.attr('src', cvs.toDataURL("image/png"));

				
				
			}
			
			img.onerror = function () {
				// APP.router.endLoading();
				// APP.ui.showPrompt('图片渲染失败,请稍后重试!')
				// self.clip.$clipContainer.hide();
			}
		},
		_previewImg: function (imgData) {
			var self = this;
			var $targetDom = self.$rootDom.find('.pic');
			var wrapTargetDom = self.$rootDom.find('.wrap-pic');
			wrapTargetDom.addClass('active');
			self.imgData = imgData;
			self.isImgChange = true;
			$targetDom[0].src = imgData;
			self.$rootDom
					.find('.down-btn')
					.attr('href', imgData)
					.attr('download', 'aa.png')
		},
	}
	
  
  page.init();
}())