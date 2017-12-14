export default {
    config : {
        raw:'',
        json:'',
        defaults:''
    },
    encode:function(s){
        var self =this;
        return self.config.raw ? s : encodeURIComponent(s);
    },
    decode:function(s){
        var self =this;
        return self.config.raw ? s : decodeURIComponent(s);
    },
    stringifyCookieValue:function(value){
        var self = this;
        return self.encode(self.config.json ? JSON.stringify(value) : String(value));
    },
    parseCookieValue:function(s){
        var self = this;
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            s = decodeURIComponent(s.replace(/\+/g, ' '));
        } catch(e) {
            return;
        }
        try {
            return self.config.json ? JSON.parse(s) : s;
        } catch(e) {}
    },
    read:function(s, converter){
        var self = this;
        var value = self.config.raw ? s : self.parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    },
    cookie:function (key, value, options) {
        var self = this;
        // Write
        if (value !== undefined) {
            //options = $.extend({}, self.config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            return (document.cookie = [
                self.encode(key), '=', self.stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // Read
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = self.decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                result = self.read(cookie, value);
                break;
            }
            if (!key && (cookie = self.read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    },
    removeCookie:function(name){
        var that = this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1000);
        var cval=that.cookie(name);
        if(cval!=null){
            document.cookie=name+"=; expire="+exp.toGMTString()+"; path=/;domain=.111.com.cn";
            // document.cookie= name + "="+cval+";path='/'"+";domain='.111.com.cn'"+";expires="+exp.toGMTString();
        }
    },
}