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
var initialMatrix = pbpf.generate({width: 10, height: 10});

var PipettingPath = React.createClass({
  /**
   * Simply impractical. SO MUCH dom to deal
   * with.
   */

   getInitialState () {
    return {
      matrix: initialMatrix
    }
   },

   componentDidMount () {
    setInterval(() => {
      this.setState({
        matrix: pbpf.addLayers(initialMatrix, [{
          height: Math.random() * 10 | 0,
          width: Math.random() * 10 | 0,
          thickness: 1
        }])
      });
    }, 2000);
   },

  // handleOptionsChange (opts) {
  //   var matrix = pbpf.generate(opts);

  //   this.setState({
  //     matrix: matrix
  //   });
  // },

  render () {
    return (
      <div>
        <Options onOptionsChange={this.handleOptionsChange} />
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
