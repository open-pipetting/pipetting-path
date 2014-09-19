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
    linear: function () {

    }
  }
};
