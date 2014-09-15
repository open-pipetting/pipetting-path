/**
 * @jsx React.DOM
 */

'use strict';

require('./PathVisualizer.scss');

var React = require('react');
var d3 = require('d3');
var _ = require('lodash');


var Svg = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  render () {
    return (
      <svg width={this.props.width}
           height={this.props.height}
           className="PathVisualizer">
        {this.props.children}
      </svg>
    );
  }
});

var Cell = React.createClass({
  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    state: React.PropTypes.string.isRequired,
    key: React.PropTypes.number.isRequired
  },

  render () {
    return (
      <rect className={"Cell " + this.props.state}
            x={this.props.x}
            y={this.props.y}
            width={this.props.size}
            height={this.props.size}
            key={this.props.key} />
    );
  }
});

var Row = React.createClass({
  propTypes: {
    dataRow: React.PropTypes.array.isRequired,
    squareSize: React.PropTypes.number.isRequired,
    key: React.PropTypes.number.isRequired,
  },

  STATES: {
    '0': 'available',
    '1': 'barrier',
    '2': 'path',
    '3': 'pipette',
    '4': 'component'
  },

  render () {
    var range = d3.scale.linear()
      .domain([0, this.props.dataRow.length])
      .range([0, this.props.squareSize * this.props.dataRow.length]);

    var cells = _.map(this.props.dataRow, (cel, j) => {
      return <Cell x={range(j)}
                   y={range(this.props.key)}
                   state={this.STATES[cel]}
                   size={this.props.squareSize}
                   key={this.props.key + 1 + j} />
    });

    return (
      <g className="Row">
        {cells}
      </g>
    );
  }
});

var Grid = React.createClass({
  propTypes: {
    matrix: React.PropTypes.array.isRequired,
    squareSize: React.PropTypes.number.isRequired,
  },

  render () {
    var rows = _.map(this.props.matrix, (row, i) =>
      <Row key={i}
           dataRow={row}
           squareSize={this.props.squareSize} />
    );

    return (
      <g>
        {rows}
      </g>
    );
  }
});

var PathVisualizer = React.createClass({
  propTypes: {
    squareSize: React.PropTypes.number.isRequired,
    matrix: React.PropTypes.array.isRequired
  },

  render () {
    var width = this.props.squareSize * this.props.matrix[0].length;
    var height = this.props.squareSize * this.props.matrix.length;

    return (
      <Svg width={width}
           height={height}>
        <Grid className="Grid"
              matrix={this.props.matrix}
              squareSize={this.props.squareSize} />
      </Svg>
    );
  }
});

module.exports = PathVisualizer;
