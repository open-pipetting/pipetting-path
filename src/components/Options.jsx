/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _ = require('underscore');
var LayerOpts = require('./LayerOpts.jsx');
var clone = (obj) => JSON.parse(JSON.stringify(obj));

var Options = React.createClass({
  getInitialState () {
    return {
      width: "",
      height: "",
      precision: "",
      layers: [1]
    };
  },

  handleChange (e) {
    var newState = clone(this.state);
    newState[e.target.dataset.name] = e.target.value;

    this.setState(newState);
  },

  handleLayerChange (layer) {
    console.log(layer);
  },

  handleClick (e) {
    var newLayers = this.state.layers.slice();

    switch (e.target.dataset.type) {
      case 'add':
        newLayers.push({
          width: '',
          height: '',
          thickness: ''
        });
        break;
      case 'remove':
        newLayers.splice(e.target.dataset.id, 1);
        break;
    }

    this.setState({
      layers: newLayers
    });
  },

  render () {
    var layers = _.map(this.state.layers, (layer, i) =>
      <li key={i}>
        <button onClick={this.handleClick}
                data-id={i}
                data-type="remove">
          Remove Layer
        </button>
        <LayerOpts onLayerChange={this.handleLayerChange}
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
