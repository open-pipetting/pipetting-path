'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CONSTANTS = require('../constants');
var Store = require('./Store');
var assign = require('object-assign');
var clone = (obj) => JSON.parse(JSON.stringify(obj));

process.env.NODE_ENV !== 'web' &&
  require('../utils/DeviceManager').init();

var _devices = {};

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var DeviceStore = assign({
  getDevicesState () {
    return {
      devices: _devices
    }
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var {action} = payload;

    switch (action.actionType) {
      case CONSTANTS.Device.DEVICE_ADD:
        _devices[action.device.pnpId] = (action.device);
        DeviceStore.emitChange();

        break;

      case CONSTANTS.Device.DEVICE_REMOVE:
        if (!action.id)
          return console.warn('DeviceStore: REMOVE_DEVICE came without an ID');

        delete _devices[action.id];
        DeviceStore.emitChange();

        break;
    }

    return true;
  })
}, Store);


module.exports = DeviceStore;
