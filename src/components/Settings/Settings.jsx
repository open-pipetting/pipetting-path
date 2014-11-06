/**
 * @jsx React.DOM
 */

'use strict';

if (process.env.NODE_ENV !== 'test')
  require('./Settings.scss');

var React = require('react');
var Layers = require('./Layers.jsx');
var PathOpts = require('./PathOpts.jsx');
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

        <h2>Device W/H</h2>
        <PathOpts />
      </div>
    );
  }
});

module.exports = Settings;
