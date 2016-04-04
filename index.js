module.exports.calculateScaleFactor = calculateScaleFactor;
module.exports.scaleValue = scaleValue;

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

function scaleValue(min, max, scaleFactor) {
  if (scaleFactor > 1) throw new Error('scaleFactor cannot be > 1');
  if (scaleFactor < 0) throw new Error('scaleFactor cannot be < 0');
  if (max < min) throw new Error('max cannot be < min');

  var delta = max - min;
  return (delta * scaleFactor) + min;
}
