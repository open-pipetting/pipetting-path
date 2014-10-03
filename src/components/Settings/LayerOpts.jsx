/**
 * @jsx React.DOM
 */

/**
 * Represents a single Layer option.
 */

'use strict';

var React = require('react');
var clone = (obj) => JSON.parse(JSON.stringify(obj));

var STRING_OR_NUMBER = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number
]).isRequired;

var BOOL_OR_NUMBER = React.PropTypes.oneOfType([
  React.PropTypes.bool,
  React.PropTypes.number
]).isRequired;

var LayerOpts = React.createClass({
  propTypes: {
    identifier: React.PropTypes.number.isRequired,
    width: STRING_OR_NUMBER,
    height: STRING_OR_NUMBER,
    thickness: STRING_OR_NUMBER,
    right: BOOL_OR_NUMBER,

    onLayerChange: React.PropTypes.func
  },

  getInitialState () {
    return {
      layer: {
        id: this.props.identifier,
        width: this.props.width,
        height: this.props.height,
        thickness: this.props.thickness,
        right: this.props.right
      }
    };
  },

  handleChange (e) {
    //TODO acao para jogar para store
    var newLayer = clone(this.state.layer);
    var name = e.target.dataset.name;

    if (name !== 'right')
      newLayer[name] = +e.target.value
    else
      newLayer[name] = e.target.checked;

    this.props.onLayerChange && this.props.onLayerChange(newLayer);

    this.setState({
      layer: newLayer
    });
  },

  render () {
    return (
      <div>
        <label>Width</label>
        <input type="number"
               data-name="width"
               onChange={this.handleChange}
               value={this.state.layer.width}
               placeholder="how long" />
        <label>Height</label>
        <input type="number"
               data-name="height"
               onChange={this.handleChange}
               value={this.state.layer.height}
               placeholder="how high it is" />
        <label>Thickness</label>
        <input type="number"
               data-name="thickness"
               onChange={this.handleChange}
               value={this.state.layer.thickness}
               placeholder="how thick" />
        <label>Right</label>
        <input type="checkbox"
               data-name="right"
               onChange={this.handleChange}
               checked={this.state.layer.right} />
      </div>
    );
  }
});

module.exports = LayerOpts;
