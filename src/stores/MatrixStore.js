'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SettingsStore = require('./SettingsStore');
var CONSTANTS = require('../constants');
var assign = require('object-assign');
var Store = require('./Store');
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
var MatrixStore = assign({
  getMatrixState: () => _matrix,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Matrix.UPDATE:
        _matrix = action.matrix;
        MatrixStore.emitChange();
        break;
    }

    return true;
  })
}, Store);



module.exports = MatrixStore;
