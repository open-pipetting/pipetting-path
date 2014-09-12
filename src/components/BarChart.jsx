/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var d3 = require('d3');

var Chart = React.createClass({
  render () {
    return (
      <svg width={this.props.width}
           height={this.props.height}>
        {this.props.children}
      </svg>
    );
  }
});

var Bar = React.createClass({
  getDefaultProps () {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },

  render () {
    return (
      <rect fill={this.props.color}
            width={this.props.width}
            height={this.props.height}
            x={this.props.offset}
            y={this.props.availableHeight - this.props.height}
      />
    );
  }
});

var DataSeries = React.createClass({
  getDefaultProps () {
    return {
      title: '',
      data: []
    }
  },

  render () {
    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var bars = this.props.data.map((point, i) =>
      <Bar height={yScale(point)}
           width={xScale.rangeBand()}
           offset={xScale(i)}
           availableHeight={this.props.height}
           color={this.props.color}
           key={i} />
    );

    return (
      <g>{bars}</g>
    );
  }
});

var BarChart = React.createClass({
  render: function() {
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={[30, 10, 5, 8, 15, 10]}
                    width={this.props.width}
                    height={this.props.height}
                    color="cornflowerblue" />
      </Chart>
    );
  }
});

// React.renderComponent(
//   <BarChart width={600} height={300} />,
//   document.getElementById('chart')
// );

module.exports = BarChart;
