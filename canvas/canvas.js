;(function () {
  var page = {
    init: function () {
			//this.demo()
      this.bindUI()
    },
		$rootDom: $('body'),
		demo: function () {
			var cvs = document.getElementById('create_canvas_box')
			var ctx = cvs.getContext('2d')
			// cvs.width = 100;
			// cvs.height = 30;
			ctx.fillStyle = 'blue';
			ctx.rotate(90 * Math.PI / 180);
			ctx.translate(30, -100)
			ctx.fillRect(0,0,100,30);
		},
    bindUI: function () {
      var iptFile = document.querySelector('.upload-pic')
      iptFile.addEventListener('change',function () {
        var files = this.files;
        if(files.length) {
					page._renderFile(files);
					this.value = '';
        }
			});
			this.$rootDom.find('.down-btn')
				.click(function () {
					this.download()
				}.bind(this))
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
				self._previewImg();
				self._resetClipImgStatus();
				
			})
			$btn_cancel.on('click', function () {
				self._resetClipImgStatus();
			})
		},
		_resetClipImgStatus: function () {
			var self = this;
			self.clip.$clipContainer.hide();
			self.clip.$img[0].removeAttribute('style');
			self.clip.$img[0].src = '';
		
		},
    _clipImage: function (src, rotateDeg) {
			var self = this;
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
				cvs.id = 'create_canvas_box';
				var ctx = cvs.getContext('2d');
				var destX = 0;
				var destY = 0;
				var width = img.naturalWidth,
				maxWidth = window.innerWidth,
        height = img.naturalHeight,
				imgRatio = width / height;
				//如果图片维度超过了给定的maxWidth 1500，
				//为了保持图片宽高比，计算画布的大小
				if(width > maxWidth){
						width = maxWidth;
						height = width / imgRatio;
				} 
				cvs.width = width;
				cvs.height = height;  
				self.clip.$clipContainer.show()
				self.clip.$clipContainer.append(cvs);
				if (rotateDeg) {
						cvs.width = cvs.height = img.naturalWidth > img.naturalHeight ? img.naturalWidth : img.naturalHeight;
						ctx.rotate(rotateDeg);
						ctx.translate(0, -Math.abs(img.naturalWidth - Math.abs(img.naturalWidth-img.naturalHeight)/2))
						ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, destX, destY, img.naturalWidth, img.naturalHeight);
						var newImg = new Image;
						newImg.src = cvs.toDataURL("image/png");
						newImg.onload = function () {
							cvs.remove()
							var w = img.naturalHeight;
							var h = this.height;
							var newCanvas =  document.createElement('canvas');
							newCanvas.id = 'create_canvas_box';
							if(w > maxWidth){
								w = maxWidth;
								h = w * imgRatio;
							} 
							newCanvas.width = w;
							newCanvas.height = h;
							var newCtx = newCanvas.getContext('2d');
							self.clip.$clipContainer.append(newCanvas);
							newCtx.drawImage(newImg, Math.abs((img.naturalWidth-img.naturalHeight)/2), 0, img.naturalHeight, img.naturalWidth, 0, 0, w, h);
							self.clip.$img.attr('src', newCanvas.toDataURL("image/png"));
						}
						self.clip.$img.attr('src', cvs.toDataURL("image/png"));
				}
				else ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, destX, destY, width, height);
				//console.log(destY)
				
				try {
					
				} catch (e) {
					alert(e)
				}				
				
				
				
				
			}
			
			img.onerror = function () {
				// APP.router.endLoading();
				// APP.ui.showPrompt('图片渲染失败,请稍后重试!')
				// self.clip.$clipContainer.hide();
			}
		},
		_previewImg: function (imgData) {
			var self = this;
			var $container = self.$rootDom.find('.container');
			$container.addClass('active');
			var previewResultImg = document.getElementById('preview_result_img')
			var canvas = document.getElementById('create_canvas_box');
			previewResultImg.src = canvas.toDataURL("image/png")
			canvas.remove()
			self.$rootDom
					.find('.down-btn')
					.attr('href', canvas.toDataURL("image/png"))
					.attr('download', 'aa.png')
			
		},
		download: function () {
			var self = this;
			
		}
	}
	
  
  page.init();
}())