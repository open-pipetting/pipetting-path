/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _ = require('lodash');
var PathVisualizer = require('./components/PathVisualizer.jsx');
var Options = require('./components/Options.jsx');
var Pbpf = require('./pbpf').Pbpf;


var pbpf = new Pbpf();
var matrix = pbpf.generate({width: 10, height: 20});


// TODO (ciro) we could determine that width and
// height only by passing the squareSize.
React.renderComponent(
  <div>
    <Options />
    <PathVisualizer squareSize={10} matrix={matrix} />
  </div>,
  document.querySelector('#chart')
);

window.React = React;
