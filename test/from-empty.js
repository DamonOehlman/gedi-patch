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
