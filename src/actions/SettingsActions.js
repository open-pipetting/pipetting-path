'use strict';

var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var SettingsActions = {
  /**
   * GeneralSettings
   */

  updateSettings (settings) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.UPDATE_SETTINGS,
      settings: settings
    });
  },

  updateSize (type, value) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.UPDATE_SIZE,
      type: type,
      value: value
    });
  },

  /**
   * Layers
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
  },
};

module.exports = SettingsActions;
