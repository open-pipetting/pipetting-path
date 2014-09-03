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
    for (var i = 0; i < opts.width; i++) {
      arr.push(0);
    }

    matrix.push(arr);
  }

  return matrix;
};

/**
 * Given a matrix, adds some layers to it.
 * @param {Array} matrix array of arrays which
 * represents the pipetteer.
 */
Pbpf.prototype.addLayers = function (matrix, layers) {
  var h = matrix.length;
  var w = matrix[0].length;

  layers.map(function (layer) {
    return {
      row: (h - (layer.height + 1)),
      thickness: layer.thickness,
      width: layer.width
    };
  }).forEach(function (row) {
    while (row.thickness--)
      for (var i in matrix[row.row + row.thickness])
        if (i < row.width)
          matrix[row.row + row.thickness][i] = 1;
  });

  return matrix;
};


module.exports = {
  Pbpf: Pbpf,
  BASE_OPTS: BASE_OPTS
};
