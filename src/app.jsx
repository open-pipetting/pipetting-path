/**
 * @jsx React.DOM
 */

var React = require('react');
var PathVisualizer = require('./components/PathVisualizer.jsx');

var matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
  ];

var path = [
  [1,2],
  [1,1],
];

React.renderComponent(
  <PathVisualizer width={500} height={600} matrix={matrix} />,
  document.querySelector('#chart')
);
