/**
 * @jsx React.DOM
 */

var React = require('react');
var {storesGlueMixin} = require('../mixins');
var {DeviceStore} = require('../stores');

var Device = React.createClass({
  mixins: [storesGlueMixin(DeviceStore)],

  getStateFromStores: DeviceStore.getDevicesState,

  render () {
    var ids = Object.keys(this.state.devices);
    var devicesElem = ids.length ?
      ids.map((id, i) => <li key={i}>{id}</li>) :
      <li>No Devices :(</li>

    return (
      <header>
        <h2>Connected Devices:</h2>
        <ul>
          {devicesElem}
        </ul>
      </header>
    )
  }
});

module.exports = Device;
