'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CONSTANTS = require('../constants');
var merge = require('react/lib/merge');
var clone = (obj) => JSON.parse(JSON.stringify(obj));

// process.env.NODE_ENV !== 'web' && require('../utils/DeviceManager').init();

var _settings = {
  width: 10,
  height: 10,
  precision: 1,
  layers: []
};

var INITIAL_LAYER = {
  width: 0,
  height: 0,
  thickness: 1,
  right: false
};

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var SettingsStore = merge(EventEmitter.prototype, {
  getSettingsState: () => _settings,

  emitChange () {
    this.emit(CONSTANTS.CHANGE_EVENT);
  },

  addChangeListener (cb) {
    this.on(CONSTANTS.CHANGE_EVENT, cb);
  },

  removeChangeListener (cb) {
    this.removeListener(CONSTANTS.CHANGE_EVENT, cb);
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Settings.UPDATE_SETTINGS:
      _settings = action.settings;
      break;

      case CONSTANTS.Settings.UPDATE_SIZE:
      _settings[action.type] = action.value;
      break;

      /**
       * All of the below should actually be
       * removed as it is redundant regarding
       * the state in general.
       */

      case CONSTANTS.Settings.ADD_LAYER:
      _settings.layers.push(clone(INITIAL_LAYER));
      break;

      case CONSTANTS.Settings.REMOVE_LAYER:
      _settings.layers.splice(action.id, 1);
      break;

      case CONSTANTS.Settings.UPDATE_LAYER:
      _settings.layers[action.layer.id] = action.layer;
      break;
    }

    SettingsStore.emitChange();

    return true;
  })
});


module.exports = SettingsStore;
