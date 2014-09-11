'use strict';

var PBPF = require('../src/pbpf')
  , assert = require('assert')
  , Pbpf = PBPF.Pbpf
  , BASE_OPTS = PBPF.BASE_OPTS;

describe('PBPF', function() {
  var pbpf;

  it('should be requirable', function() {
    assert(!!PBPF);
  });

  describe('.constructor', function() {
    it('should not throw when no args specified', function() {
      assert.doesNotThrow(Pbpf.bind(null));
    });
  });

  beforeEach(function () {
    pbpf = new Pbpf();
  });

  describe('.generate', function() {
    var opts;

    beforeEach(function () {
      opts = BASE_OPTS;
    });

    it('should create a matrix with the corret width and height', function() {
      opts.width = 5;
      opts.height = 5;

      var matrix = pbpf.generate(opts);

      assert(matrix.length === 5 && matrix[0].length === 5)
    });
  });

  describe('.addLayers', function() {
    it('add a 1-thick layer to a matrix', function() {
      var matrix = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var expected = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var actual = pbpf.addLayers(matrix, [{height: 2, width: 3, thickness: 1}]);

      assert.deepEqual(actual, expected);
    });

    it('add a 2-thick layer to a matrix', function() {
      var matrix = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var expected = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,1,1,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
      ];
      var actual = pbpf.addLayers(matrix, [{height: 2, width: 3, thickness: 2}]);

      assert.deepEqual(actual, expected);
    });

    it('add a 2 layers to a matrix', function() {
      var matrix = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var expected = [
        [0,0,0,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
      ];

      var actual = pbpf.addLayers(matrix, [
        {height: 1, width: 3, thickness: 1},
        {height: 3, width: 3, thickness: 1}
      ]);

      assert.deepEqual(actual, expected);
    });
  });

  describe('.buildPath', function() {
    it('should only return 2 points if straight line is the final path ', function() {
      var matrix = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];

      var cfg = {start: [0,0], end: [0,3], size: 1};
      var path = pbpf.buildPath(matrix, cfg);

      assert.equal(path.length, 2);
    });

    it('should have more than 2 points if there\'s an obstacle in the straight path', function() {
      var matrix = [
        [0,0,0,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var cfg = {start: [0,0], end: [0,3], size: 1};
      var path = pbpf.buildPath(matrix, cfg);

      assert(path.length > 2);
    });
  });
});
