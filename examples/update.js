var x = require('xdiff');
var Gedi = require('gedi');

// create the new Gedi instance with some initial data
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

// create our patching function
var patch = require('../')(model);

// use xdiff to generate a set of changes and patch each change
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

console.log(model.get('[/ted/name]'));
// --> Edward Longsocks
