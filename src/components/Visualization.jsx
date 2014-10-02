/**
 * @jsx React.DOM
 */

'use strict';

require('./Visualization.scss');

var React = require('react');
var Matrix = require('react-matrix');
var MatrixStore = require('../stores').Matrix;

var CELL_STATES = {
  '0': 'available',
  '1': 'barrier'
};

var Visualization = React.createClass({
  getInitialState () {
    return {
      matrix: MatrixStore.getInitialMatrix()
    }
  },

  // handleLayersChange (opts) {
  //   var clonedMatrix = utils.clone(initialMatrix);
  //   var newMatrix = pbpf.addLayers(clonedMatrix, opts.layers);

  //   this.setState({
  //     matrix: newMatrix
  //   });
  // },

  render () {
    return (
      <div>
        <h1>Visualization</h1>
        <Matrix squareSize={10}
                matrix={this.state.matrix}
                cellStates={CELL_STATES} />
      </div>
    );
  }
});

module.exports = Visualization;
