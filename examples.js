'use strict';

var FragmentCache = require('./');
var fragment = new FragmentCache();


fragment.set('foo', 'bar', 'baz');
console.log(fragment.get('foo'))
console.log(fragment.get('foo', 'bar'))
