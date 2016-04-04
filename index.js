module.exports.calculateScaleFactor = calculateScaleFactor;

function calculateScaleFactor(min, max, value) {
  if (max <= min) {
    throw new Error('max must be > min');
  }

  var delta = max - min;
  var scaleFactor = (value - min) / delta;

  scaleFactor = Math.min(scaleFactor, 1);
  scaleFactor = Math.max(scaleFactor, 0);

  return scaleFactor;
}
