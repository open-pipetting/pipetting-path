'use strict';

var PF = require('pathfinding');
var similar = require('similar-to');

var BASE = {
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
    width: 0,
    height: 0
  },
  precision: 1
};

function PBPF (opts) {
  if (!(opts && similar(opts, BASE)))
    throw new Error('A well formed OPTS is expected');

  if (!(this instanceof PBPF))
    return new PBPF(opts);

  this.opts = opts;
}

PBPF.prototype.generate = function(first_argument) {

};

module.exports = PBPF;
