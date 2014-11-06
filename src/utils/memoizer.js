'use strict';

var assign = Object.assign || require('object-assign');

/**
 * Provides memoization for a given function.
 *
 * It is important to notice that it is not
 * everytime that memoization will be
 * interesting. In some situations executing the
 * fuction per se is less costing than using
 * memoize method.
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
