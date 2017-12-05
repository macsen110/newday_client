/**
 * Created by zhuyi on 17/4/19.
 */
require('should');

var elementTypeService = require('../src/service/elementTypeService');

describe('getElementTypeDefine', () => {
  it('get element type define 551', (done) => {
    elementTypeService.getElementTypeDefine(551, (err, resultMap) => {
      if (err) throw err;
      console.log(JSON.stringify(resultMap));
      Object.keys(resultMap).length.should.eql(11);
      done();
    });
  });
});


describe('getElementTypeInfo', () => {
  it('get element type info from 551', (done) => {
    elementTypeService.getElementTypeInfo(551, (err, resultMap) => {
      if (err) throw err;
      console.log(JSON.stringify(resultMap));
      Object.keys(resultMap).length.should.eql(11);
      done();
    });
  });
});
