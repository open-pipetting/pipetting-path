/**
 * @jsx React.DOM
 */

'use strict';

// if (process.env.NODE_ENV !== 'test')
//   require('./Settings.scss');

var React = require('react');
var Layers = require('./Layers.jsx');
var MachineOpts = require('./MachineOpts.jsx');

var Settings = React.createClass({
  render () {
    return (
      <div>
        <h1>Settings</h1>

        <h2>Machine</h2>
        <MachineOpts />

        <h2>Layers</h2>
        <Layers />
      </div>
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
