/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var React = require('react');
var Pbpf = require('./pbpf').Pbpf;
var utils = require('./utils');
var Options = require('./components/Options.jsx');
var PathVisualizer = require('./components/PathVisualizer.jsx');

var pbpf = new Pbpf();
var initialMatrix = pbpf.generate({width: 10, height: 10});

var PipettingPath = React.createClass({
  getInitialState () {
    return {
      matrix: initialMatrix
    }
  },

  handleOptionsChange (opts) {
    initialMatrix = pbpf.generate(opts);

    this.setState({
      matrix: initialMatrix
    });
  },

  handleLayersChange (opts) {
    var clonedMatrix = utils.clone(initialMatrix);
    var newMatrix = pbpf.addLayers(clonedMatrix, opts.layers);

    console.log(opts.layers);

    this.setState({
      matrix: newMatrix
    });
  },

  render () {
    return (
      <div>
        <Options onOptionsChange={this.handleOptionsChange}
                 onLayersChange={this.handleLayersChange} />
        <PathVisualizer squareSize={10} matrix={this.state.matrix} />
      </div>
    );
  }
});


React.renderComponent(
  <PipettingPath />,
  document.querySelector('#chart')
);

window.React = React;
