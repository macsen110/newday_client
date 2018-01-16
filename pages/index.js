function xhr(opt) {
  this.method = 'GET';
  this.aysc = true;
  this.sendData = null;
  this.cache = true;
  if (typeof opt === 'object') {
    for (var i in opt) this[i] = opt[i]
  }
  this.send();

}
xhr.prototype = {
  constructor: xhr,
  send: function () {
    var _xhr = new XMLHttpRequest();
    _xhr.timeout = 60000;
    _xhr.open(this.method, this.url, this.aysc);
    this.withCredentials && (_xhr.withCredentials = true);
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
             var sucData = _xhr.response;
             if (_xhr.response && self.dataType == 'json') {
               
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
  },
  done: function (data) {

  },
  faild: function()  {

  }
}
;(function () {
  new xhr({
    url: 'https://raw.githubusercontent.com/macsen110/yao-easy-router/master/README.md',
    done: function (data) {
      document.body.innerHTML = marked(data)
    }
  })
  var config = [
    {
      pageName: 'home',
      title:'home',
      component: {
        init: function (obj, r_instance) {
          console.log(obj)
          console.log(r_instance)
        }
      }
    },
    {
      pageName: 'list',
      title:'list',
      component: function (obj, r_instance, title) {
        r_instance.setRouter(obj, r_instance, title)
      },
      _updateInSide: 1
    },
  ]
  var router = EASY_ROUTER.router;
  router._init(config);
  setTimeout(function () {
    router.replace('list', {
      id: 110
    })
  }, 6000)
}())
