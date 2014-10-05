/**
 * @jsx React.DOM
 */

'use strict';

/**
 * General settings for the machine
 */

var React = require('react/addons');
var SettingsStore = require('../../stores').Settings;
var SettingsActions = require('../../actions').Settings;
var update = React.addons.update;

var MachineOpts = React.createClass({
  getInitialState: () => SettingsStore.getSettingsState(),

  componentDidMount () {
    SettingsStore.addChangeListener(this.handleChange);
  },

  componentDidUnmount () {
    SettingsStore.removeChangeListener(this.handleChange);
  },

  handleChange () {
    this.setState(SettingsStore.getSettingsState());
  },

  handleInternalChange (e) {
    SettingsStore.updateSize(
      e.target.dataset.name,
      e.target.dataset.value);
  },

  render () {
    return (
      <div>
        <label>Width</label>
        <input type="number"
               data-name="width"
               onChange={this.handleInternalChange}
               value={this.state.width}
               placeholder="how long" />
        <label>Height</label>
        <input type="number"
               data-name="height"
               onChange={this.handleInternalChange}
               value={this.state.height}
               placeholder="how high it is" />
        <label>Precision</label>
        <input type="number"
               data-name="precision"
               onChange={this.handleInternalChange}
               value={this.state.precision}
               placeholder="how precisa" />
      </div>
    );
  }
});

module.exports = MachineOpts;
