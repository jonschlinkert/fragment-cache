'use strict';

require('mocha');
var assert = require('assert');
var FragmentCache = require('./');
var MapCache = require('map-cache');

describe('fragment-cache', function() {
  it('should export a function', function() {
    assert.equal(typeof FragmentCache, 'function');
  });

  it('should create an instance of FragmentCache', function() {
    var fragment = new FragmentCache();
    assert(fragment instanceof FragmentCache);
  });
});

describe('methods', function() {
  describe('.cache', function() {
    it('should create a cache', function() {
      var fragment = new FragmentCache();
      fragment.cache('foo');
      assert(fragment.caches.hasOwnProperty('foo'));
    });

    it('should return the cache after creating it', function() {
      var fragment = new FragmentCache();
      fragment.cache('foo');
      var cache = fragment.get('foo');
      assert.equal(cache, fragment.caches.foo);
    });
  });

  describe('.get', function() {
    it('should get a cache', function() {
      var fragment = new FragmentCache();
      fragment.cache('foo');
      var cache = fragment.get('foo');
      assert(cache);
      assert.equal(typeof cache, 'object');
    });

    it('should be an instance of MapCache', function() {
      var fragment = new FragmentCache();
      fragment.cache('foo');
      var cache = fragment.get('foo');
      assert(cache);
      assert(cache instanceof MapCache);
    });

    it('should get an item from a cache', function() {
      var fragment = new FragmentCache();
      var cache = fragment.cache('foo');
      fragment.set('foo', 'a', 'b');
      assert.deepEqual(fragment.get('foo', 'a'), 'b');
      assert.deepEqual(fragment.cache('foo').get('a'), 'b');
    });
  });

  describe('.set', function() {
    it('should set items on the __data__ object of a cache', function() {
      var fragment = new FragmentCache();
      var cache = fragment.cache('foo');
      fragment.set('foo', 'a', 'b');

      assert(cache.__data__.hasOwnProperty('a'));
      assert.equal(cache.__data__.a, 'b');
    });
  });

  describe('.has', function() {
    it('should return true when `key` exists on a cache', function() {
      var fragment = new FragmentCache();
      var cache = fragment.cache('foo');
      cache.set('a', 'b');
      assert(fragment.has('foo', 'a'));
    });
  });

  describe('.cache.set', function() {
    it('should set items on cache.__data__', function() {
      var fragment = new FragmentCache();
      var cache = fragment.cache('foo');
      cache.set('a', 'b');

      assert(cache.__data__.hasOwnProperty('a'));
      assert.equal(cache.__data__.a, 'b');
    });
  });

  describe('.cache.get', function() {
    it('should get items from a cache', function() {
      var fragment = new FragmentCache();
      var cache = fragment.cache('foo');
      cache.set('a', 'b');
      assert.equal(cache.get('a'), 'b');
    });
  });

  describe('.cache.has', function() {
    it('should return true when an item exists on a cache', function() {
      var fragment = new FragmentCache();
      var cache = fragment.cache('foo');

      cache.set('a', 'b');
      assert(cache.has('a'));
    });
  });
});
