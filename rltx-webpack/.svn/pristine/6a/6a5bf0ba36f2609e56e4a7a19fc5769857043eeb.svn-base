/**
 * Created by zhuyi on 17/4/18.
 */
require('should');

const orgPartnerFieldConfigDao = require('../src/dao/mysql/orgPartnerFieldConfigDao');

describe('getPartnerFieldConfig', () => {
  it('get partner field config 551', (done) => {
    orgPartnerFieldConfigDao.getPartnerFieldConfig(551, (err, rows) => {
      if (err) throw err;
      rows.length.should.eql(7);
      done();
    });
  });
});
