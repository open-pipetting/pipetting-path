'use strict';

var pp = (matrix) => {matrix.forEach((row)=> {console.log(row);})};
var clone = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = {
  pp: pp,
  clone: clone
};
