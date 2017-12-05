/**
 * Created by zhuyi on 17/4/19.
 */
require('should');

const configElementTypeDao = require('../src/dao/mysql/configElementTypeDao');

describe('getElementTypeRelation', () => {
  it('get element type relation from 551', (done) => {
    configElementTypeDao.getElementTypeRelation(551, (err, rows) => {
      if (err) throw err;
      rows.length.should.eql(12);
      done();
    });
  });
});
