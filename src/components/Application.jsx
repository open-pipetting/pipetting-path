/**
 * @jsx React.DOM
 */

'use strict';

require('./Application.scss');

var React = require('react');
var Visualization = require('./Visualization.jsx');
var Settings = require('./Settings.jsx');

var Application = React.createClass({
  render () {
    return (
      <main className="grid">
        <h1>Pipetting Bot</h1>
        <div className="grid__row">
          <section className="grid__col--4">
            <Visualization />
          </section>
          <section className="grid__col--4">
            <Settings />
          </section>
        </div>
      </main>
    );
  }
});

module.exports = Application;
