'use strict';

var PF = require('pathfinding');
var similar = require('similar-to');

/**
 * Base Options to be fulfilled. Any
 * instantiation requires this.
 */
var BASE_OPTS = {
  width: 0,
  height: 0,
  layers: [
    {
      height: 0,
      width: 0,
      thickness: 0
    }
  ],
  pipette: {
    position: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0
  },
  precision: 1
};

/**
 * Constructor function for the PBPF.
 */
function Pbpf () {
  if (!(this instanceof Pbpf))
    return new Pbpf();
}

/**
 * Verifies if the config passed is valid, i.e,
 * is similar to what the machine exptects.
 * @param  {Object}  opts config object
 * @return {Boolean}      if is valid or not.
 */
Pbpf.prototype.isValidConfig = function (opts) {
  if (!(opts && similar(opts, BASE_OPTS)))
    throw new Error('A well formed OPTS is expected');
};

/**
 * Generates the matrix which represents the
 * path given the parameters that this Pbpf
 * contains.
 * @return {[type]}                [description]
 */
Pbpf.prototype.generate = function (opts) {
  var matrix = [];

  // fills w/ rows
  for (var j = 0; j < opts.height; j++) {
    var arr = [];

    // fills w/ columns
    for (var i = 0; i < opts.width; i++)
      arr.push(0);

    matrix.push(arr);
  }

  return matrix;
};

/**
 * Given a matrix, adds some layers to it
 * (mutating the original one).
 * @param {Array} matrix array of arrays which
 * represents the pipetteer.
 * @param {boolean} right if should be on the
 * right (defaults to left)
 */
Pbpf.prototype.addLayers = function (matrix, layers) {
  var h = matrix.length;
  var w = matrix[0].length;

  layers.map(function (layer) {
    return {
      row: (h - (layer.height + 1)),
      thickness: layer.thickness,
      width: layer.width,
      right: layer.right
    };
  }).forEach(function (row) {
    while (row.thickness--) {
      for (var i in matrix[row.row + row.thickness]) {
        var j;
        if (row.right) {
          j = (matrix[0].length - 1) - i;

          if (j > (matrix[0].length - 1) - row.width) {
            matrix[row.row + row.thickness][j] = 1;
          }

        } else {
          if (i < row.width)
            matrix[row.row + row.thickness][i] = 1;
        }
      }
    }
  });

  return matrix;
};

/**
 * Given a starting and an ending poit,
 * generates the path.
 * @param  {Array} matrix array of arrays, w/
 * layers or not
 * @param {Object} opts an object containing the
 * options for the path generation. It must be
 * filled with: start, end
 * @param {boolean} compress if the path should
 * be compressed
 * @return {String}        the path in gCode or
 * svg path code
 */
Pbpf.prototype.buildPath = function (matrix, opts, compress) {
  if (!opts)
    throw new Error('A second argument (opts) must be provided.');

  var grid = new PF.Grid(matrix.length, matrix[0].length, matrix);
  var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  var path = finder.findPath(opts.start[0], opts.start[1],
                             opts.end[0], opts.end[1],
                             grid);

  if (path && compress)
    path = PF.Util.compressPath(path);

  return path;
};

/**
 * Given a path (array of points in the space),
 * generates the path representation depending
 * on type (svg or gcode).
 * @param  {Array} path array of points
 * representing the path
 * @param  {string|null} type the type of path
 * that we want to get the representation
 * (gcode|svg)
 * @return {string}      the representation.
 */
Pbpf.prototype.buildPathRepr = function (path, size, type) {
  var i = 0;
  var strs = [];

  //TODO (ciro)

};

module.exports = {
  Pbpf: Pbpf,
  BASE_OPTS: BASE_OPTS
};
