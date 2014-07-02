var Gedi = require('gedi');
var test = require('tape');
var x = require('xdiff');
var data;
var patch;

test('can create a new gedi instance', function(t) {
  t.plan(1);
  t.ok(data = new Gedi());
});

test('can create a patch function using the data', function(t) {
  t.plan(1);
  patch = require('../')(data);
  t.equal(typeof patch, 'function');
});

test('can apply required patches for a single key change', function(t) {
  t.plan(1);
  x.diff(data.get(), { name: 'Fred' }).forEach(patch);
  t.equal(data.get('[/name]'), 'Fred');
});

test('apply a delete, and reset the object', function(t) {
  t.plan(1);
  x.diff(data.get(), {}).forEach(patch);
  t.deepEqual(data.get(), {}, 'reset data');
});

test('can apply required patches for multiple key changes', function(t) {
  t.plan(2);
  x.diff(data.get(), { name: 'Fred', age: 52 }).forEach(patch);
  t.equal(data.get('[/name]'), 'Fred');
  t.equal(data.get('[/age]'), 52);
});

test('can apply multiple deletes', function(t) {
  t.plan(1);
  x.diff(data.get(), {}).forEach(patch);
  t.deepEqual(data.get(), {}, 'reset data');
});

test('can apply nested object patches for new compound objects', function(t) {
  var newData = {
    fred: {
      name: 'Fred Smith',
      age: 52
    },

    bob: {
      name: 'Bob Clownpants',
      age: 25
    }
  };

  t.plan(1);
  x.diff(data.get(), newData).forEach(patch);
  t.deepEqual(data.get(), newData);
});

test('can add a nested value', function(t) {
  var newData = {
    fred: {
      name: 'Fred Smith',
      location: 'Tahiti',
      age: 52
    },

    bob: {
      name: 'Bob Clownpants',
      age: 25
    }
  };

  t.plan(1);
  x.diff(data.get(), newData).forEach(patch);
  t.deepEqual(data.get(), newData);
});

test('can update nested value', function(t) {
  var newData = {
    fred: {
      name: 'Fred Smith',
      location: 'Tahiti',
      age: 53
    },

    bob: {
      name: 'Bob Clownpants',
      age: 25
    }
  };

  t.plan(1);
  x.diff(data.get(), newData).forEach(patch);
  t.deepEqual(data.get(), newData);
});

test('can remove a nested value', function(t) {
  var newData = {
    fred: {
      name: 'Fred Smith',
      age: 53
    },

    bob: {
      name: 'Bob Clownpants',
      age: 25
    }
  };

  t.plan(1);
  x.diff(data.get(), newData).forEach(patch);
  t.deepEqual(data.get(), newData);
});
