var PBPF = require('../src/pbpf');
var assert = require('assert');

describe('PBPF', function() {
  it('should be requirable', function() {
    assert(!!PBPF);
  });

  describe('.constructor', function() {
    it('must receive an options argument', function() {
      assert.throws(PBPF.bind(null));
    });

    it('should fail if opts is not similar to the expected', function() {
      var opts = {
        something: 'anotherthing'
      };

      assert.throws(PBPF.bind(null, opts));
    });

    it('should not fail if opts is similar to the expected', function() {
      var opts = {width: 0, height: 0, layers: [{height: 0, width: 0,
        thickness: 0 } ], pipette: {width: 0, height: 0 }, precision: 1};

      assert.doesNotThrow(PBPF.bind(null, opts));
    });
  });
});
