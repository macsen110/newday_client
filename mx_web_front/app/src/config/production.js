var port = '15576';
var server = 'localhost';
var config = {
  env: 'production',
  http: {
    port,
    server,
    url: '//'+server+':'+port+'/api'
  }
}
export default config