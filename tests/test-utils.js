'use strict';

var utils = require('../src/utils')
  , assert = require('assert')
  , d3 = require('d3');

describe('utils', function() {
  it('should be requirable', function() {
    assert(!!utils);
    assert(!!utils.scale.linear);
  });

  describe('range', function() {
    it('should equal d3', function() {
      var rangeU = utils.scale.linear([0, 10], [0, 20]);

      assert.equal(rangeU(1), 2);
    });

    it('should equal d3', function() {
      var domain = [10,20];
      var range = [10,60];
      var rangeU = utils.scale.linear(domain, range);

      assert.equal(rangeU(10), 10);
    });

    it('should equal d3', function() {
      var domain = [50,39];
      var range = [0,60];
      var rangeU = utils.scale.linear(domain, range);

      assert.equal(rangeU(10)|0, 218);
    });
  });

});
