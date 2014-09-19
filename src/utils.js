'use strict';

module.exports = {
  pp: function (matrix) {
    var repr = '';

    matrix.forEach(function (row) {
      repr += row.join(',') + '\n';
    });

    return repr;
  },

  clone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  scale: {
    linear: function (d1, d2) {
      return function (num) {
          return d2[0] + (d2[1] - d2[0]) * ((num-d1[0])/(d1[1]-d1[0]));
      };
    }
  }
};
