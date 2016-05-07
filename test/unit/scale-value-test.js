var test = require('tape');
var scaleValue = require('../../').scaleValue;

test('returns min when scaleFactor is 0', function (t) {
  t.plan(1);

  var result = scaleValue(2, 6, 0);

  t.equals(result, 2);
});

test('returns max when scaleFactor is 1', function (t) {
  t.plan(1);

  var result = scaleValue(2, 6, 1);

  t.equals(result, 6);
});

test('handles scaleFactor between 0 and 1', function (t) {
  t.plan(1);

  var result = scaleValue(2, 6, 0.25);

  t.equals(result, 3);
});

test('throws Error when scaleFactor is less than 0', function (t) {
  t.plan(1);

  t.throws(function () {
    scaleValue(1, 2, -1);
  });
});

test('throws Error when scaleFactor is greater than 1', function (t) {
  t.plan(1);

  t.throws(function () {
    scaleValue(1, 2, 1.1);
  });
});

test('throws Error when max is less than min', function (t) {
  t.plan(1);

  t.throws(function () {
    scaleValue(2, 1, 0);
  });
});
