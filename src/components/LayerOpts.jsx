/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _ = require('underscore');

var clone = (obj) => JSON.parse(JSON.stringify(obj));

var LayerOpts = React.createClass({
  propTypes: {
    onLayerChanges: React.PropTypes.func
  },

  EMPTY_LAYER: {
    width: '',
    height: '',
    thickness: ''
  },

  getInitialState () {
    return {
      layers: [clone(this.EMPTY_LAYER)]
    };
  },

  componentWillUpdate () {
    if (this.props.onLayerChanges)
      this.props.onLayerChanges(this.state.layers);
  },

  handleChange (e) {
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var newLayers = this.state.layers.slice();

    newLayers[id][name] = e.target.value;

    this.setState({
      layers: newLayers
    });
  },

  handleClick (e) {
    var newLayers;

    switch (e.target.dataset.type) {
      case 'add':
        newLayers = this.state.layers.concat(clone(this.EMPTY_LAYER));
        break;
      case 'remove':
        newLayers = this.state.layers.slice();
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
        <p>
          Layer <button data-id={i}
                        data-type="remove"
                        onClick={this.handleClick}>remove</button>
        </p>
        <label>Width</label>
        <input type="text"
               data-name="width"
               data-id={i}
               onChange={this.handleChange}
               value={layer.width}
               placeholder="how long" />
        <label>Height</label>
        <input type="text"
               data-name="height"
               data-id={i}
               onChange={this.handleChange}
               value={layer.height}
               placeholder="how high it is" />
        <label>Thickness</label>
        <input type="text"
               data-name="thickness"
               data-id={i}
               onChange={this.handleChange}
               value={layer.thickness}
               placeholder="how thick" />
        <button data-type="add" onClick={this.handleClick}>New Layer</button>
      </li>
    );

    return (
      <ol>
        {layers}
      </ol>
    );
  }
});

module.exports = LayerOpts;
