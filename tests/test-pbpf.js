'use strict';

var pbpf = require('../src/pbpf')
  , assert = require('assert')
  , utils = require('../src/utils');


describe('PBPF', function() {
  it('should be requirable', function() {
    assert(!!pbpf);
  });

  describe('.generate', function() {
    var opts;

    beforeEach(function () {
      opts = pbpf.BASE_OPTS;
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

    it('right side', function() {
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
        [0,0,1,1,1],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var actual = pbpf.addLayers(matrix, [{
        height: 2,
        width: 3,
        thickness: 1,
        right: true
      }]);

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

      var compress = true;
      var cfg = {start: [0,0], end: [0,3], size: 1};
      var path = pbpf.buildPath(matrix, cfg, compress);

      assert.equal(path.length, 2);
    });

    it('form the origin to the dest, if straight line and not compressed, should have the same length', function() {
      var matrix = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];

      var compress = false;
      var cfg = {start: [0,0], end: [0,3], size: 1};
      var path = pbpf.buildPath(matrix, cfg, compress);

      assert.equal(path.length, 4);
    });

    it('should have more than 2 points if there\'s an obstacle in the straight path', function() {
      var matrix = [
        [0,0,0,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
      var compress = true;
      var cfg = {start: [0,0], end: [0,3], size: 1};
      var path = pbpf.buildPath(matrix, cfg, compress);

      assert(path.length > 2);
    });
  });

  describe('.addPath', function() {
    it('add a path as expected', function() {
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
        [2,2,2,2,2],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];

      var path = pbpf.buildPath(matrix, {start: [2, 0], end: [2, 4]})
      var actual = pbpf.addPath(matrix, path);

      assert.deepEqual(actual, expected);
    });
  });
});
