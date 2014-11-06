'use strict';

var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var SettingsActions = {
  addDevice (device) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.DEVICE_ADD,
      device: device.device
    });
  },

  removeDevice (info) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.DEVICE_REMOVE,
      id: info.id
    });
  },
};

module.exports = SettingsActions;
