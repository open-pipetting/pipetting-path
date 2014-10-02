/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Settings = React.createClass({
  render () {
    return (
      <h1>Settings</h1>
    );
  }
});

module.exports = Settings;

// <Options onOptionsChange={this.handleOptionsChange}
//                  onLayersChange={this.handleLayersChange} />

// handleOptionsChange (opts) {
//     initialMatrix = pbpf.generate(opts);

//     this.setState({
//       matrix: initialMatrix
//     });
//   },
