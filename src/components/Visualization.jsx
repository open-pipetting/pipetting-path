/**
 * @jsx React.DOM
 */

'use strict';

if (process.env.NODE_ENV !== 'test')
  require('./Visualization.scss');

var pbpf = require('../utils/pbpf');
var React = require('react/addons');
var Matrix = require('react-matrix');
var MatrixStore = require('../stores').Matrix;
var SettingsStore = require('../stores').Settings;
var update = React.addons.update;
var _clone = (obj) => JSON.parse(JSON.stringify(obj));

var CELL_STATES = {
  '0': 'available',
  '1': 'barrier'
};

var Visualization = React.createClass({
  getInitialState () {
    return {
      matrix: MatrixStore.getMatrixState(),
      settings: SettingsStore.getSettingsState()
    };
  },

  componentDidMount () {
    SettingsStore.addChangeListener(this.handleSettingsChange);
    MatrixStore.addChangeListener(this.handleMatrixChange);
  },

  componentDidUnmount () {
    SettingsStore.removeChangeListener(this.handleSettingsChange);
    MatrixStore.removeChangeListener(this.handleMatrixChange);
  },

  handleSettingsChange () {
    this.setState(
      update(this.state, {settings: {$set: SettingsStore.getSettingsState()}})
    );
  },

  handleMatrixChange () {
    this.setState(
      update(this.state, {matrix: {$set: MatrixStore.getMatrixState()}})
    );
  },

  render () {
    var matrix = pbpf.addLayers(_clone(this.state.matrix), this.state.settings.layers);

    // pbpf
    //   .addLayers()
    //   .addPipette()
    //   .addPath();

    return (
      <div>
        <h1>Visualization</h1>
        <Matrix squareSize={10}
                matrix={matrix}
                cellStates={CELL_STATES} />
      </div>
    );
  }
});

module.exports = Visualization;
