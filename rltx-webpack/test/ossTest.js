/**
 * Created by zhuyi on 17/5/2.
 */
require('should');
const ossService = require('../src/service/ossService');



describe('upload oss', () => {
  it('upload oss partner to 551', (done) => {
    ossService.uploadFile(551, 'partner', 'test', 'test/ossTest.js', (err, result) => {
      if (err) throw err;
      result.res.status.should.eql(200);
      done();
    });
  });
});
