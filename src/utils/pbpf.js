'use strict';

/**
 * Utils for manipulating matrix representation
 * of the pipetter. Although it might seem, it
 * does not have the notion of state. Its
 * utilities are mainly designed to receive a
 * matrix, mutate and then return the mutate
 * matrix. Management of state must be done by
 * other higher module.
 */

var PF = require('pathfinding');
var similar = require('similar-to');

module.exports = {

  /**
   * Base Options to be fulfilled. Any
   * instantiation requires this.
   */
  BASE_OPTS: {
    width: 0,
    height: 0,
    layers: [
      {
        height: 0,
        width: 0,
        thickness: 0,
        right: 0
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
  },

  /**
   * Verifies if the config passed is valid, i.e,
   * is similar to what the machine exptects.
   * @param  {Object}  opts config object
   * @return {Boolean}      if is valid or not.
   */
  isValidConfig: function (opts) {
    if (!(opts && similar(opts, BASE_OPTS)))
      throw new Error('A well formed OPTS is expected');
  },

  /**
   * Generates the matrix which represents the
   * path given the parameters that this Pbpf
   * contains.
   * @return {[type]}                [description]
   */
  generate: function (opts) {
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
  },

  /**
   * Given a matrix, adds some layers to it
   * (mutating the original one).
   * @param {Array} matrix array of arrays which
   * represents the pipetteer.
   * @param {boolean} right if should be on the
   * right (defaults to left)
   */
  addLayers: function (matrix, layers) {
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
      var lastWIndex = (matrix[0].length - 1);

      while (row.thickness--) {
        for (var i in matrix[row.row + row.thickness]) {
          var j;
          if (row.right) {
            j = lastWIndex - i;

            if (j > lastWIndex - row.width)
              matrix[row.row + row.thickness][j] = 1;
          } else {
            if (i < row.width)
              matrix[row.row + row.thickness][i] = 1;
          }
        }
      }
    });

    return matrix;
  },

  /**
   * Given a starting and an ending point,
   * generates the path. It considers that cells
   * with 0 as its values are available.
   *
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
  buildPath: function (matrix, opts, compress) {
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
  },

  /**
   * Mutates the matrix given to add a path to it.
   * @param {array} matrix array of arrays
   * representing the matrix;
   * @param {array} path   array of arrays
   * containing the path generated
   */
  addPath: function (matrix, path) {
    path.forEach(function (coord) {
      matrix[coord[0]][coord[1]] = 2;
    });

    return matrix;
  },

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
  buildPathRepr: function (path, size, type) {
    var i = 0;
    var strs = [];

    //TODO (ciro)

  }
};
