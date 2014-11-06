/**
 * @jsx React.DOM
 */

var React = require('react');
var {SettingsActions} = require('../../actions');

var PathOpts = React.createClass({
  handleWidth () {
    console.log('handle width');
  },

  handleHeight () {
    console.log('handle height');
  },

  render () {
    return (
      <div className="PathOpts">
        <button onClick={this.handleHeight}>Set Height</button>
        <button onClick={this.handleWidth}>Set Width</button>
      </div>
    )
  }
});

module.exports = PathOpts;
