'use strict';

var assign = Object.assign || require('object.assign');

/**
 * Provides memoization for a given function.
 */

function Memoizer (f) {
  if (!f) throw new Error('Memoizer expects a function');

  this._cache = {};
  this.f = f;
}

assign(Memoizer.prototype, {
  _memoize (...args) {
    var param = JSON.stringify(args);

    return (param in this._cache) ?
      this._cache[param] :
      this._cache[param] = this.f.apply(null, args);
  },

  release: () => {
    _cache = {};
  },

  init () {
    return () =>
      this._memoize.apply(this, [].slice.call(arguments));
  }
});

module.exports = Memoizer;
