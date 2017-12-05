/**
 * Created by zhuyi on 17/4/19.
 */
require('should');

const configElementTypeInfoDao = require('../src/dao/mysql/configElementTypeInfoDao');

describe('getElementTypeInfo', () => {
  it('get element type info from 551', (done) => {
    configElementTypeInfoDao.getElementTypeInfo(551, (err, rows) => {
      if (err) throw err;
      rows.length.should.eql(11);
      done();
    });
  });
});
