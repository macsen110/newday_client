var port = '80';
var server = 'fkcapilocal.fusionrobotics.cn';
var config = {
  env: 'development',
  http: {
    port,
    server,
    url: '//'+server+':'+port+'/api'
  }
}
export default config