/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _ = require('underscore');
var LayerOpts = require('./LayerOpts.jsx');

var Options = React.createClass({
  handleChange (e) {
    switch (e.target.dataset.name) {
      case 'width':

        break;

      case 'height':

        break;

      case 'precision':

        break;

      case 'layers':

        break;
    }
  },

  handleLayerChanges (layers) {
    this.setState({
      layers: layers.length
    });
  },

  render () {
    return (
      <div className="Options">
        <label>Width</label>
        <input onChange={this.handleChange} data-name="width" />
        <label>Height</label>
        <input onChange={this.handleChange} data-name="height" />
        <label>Precision</label>
        <input onChange={this.handleChange} data-name="precision" />
        <LayerOpts onLayerChanges={this.handleLayerChanges}/>
      </div>
    );
  }
});

module.exports = Options;
