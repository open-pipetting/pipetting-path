/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var clone = (obj) => JSON.parse(JSON.stringify(obj));
var _ = require('underscore');

var STRING_OR_NUMBER = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number
]);

var LayerOpts = React.createClass({
  propTypes: {
    width: STRING_OR_NUMBER,
    height: STRING_OR_NUMBER,
    thickness: STRING_OR_NUMBER,
    onLayerChange: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      width: '',
      height: '',
      thickness: ''
    };
  },

  getInitialState () {
    return {
      layer: {
        width: this.props.width,
        height: this.props.height,
        thickness: this.props.thickness
      }
    };
  },

  notifyLayerChange: _.debounce(() => {
    if (this.props.onLayerChange)
      this.props.onLayerChange(this.state.layer);
  }, 300),

  handleChange (e) {
    var name = e.target.dataset.name;
    var newLayer = clone(this.state.layer);

    newLayer[name] = e.target.value;

    this.setState({
      layer: newLayer
    });

    this.notifyLayerChange();
  },

  render () {
    return (
      <div>
        <label>Width</label>
        <input type="text"
               data-name="width"
               onChange={this.handleChange}
               value={this.state.layer.width}
               placeholder="how long" />
        <label>Height</label>
        <input type="text"
               data-name="height"
               onChange={this.handleChange}
               value={this.state.layer.height}
               placeholder="how high it is" />
        <label>Thickness</label>
        <input type="text"
               data-name="thickness"
               onChange={this.handleChange}
               value={this.state.layer.thickness}
               placeholder="how thick" />
      </div>
    );
  }
});

module.exports = LayerOpts;
