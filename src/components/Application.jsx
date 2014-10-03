/**
 * @jsx React.DOM
 */

'use strict';

if (process.env.NODE_ENV !== 'test')
  require('./Application.scss');

var React = require('react');
var Visualization = require('./Visualization.jsx');
var Settings = require('./Settings/Settings.jsx');

var Application = React.createClass({
  render () {
    return (
      <main className="grid">
        <h1>Pipetting Bot</h1>
        <section className="grid__row">
          <article className="grid__col--4">
            <Visualization />
          </article>
          <article className="grid__col--4">
            <Settings />
          </article>
        </section>
      </main>
    );
  }
});

module.exports = Application;
