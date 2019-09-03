var appid = "wx0b445a074d8f36a4";
var scope = "snsapi_userinfo";
var redirect_url = encodeURIComponent(location.href)
var redirect_uri = encodeURIComponent('https://www.macsen318.com/api/oauth2?redirect_url='+redirect_url)
if (location.href.indexOf('code') === -1 )location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope="+scope+"&state=STATE#wechat_redirect"