'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SettingsStore = require('./SettingsStore');
var CONSTANTS = require('../constants');
var merge = require('react/lib/merge');
var pbpf = require('../utils/pbpf');

var clone = (obj) => JSON.parse(JSON.stringify(obj));

var _INITIAL_MATRIX = pbpf.generate({width: 10, height: 10});
var _matrix;


/**
 * Create a stateful _matrix, different object
 * from _INITIAL_MATRIX - never touched.
 */
_matrix = clone(_INITIAL_MATRIX);

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */
var MatrixStore = merge(EventEmitter.prototype, {
  getMatrix: () => _matrix,

  getInitialMatrix: () => _INITIAL_MATRIX,

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
      case CONSTANTS.Matrix.UPDATE:
        _matrix = action.matrix.matrix;
        MatrixStore.emitChange();
        break;
    }

    return true;
  })
});



module.exports = MatrixStore;
