class xhr {
	constructor (opt) {

		this.method = 'GET';
		this.aysc = true;
		this.sendData = null;
		this.cache = true;
		if (typeof opt === 'object') {
			Object.assign(this, opt);
		}
		this.url = perfixerURL + this.url
		this.send();

	}
	send() {
	    var _xhr = new XMLHttpRequest();
		_xhr.timeout = 60000;
		this.withCredentials && (_xhr.withCredentials = true);
		_xhr.withCredentials = true
	    _xhr.open(this.method, this.url, this.aysc);
		
	    if (this.setHeader) {
	    	_xhr.setRequestHeader("Content-Type", this.setHeader);	    
	    }
		if (!this.cache) {
			_xhr.setRequestHeader("Pragma", "no-cache");
			_xhr.setRequestHeader("Cache-Control", "no-cache");
		}

	    _xhr.onload = function () {
	       if (_xhr.readyState === 4) {
	           if (_xhr.status === 200) {
	           		var sucData;
	           		if (_xhr.response) {
	                	sucData = JSON.parse(_xhr.response);
	           		}
	                this.done(sucData);
	           }
	           else{
	               var error = new Error("something went wrong");
	               this.faild(error);
	           }
	       }
	    }.bind(this);
	    _xhr.onerror = function(error){
	       this.faild(error);
	    }.bind(this)
	    _xhr.send(this.sendData)
	}
	done(data) {

	}
	faild() {

	}
}

export default xhr;