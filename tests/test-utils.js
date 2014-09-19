'use strict';

var utils = require('../src/utils')
  , assert = require('assert');

describe('utils', function() {
  it('should be requirable', function() {
    assert(!!utils);
    assert(!!utils.scale.linear);
  });

  // var range = d3.scale.linear()
  //     .domain([0, this.props.dataRow.length])
  //     .range([0, this.props.squareSize * this.props.dataRow.length]);

});
