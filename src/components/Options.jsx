/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var LayerOpts = require('./LayerOpts.jsx');
var clone = require('../utils').clone;

var Options = React.createClass({
  propTypes: {
    onOptionsChange: React.PropTypes.func,
    onLayersChange: React.PropTypes.func
  },

  getInitialState () {
    return {
      width: 10,
      height: 10,
      precision: 1,
      layers: []
    };
  },

  handleChange (e) {
    var newState = clone(this.state);

    newState[e.target.dataset.name] = e.target.value;

    this.setState(newState);
    this.props.onOptionsChange && this.props.onOptionsChange(newState);
  },

  handleLayerChange (layer) {
    var newState = clone(this.state)

    newState.layers[layer.id] = layer;

    this.setState(newState);
    this.props.onLayersChange && this.props.onLayersChange(newState);
  },

  handleClick (e) {
    var newState = clone(this.state);

    switch (e.target.dataset.type) {
      case 'add':
        newState.layers.push({
          id: this.state.layers.length,
          width: 0,
          height: 0,
          thickness: 1
        });
        break;
      case 'remove':
        newState.layers.splice(e.target.dataset.id, 1);
        break;
    }

    this.setState(newState);
    this.props.onLayersChange && this.props.onLayersChange(newState);
  },

  render () {
    var layers = this.state.layers.map((layer, i) =>
      <li key={i}>
        <button onClick={this.handleClick}
                data-type="remove">
          Remove Layer
        </button>
        <LayerOpts onLayerChange={this.handleLayerChange}
                   identifier={layer.id}
                   width={layer.width}
                   height={layer.height}
                   thickness={layer.thickness} />
      </li>
    );

    return (
      <div className="Options">
        <label>Width</label>
        <input onChange={this.handleChange}
               data-name="width"
               value={this.state.width} />
        <label>Height</label>
        <input onChange={this.handleChange}
               data-name="height"
               value={this.state.height} />
        <label>Precision</label>
        <input onChange={this.handleChange}
               data-name="precision"
               value={this.state.precision} />
        <p>Layers: {this.state.layers.length}</p>
        <button onClick={this.handleClick} data-type="add">Add layers</button>
        <ol>
          {layers}
        </ol>
      </div>
    );
  }
});

module.exports = Options;
