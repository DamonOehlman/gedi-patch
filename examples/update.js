var x = require('xdiff');
var Gedi = require('gedi');
var model = new Gedi({
  fred: {
    name: 'Fred Smith',
    age: 52
  },

  ted: {
    name: 'Ted Longsocks',
    age: 23
  }
});
var patch = require('../')(model);

x.diff(model.get(), {
  fred: {
    name: 'Fred Smith',
    age: 53
  },

  ted: {
    name: 'Edward Longsocks',
    age: 23
  }
}).forEach(patch);

console.log(model.get());
