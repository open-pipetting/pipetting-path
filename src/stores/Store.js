'use strict';

/**
 * Basic funcitonalitty that all stores share.
 */

var merge = require('react/lib/merge');
var { CHANGE_EVENT } = require('../constants');

var Store = merge(EventEmitter.prototype, {
  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

// TODO use this in MatrixStore and others.

module.exports = Store;
