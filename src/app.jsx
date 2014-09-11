/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var _ = require('underscore');

var PathVisualizer = require('./components/PathVisualizer.jsx');
var Options = require('./components/Options.jsx');

var matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
  ];


// TODO (ciro) we could determine that width and
// height only by passing the squareSize.
React.renderComponent(
  <div>
    <Options />
    <PathVisualizer width={500} height={600} matrix={matrix} />
  </div>,
  document.querySelector('#chart')
);
