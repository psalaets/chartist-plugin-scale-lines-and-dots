var test = require('tape');
var calculateScaleFactor = require('../').calculateScaleFactor;

test('returns 0.5 for value in middle', function (t) {
  t.plan(1);

  var scaleFactor = calculateScaleFactor(4, 8, 6);

  t.equals(scaleFactor, 0.5);
});

test('returns 0 for value on min', function (t) {
  t.plan(1);

  var scaleFactor = calculateScaleFactor(4, 8, 4);

  t.equals(scaleFactor, 0);
});

test('returns 1 for value on max', function (t) {
  t.plan(1);

  var scaleFactor = calculateScaleFactor(4, 8, 8);

  t.equals(scaleFactor, 1);
});

test('handles value above middle, below max', function (t) {
  t.plan(1);

  var scaled = calculateScaleFactor(4, 8, 7);

  t.equals(scaled, 0.75);
});

test('handles value below middle, above min', function (t) {
  t.plan(1);

  var scaleFactor = calculateScaleFactor(4, 8, 5);

  t.equals(scaleFactor, 0.25);
});
