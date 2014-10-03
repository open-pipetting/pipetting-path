/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var LayerOpts = require('./LayerOpts.jsx');
var SettingsStore = require('../../stores').Settings;
var SettingsActions = require('../../actions').Settings;

var Layers = React.createClass({
  getInitialState: () => SettingsStore.getSettingsState(),

  componentDidMount () {
    SettingsStore.addChangeListener(this.handleChange);
  },

  componentDidUnmount () {
    SettingsStore.removeChangeListener(this.handleChange);
  },

  handleClick (e) {
    switch (e.target.dataset.type) {
      case 'add':
      SettingsActions.addLayer();
      break;

      case 'remove':
      SettingsActions.removeLayer(e.target.dataset.id);
      break;
    }
  },

  handleLayerChange (layer) {
    SettingsActions.updateLayer(layer);
  },

  handleChange () {
    this.setState(SettingsStore.getSettingsState());
  },

  render () {
    var layers = this.state.layers.map((layer, i) => {
      return <li key={i}>
        <button onClick={this.handleClick}
                data-id={i}
                data-type="remove">
          Remove Layer
        </button>
        <LayerOpts onLayerChange={this.handleLayerChange}
                   identifier={i}
                   width={layer.width}
                   height={layer.height}
                   right={layer.right}
                   thickness={layer.thickness} />
      </li>
    });

    return (
      <ol>
        <li key={-1}><button onClick={this.handleClick} data-type="add">Add Layer</button></li>
        {layers}
      </ol>
    );
  }
});

module.exports = Layers;
