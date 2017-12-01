/**
 * Created by zhuyi on 17/4/18.
 */
require('should');

const partnerConfigService = require('../src/service/partnerConfigService');

describe('getPartnerFieldConfig', () => {
  it('get partner field config 551', (done) => {
    partnerConfigService.getPartnerFieldConfig(551, (err, results) => {
      if (err) throw err;
      console.log(JSON.stringify(results));
      results.length.should.eql(7);
      done();
    });
  });
});

