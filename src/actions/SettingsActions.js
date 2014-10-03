'use strict';

var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var SettingsActions = {
  /**
   * Device specific
   */

  // addDevice (device) {
  //   AppDispatcher.handleDeviceAction({
  //     actionType: CONSTANTS.Settings.ADD_DEVICE,
  //     device: device.device
  //   });
  // },

  // removeDevice (id) {
  //   AppDispatcher.handleDeviceAction({
  //     actionType: CONSTANTS.Settings.REMOVE_DEVICE,
  //     id: id
  //   });
  // },

  /**
   * View specific
   */

  addLayer () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.ADD_LAYER
    });
  },

  removeLayer (layerId) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.REMOVE_LAYER,
      id: layerId
    });
  },

  updateLayer (layer) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.UPDATE_LAYER,
      layer: layer
    });
  }
};

module.exports = SettingsActions;
